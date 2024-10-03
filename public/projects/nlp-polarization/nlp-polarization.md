## Israel-Palestine (IP) Based Polarization on Reddit Across Subreddits
The role of social media in disseminating information has grown significantly in recent years. Given that 80% of Americans rely on online platforms for news, it is crucial to understand how users engage with such platforms. This project explores how the recent Israel-Palestine (IP) conflict, particularly following the attacks on October 7th, 2023, has led to polarization on Reddit. With Reddit's subreddit structure, users can select niche communities, providing a prime opportunity to study polarization across various topics and groups.

The findings aim to highlight polarization patterns across subreddits, helping to inform strategies for content moderation and discussion facilitation in sensitive topics such as the IP conflict. 

## Objectives
The project's primary goal was to identify patterns of polarization across different levels: users, subreddits, and topics. We predicted:
- **User-level:** Polarized users would primarily engage with like-minded individuals.
- **Subreddit-level:** Conflict-specific subreddits would show polarization towards one side, while general subreddits might have a mix.
- **Topic-level:** Discussions around violence would see higher polarization.
- **Temporal analysis:** Polarization would fluctuate based on real-world events, showing spikes during significant IP conflict incidents.

## Methodology
![Methodology](/projects/nlp-polarization/methodology.jpg)
### Data Acquisition
Initially, we planned to gather data from the Reddit API, but due to limitations in accessing historical information, we shifted to using **IsamasRed**, a dataset that tracks Reddit discussions on the IP conflict. I contacted the authors for permission to use their dataset, which is referenced in their [paper](https://arxiv.org/pdf/2401.08202). The dataset covers the period from August to November 2023 and includes over 400,000 submissions and 8 million comments from both conflict-related and general subreddits

### Data Processing
We processed the dataset to clean and prepare it for modeling:
- Removed URLs and converted text to lowercase using regex
- Focused on 12 key conflict-related subreddits such as `r/Israel`, `r/Palestine`, and `r/IsraelHamasWar`.
- Tokenized the vocabulary using NLTK, filtered frequent words, and retained active users (those with over 5 posts).

```python
def remove_links(text):
    link_pattern1 = r'https?://\S+?\.jpg|https?://\S+?\.png|https?://\S+?\.jpeg'
    text_no_links = re.sub(link_pattern1, '', text)
    link_pattern2 = r'\((http[s]?:\/\/[^\s]+)\)'
    text_no_links = re.sub(link_pattern2, '', text_no_links)
    return text_no_links

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    tokens = word_tokenize(text) # Function from NLTK
    text = ' '.join(tokens)
    return text

df['Title'] = df['Title'].apply(remove_links)
df['Text'] = df['Text'].apply(remove_links)
df['Title'] = df['Title'].apply(preprocess_text)
df['Text'] = df['Text'].apply(preprocess_text)

```

### Topic Modeling: LDA

*For more information about topic modeling, LDA, and coherence scores check out this [post](/projects/gensim-lda/)*

For **topic modeling**, we employed Latent Dirichlet Allocation (LDA) to uncover recurring themes. Using coherence scores, we settled on five distinct topics:
1. **Conflict & Violence**
2. **Hostage Situations**
3. **Ideological Support & Opposition**
4. **Social Media Engagement**
5. **Jewish Identity & Geography**

Each post was labeled with its dominant topic, and these scores were aggregated for users and subreddits. Our [PCA](https://en.wikipedia.org/wiki/Principal_component_analysis#:~:text=Principal%20component%20analysis%20(PCA)%20is,analysis%2C%20visualization%20and%20data%20preprocessing.) analysis confirmed minimal overlap between topics, showcasing clear distinctions.

![LDA Polarization](/projects/nlp-polarization/lda-polarization.jpg)

### Topic Modeling: BERTopic
*Note: This project component was not led by me, however, I helped to debug and run this code being the only group member with a GPU.*

Additionally, we used **BERTopic** to cluster posts based on semantic content using PoliBERT, a pre-trained model for political content. Clusters were further pruned, grouping related topics under broader themes such as **Hamas-Israel Geopolitics**, **Conflict Coverage**, and **Public Opinion on Israel-Palestine**.

![BERT Polarization](/projects/nlp-polarization/bert-polarization.jpg)

The first step in the topic modeling process involves generating embeddings using the **SentenceTransformer** model, specifically the **PoliBERT** model, which is fine-tuned for political content. The code block below shows how we encode text documents (posts) to obtain dense semantic embeddings. These embeddings serve as the input for the BERTopic model to perform topic clustering.
```python
from sentence_transformers import SentenceTransformer
cache_folder = "./emb_model/"

embedding_model = SentenceTransformer("kornosk/polibertweet-mlm", cache_folder=cache_folder, device='cuda')
embeddings = embedding_model.encode(docs, show_progress_bar=True)
np.save('embeddings.npy', embeddings)

selected_indices = df[df['Subreddit'].isin(subreddit_names)].index
embeddings = embeddings[selected_indices]
topic_model = BERTopic(language="multilingual")
topics, probs = topic_model.fit_transform(docs, embeddings)
topic_model.get_topic_info()
```

The second step evaluates the coherence of the topics generated by BERTopic using the **UMAP** dimensionality reduction and **KMeans** clustering models. The code below iterates through various numbers of topics to identify the most coherent clusters based on the **u_mass** coherence score. This process helps optimize the number of topics by balancing between coherence and granularity.
```python
vectorizer = topic_model.vectorizer_model
analyzer = vectorizer.build_analyzer()
tokens = [analyzer(doc) for doc in docs]
dictionary = corpora.Dictionary(tokens)
corpus = [dictionary.doc2bow(token) for token in tokens]

umap_model = UMAP(n_neighbors=15, n_components=5, min_dist=0.0, metric='cosine')

coherence_score = {}
for tpcs in range(10,150,10):
    hdbscan_model = KMeans(n_clusters=tpcs)
    test_model = BERTopic(language="multilingual", calculate_probabilities=False, verbose=True, umap_model=umap_model, hdbscan_model=hdbscan_model)#, embedding_model=embedding_model)
    topics, _ = test_model.fit_transform(docs,embeddings)
    topics = test_model.get_topics()
    topics.pop(-1, None)
    topic_words = [[word for word, _ in test_model.get_topic(topic) if word != ""] for topic in topics]
    topic_words = [[words for words, _ in test_model.get_topic(topic)] for topic in range(len(set(topics))-1)]
    coherence_model = CoherenceModel(topics=topic_words, 
                              texts=tokens, 
                              corpus=corpus,
                              dictionary=dictionary, 
                              coherence='u_mass')
    try:
        coherence = coherence_model.get_coherence()
        coherence_score[tpcs] = coherence
        print(tpcs,": ",coherence,end=", ")
    except:
        coherence_score[tpcs] = 0
        print(tpcs,": invalid",end=", ")
```

### Polarization Classification
We manually labeled 1,300 posts for polarization using a scale from 1 (pro-Israel) to 7 (pro-Palestine), with 4 being neutral. This training set was then used to fine-tune a **Hugging Face XLNet model** to label the remaining posts, achieving an accuracy of 76% with a +/-1 margin of error. This model classified polarization at both the post and user levels.

Attempts using OpenAI API with LangChain were used for post and user classification. However, due to the quantity and violent nature of data (triggers content flags) we deciced on using a XLNet model.

A limitation of the project is the ambiguity in post labeling, which affects both human and model-based classification. Certain posts (e.g., "Westerners can't live with Muslims, only China can. Stupid Westerners need to learn from the CCP") presented challenges to categorize accurately. Moreover, some posts (e.g., "Palestinians, how do you explain Jewish archaeological sites?") require context or background knowledge that the model lacks, making it difficult to interpret based solely on the content of the post.

We begin by splitting the dataset into training and test sets to ensure robust evaluation of the model's performance. After that, we convert the target labels into a one-hot encoded format suitable for classification using XLNet. The code below initializes the tokenizer and model from Hugging Face's pre-trained XLNet model, which is fine-tuned to classify posts based on their polarization stance, leveraging the manually labeled data.
```python
X = df['data'].values
y = df['label'].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

encoder = OneHotEncoder(sparse=False)
y_train_onehot = encoder.fit_transform(y_train.reshape(-1, 1))
y_test_onehot = encoder.transform(y_test.reshape(-1, 1))

# Initialize tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("xlnet/xlnet-base-cased")
model = XLNetForSequenceClassification.from_pretrained("xlnet/xlnet-base-cased", num_labels=len(encoder.categories_[0]), problem_type="multi_label_classification")
```
To train the model, we need to tokenize the text data and create a dataset structure that the model can work with. The code below defines a custom dataset class that tokenizes each post and converts it into the required tensor format. The SimpleDataset class prepares batches of input data that can be processed by the XLNet model during training. We then use this dataset to create data loaders for the training and testing phases.
```python
class SimpleDataset(Dataset):
    def __init__(self, X, y, tokenizer, max_length):
        self.X = X
        self.y = y
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        text = f"{self.X[idx]}"
        label = self.y[idx]

        encoding = self.tokenizer(text, padding='max_length', truncation=True, max_length=self.max_length, return_tensors='pt').to(device)
        input_ids = encoding['input_ids'].squeeze().to(device)
        attention_mask = encoding['attention_mask'].squeeze().to(device)

        return {
            'input_ids': input_ids,
            'attention_mask': attention_mask,
            'labels': torch.tensor(label, dtype=torch.float)
        }

# Prepare dataset and dataloaders
train_dataset = SimpleDataset(X_train, y_train_onehot, tokenizer, max_length=32)
test_dataset = SimpleDataset(X_test, y_test_onehot, tokenizer, max_length=32)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)
```
The final step involves training the model using the prepared data. The code below implements the training loop where the model learns from the training set by minimizing the loss through backpropagation. For each batch, the model processes input text and computes the loss, which is then used to update the model's parameters. We track the loss during each epoch to monitor the training process and print the average loss for each epoch.
```python
# Training loop
loss_history = []
model.to(device)
model.train()
for epoch in range(num_epochs):
    total_loss = 0
    num_batches = 0
    for batch in train_loader:
        optimizer.zero_grad()
        input_ids = batch['input_ids']
        attention_mask = batch['attention_mask']
        labels = batch['labels']

        outputs = model(input_ids=input_ids.to(device), attention_mask=attention_mask.to(device), labels=labels.to(device))
        loss = outputs.loss
        loss.backward()
        optimizer.step()

        total_loss += loss.item()
        loss_history.append(loss.item())
        num_batches += 1
    loss_history.append(loss.item())
    average_loss = total_loss / num_batches
    print(f"Epoch {epoch + 1}/{num_epochs}, Loss: {average_loss:.4f}")
```


## Results
- **User Interactions:** As expected, users mostly interacted with like-minded individuals, but pro-Israel users were more likely to comment on pro-Palestine posts than the reverse (17.32 compared to 14.07 comments on average).

![Heatmap](/projects/nlp-polarization/heatmap.jpg)


- **Topic Polarization:** The **Conflict & Violence** topic saw the highest polarization, particularly for pro-Palestine side, while **Hostage Situations** drew more polarization from the pro-Israel side.

![Topic Level Polarization](/projects/nlp-polarization/topic-level.jpg)


- **Subreddit Networks:** In conflict-specific subreddits, pro-Palestine communities were more clearly defined, while pro-Israel communities were smaller and more mixed. Neutral users tended to participate across various subreddits. Distinct communities are evident across the network. In the upper section of the diagram, subreddits like _Palestine_, _IsraelCrimes_, and _israelexposed_ predominantly consist of pro-Palestine users. In contrast, subreddits in the bottom left, such as _IsraelWar_, _IsraelUnderAttack_, _IsraelHamasWar_, and _PalestinianViolence_, have a stronger presence of pro-Israel users, though these communities also include a mix of neutral and pro-Palestine users.

![Subreddit Polarization](/projects/nlp-polarization/subreddit-polarization.jpg)

Outside of the conflict-focused subreddits, we observe that news and information subreddits like _r/worldnews_ and _r/AskReddit_ attract a diverse range of users. Subreddits such as _r/socialism_ and _r/islam_ lean predominantly pro-Palestine, while _r/judaism_ tends to remain more neutral.

![General Polarization](/projects/nlp-polarization/general-polarization.jpg)


### Temporal Analysis
Using time-based trends, we found that spikes in polarization aligned with real-world events (anecdotally). 

![Timeline Events](/projects/nlp-polarization/timeline-events.jpg)

The fluctuations observed before October 7 are likely due to the limited number of posts. After October 7, there was a significant increase in the daily post count.

![Frequency Posts](/projects/nlp-polarization/frequency-posts.jpg)


## Conclusion
Our analysis reveals significant polarization within IP-related Reddit discussions, with distinct biases across users, subreddits, and topics. Polarization tended to spike during conflict-related events, and pro-Israel users showed more cross-side engagement. Despite this, our work emphasizes the complexity of online polarization and the need for further research to explore longer-term trends.


