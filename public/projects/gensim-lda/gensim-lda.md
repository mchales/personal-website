
## Introduction

This tutorial walks through a simple topic modeling project on posts from the weight loss r/loseit subreddit on Reddit. We will cover how to clean text, create tokens, and build an LDA model for topic modeling alonging with explaining important concepts. We'll also evaluate coherence scores and visualize the topics.

## Topic Modeling
Topic modeling is a machine learning technique used to discover hidden themes or topics within large collections of text data. One of the most popular algorithms for this is Latent Dirichlet Allocation (LDA). LDA works by assuming that each document in a corpus is made up of a mixture of topics, and each topic is characterized by a distribution of words. The algorithm analyzes the co-occurrence of words across documents and assigns a probability distribution over topics for each document, as well as a distribution over words for each topic. This helps in identifying patterns and organizing unstructured text into interpretable themes.



## Prerequisites

Make sure you have the following libraries installed:

```bash
pip install pandas spacy tqdm gensim pyLDAvis
python -m spacy download en_core_web_sm
```

## Step 1: Import Libraries

We first import the necessary libraries:

```python
import pandas as pd
import spacy
import numpy as np
from tqdm.notebook import tqdm
from gensim.corpora.dictionary import Dictionary
from gensim.models.ldamodel import LdaModel
import pyLDAvis.gensim
from gensim.models.coherencemodel import CoherenceModel
```

- **pandas**: For data manipulation.
- **spacy**: For NLP tasks like tokenization and part-of-speech tagging.
- **tqdm**: For progress bars in loops.
- **gensim**: For topic modeling (LDA model, dictionary, corpus).
- **pyLDAvis**: For visualizing LDA topics.
- **numpy**: For numerical operations.

## Step 2: Load Data

We load a CSV file into a DataFrame.

```python
data = pd.read_csv('./data/loseit.csv')
```

This reads a CSV file named `loseit.csv` into a `pandas` DataFrame, where we will perform our text processing.

### Sample Data

| post_id | post_created_at     | post_title                                                                             | post_text                                                                                                    |
| ------- | ------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 7pzs4e  | 2018-01-12 21:17:08 | Started weightlifting in addition to cardio, not losing any weight.                    | It's been almost two weeks now and I've been hovering between 230 and 231...                                 |
| 7ag0g3  | 2017-11-03 00:51:16 | This is the last straw guys, this is gonna be my month                                 | I've been plateauing since August, for the life of me I couldn't get lower than 237lbs...                    |
| 74lbdq  | 2017-10-06 04:12:46 | how to count calories on home-cooked meals?                                            | I still live with my parents, being from Europe (I live in the US now)...                                    |
| 6ub87l  | 2017-08-17 16:42:57 | let me just say...                                                                     | it feels soooooooo damn good updating my flair...                                                            |
| 4n3vod  | 2016-06-08 07:36:02 | How realistic is this?                                                                 | So I was talking to my cousin, this guy is insanely ripped and very aesthetically pleasing...                |
| 4e9gup  | 2016-04-11 05:49:57 | I just gained the 5 pounds I lost over the whole week in two days.                     | I'm so pissed off right now, over the past two days I spent the weekend hanging out with some old friends... |
| 4ad22w  | 2016-03-14 13:22:41 | Lost 20lbs but I see no difference. When do people actually start seeing a difference? | I've dropped 20lbs, I've gone from 315lbs to 294lbs and I honestly can't believe it...                       |
|         |                     |                                                                                        |                                                                                                              |


## Step 3: Preprocess the Data

Concatenate the title and text to create a unified document for each row.

```python
data["documents"] = data['post_title'] + " " + data["post_text"]
```

This step merges two columns (`post_title` and `post_text`) to form a single `documents` column for easier processing.

### Load spaCy Model

Next, we load the `spaCy` model to process English text:

```python
nlp = spacy.load('en_core_web_sm')
```

## Step 4: Extract Nouns, Verbs, and Adjectives

We extract the relevant parts of speech (nouns, verbs, and adjectives) from each document.

```python
# Initialize the new column with empty strings
data['noun_verb_adj'] = ''

# Create a list of tokens
for index, row in tqdm(data.iterrows()):
    document = row["documents"].lower()
    doc = nlp(document)
    token_list = [token.text for token in doc if token.pos_ in ['NOUN', 'VERB', 'ADJ']]
    
    data.loc[index, 'noun_verb_adj'] = " ".join(str(x) for x in token_list)
```

- **`data['noun_verb_adj']`**: A new column that stores the relevant tokens.
- The loop iterates over each document, converts it to lowercase, and uses `spaCy` to extract nouns, verbs, and adjectives.
- Finally, the tokens are joined back into a string and stored in the `noun_verb_adj` column.

## Step 5: Filter Common Words

We compute the frequency of words and filter out words that appear infrequently (less than 5 times). 
Filtering out infrequent words is important for LDA because rare words contribute little to identifying meaningful topics, as they don't appear often enough to form patterns across documents. By removing them, we reduce noise in the data and improve the model's ability to find coherent topics based on common word occurrences.

```python
frequency = data.noun_verb_adj.str.split(expand=True).stack().value_counts()
data['processed'] = ''  # Initialize the column

# Filter out infrequent words
for index, row in data.iterrows():
    document = row["noun_verb_adj"].split()
    common_words = [word for word in document if frequency[word] > 5]
    data.at[index, 'processed'] = common_words  
```

- **`frequency`**: Counts the frequency of each word across all documents.
- **`processed`**: A new column where we store the filtered words that appear more than 5 times.

## Step 6: Create a Dictionary and Corpus

Now, we create a dictionary and corpus for topic modeling. Creating a dictionary and corpus is crucial for topic modeling because they provide the structured input LDA requires, mapping words to unique IDs and representing documents as word-frequency distributions for analysis.

```python
# Create a corpus from a list of texts
common_dictionary = Dictionary(data['processed'])
common_corpus = [common_dictionary.doc2bow(text) for text in data['processed']]
```

- **`common_dictionary`**: A Gensim `Dictionary` that maps each unique word to an ID.
- **`common_corpus`**: A list of bag-of-words (BOW) representations of each document, where each document is represented by word IDs and their frequencies.

## Step 7: Train LDA Model and Evaluate Coherence Scores

We try different numbers of topics (`K`) and compute coherence scores for each model to find the best `K`. Coherence is a metric that measures the interpretability and semantic consistency of topics generated by a model, reflecting how meaningful the topics are in relation to human understanding. In LDA, coherence scores help determine the optimal number of topics (K) by comparing how well the words within each topic co-occur, with higher coherence indicating better-defined and more interpretable topics.

```python
K = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
coherence_scores = []

for k in tqdm(K):
    lda = LdaModel(common_corpus, num_topics=k, id2word=common_dictionary, passes=10, random_state=0, eval_every=None)
    coherence_model_lda = CoherenceModel(model=lda, texts=data['processed'], dictionary=common_dictionary, coherence='c_v')
    coherence_scores.append(coherence_model_lda.get_coherence())
```

- **`LdaModel`**: Trains the LDA topic model for each `K` (number of topics).
- **`CoherenceModel`**: Evaluates the coherence score for each LDA model.

### Select Best Number of Topics

```python
best_k = K[np.argmax(coherence_scores)]
```

We select the number of topics (`best_k`) that gives the highest coherence score.

## Step 8: Train Final LDA Model and Visualize Topics

After selecting the best number of topics, we train the final LDA model and visualize it.

```python
lda = LdaModel(common_corpus, num_topics=best_k, id2word=common_dictionary, passes=10, random_state=0, eval_every=None)
lda_display = pyLDAvis.gensim.prepare(lda, common_corpus, common_dictionary)
pyLDAvis.display(lda_display)
```

- **`lda`**: Final LDA model trained with the optimal number of topics.
- **`pyLDAvis.gensim.prepare`**: Prepares the LDA model for visualization.
- **`pyLDAvis.display`**: Displays the interactive LDA visualization in a Jupyter notebook.

## Step 9: Visualization
We can save the LDA topic modeling result to html for easy viewing.


```python
pyLDAvis.save_html(lda_display, './ldavis.html')
```

View the interactive [results](/projects/gensim-lda/ldavis.html)

![Topics](/projects/gensim-lda/full-topics.jpg)

## Step 10: Explore The Results
We can view our topic modeling extracted cohesive topics. Here are some samples:

### Topic 0: Exercise Routine and Progress

**Words**: gym, run, do, running, week, day, time, minutes, workout, work

- **Explanation**: The theme here is centered around exercising, particularly running and gym workouts. It reflects routine building, tracking time spent working out, and maintaining weekly exercise habits.


### Topic 8: Caloric Intake and Body Composition

**Words**: calories, fat, day, weight, body, %, exercise, calorie, eat, muscle

- **Explanation**: The focus here is on daily caloric intake, body fat percentage, and how diet and exercise contribute to body composition. This topic ties into managing calorie consumption and muscle gain.

### Topic 24: Clothing Fit and Weight Changes

**Words**: fit, size, clothes, pants, have, jeans, wear, new, look, big

- **Explanation**: This topic revolves around how weight changes affect clothing size and fit. People discuss buying new clothes, noticing how their old clothes no longer fit, and their physical appearance after weight changes.


## Conclusion

In this tutorial, we covered:
- Cleaning and processing text using `spaCy`.
- Filtering common words and creating a bag-of-words representation.
- Training LDA models with different numbers of topics.
- Evaluating coherence scores to find the optimal number of topics.
- Visualizing and interpreting topics using `pyLDAvis`.
