*\* I am currently traveling and the code for this project is on my desktop pc. Code blocks will be added Monday night.*


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
- Removed URLs, bot accounts, and converted text to lowercase.
- Focused on 12 key conflict-related subreddits such as `r/Israel`, `r/Palestine`, and `r/IsraelHamasWar`.
- Tokenized the vocabulary, filtered frequent words, and retained active users (those with over 5 posts).

### Topic Modeling: LDA
For **topic modeling**, we employed Latent Dirichlet Allocation (LDA) to uncover recurring themes. Using coherence scores, we settled on five distinct topics based on coherence scores:
1. **Conflict & Violence**
2. **Hostage Situations**
3. **Ideological Support & Opposition**
4. **Social Media Engagement**
5. **Jewish Identity & Geography**

Each post was labeled with its dominant topic, and these scores were aggregated for users and subreddits. Our PCA analysis confirmed minimal overlap between topics, showcasing clear distinctions.

![LDA Polarization](/projects/nlp-polarization/lda-polarization.jpg)

### Topic Modeling: BERTopic
Additionally, we used **BERTopic** to cluster posts based on semantic content using PoliBERT, a pre-trained model for political content. Clusters were further pruned, grouping related topics under broader themes such as **Hamas-Israel Geopolitics**, **Conflict Coverage**, and **Public Opinion on Israel-Palestine**.

![BERT Polarization](/projects/nlp-polarization/bert-polarization.jpg)

### Polarization Classification
We manually labeled 1,300 posts for polarization using a scale from 1 (pro-Israel) to 7 (pro-Palestine), with 4 being neutral. This training set was then used to fine-tune a **Hugging Face XLNet model** to label the remaining posts, achieving an accuracy of 76% with a +/-1 margin of error. This model classified polarization at both the post and user levels.

Attempts using OpenAI API with LangChain were used for post and user classification. However, due to the quantity and violent nature of data (triggers content flags) we deciced on using a XLNet model.

A limitation of the project is the ambiguity in post labeling, which affects both human and model-based classification. Certain posts (e.g., "Westerners can't live with Muslims, only China can. Stupid Westerners need to learn from the CCP") presented challenges to categorize accurately. Moreover, some posts (e.g., "Palestinians, how do you explain Jewish archaeological sites?") require context or background knowledge that the model lacks, making it difficult to interpret based solely on the content of the post.

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


