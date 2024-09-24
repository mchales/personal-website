# Overview
In May 2023, I was hired by Tacit, a startup founded by two Vanderbilt MBA students, to be the lead developer. At this stage, we only had an idea and pitch deck. We wanted to leverage the latest LLM technology to apply [The Wisdom of Crowds](https://en.wikipedia.org/wiki/The_Wisdom_of_Crowds) on qualitative data, helping companies make more informed decisions. The next step was to refine the concept and develop a minimum viable product (MVP) for customer testing.

Initial development went smooth, and we quickly had a prototype we and our friends could play around with. With more development we had a product ready for pilot customers, allowing us to gather valuable feedback and iterate. 

We also had a more concrete mission:

>Tacit is an AI-powered survey platform that harnesses the collective intelligence of any group, turning diverse stakeholder inputs into concise, actionable insights. Our platform pinpoints the most critical perspectives and ideas, enabling organizations to make smarter strategic decisions based on their group's collective knowledge. With Tacit, this qualitative data collection and analysis process is now entirely automated. You simply choose a question, share your link with the group, and the platform handles the rest. Through AI-led async conversations with each stakeholder, Tacit synthesizes your group's knowledge in real-time to return the best answers.

The initial reactions were very positive, however, it was difficult to convince customers to use our product. I will go into more detail about this later, but Tacit eventually lost momentum, leading the company's eventual closure, as is the case with many startups.

Yet, this was still an incredible learning experience, both technical and personal, providing valuable insights into product development, customer engagement, and the challenges of starting a startup.

This post will explain the features of Tacit, technical details, as well as interesting challenges we encountered.

## Flow of Actions
The product was a web application previously accessible at https://tacit.solutions/. 

## Moderator: Landing Page
![Landing Page](/projects/tacit/landing-page.jpg)

## Moderator: Login Page
Supported Google authentication

![Login](/projects/tacit/login.jpg)

## Moderator Create Conversation Page
**Moderator** can create a conversation with question(s) to explore. Each question has its own controls, as well as the entire conversation itself.

![Create Conversation](/projects/tacit/create-conversation.jpg)

## Moderator: Conversation Created
The conversation was created and the **moderator** receives links to share the conversation with participants as well as view the results. These links are also accessible in the **moderator’s** account.

![Share](/projects/tacit/share.jpg)

## Participant: Receives URL to Join Conversation
The **participant** receives the link to join the conversation via email, Slack, text, etc., and joins the conversation. They select their demographic, enter their name, and join.

![Join Conversation](/projects/tacit/join-conversation.jpg)

## Participant: Conversation with Tacit AI
The **participant** has a conversation with Tacit AI around the current question being asked. When the question ends, summaries and ideas from the conversation are generated in the background.

![In Conversation](/projects/tacit/in-conversation.jpg)

## Moderator: Activate Tacit Analysis
After the moderator has the desired number of participants in the conversation, the moderator can activate Tacit Analysis. In the conversation setup, the **moderator** did not select dates for the analysis to be automatically triggered, thus they have to do it themselves. They enter their account and select the desired conversation.

![Account Conversations](/projects/tacit/account-conversations.jpg)

Within the conversation, the **moderator** can run Tacit Analysis. Tacit Analysis will generate categories from all the responses and classify ideas into the categories. After Tacit Analysis is complete, the participants can do crowd validation, accessing the conversation from the same link to rate categories and ideas.

![Account](/projects/tacit/account.jpg)

Note: This three-phase approach—initial conversations, Tacit Analysis, and then crowd validation—was not always the case. Originally, this occurred during one phase, where the crowd validation occurred with the initial conversation. Ideas (but no categories) were exposed to users after their initial conversation.

### One Phase:
- Pros
	- User does not need to rejoin conversation
	- Easy for the moderators to use and understand
	- Results dashboard populated quickly with useful data
	- Every participant (except the first) will rate ideas
- Cons
	- No categories
	- First participants will have few ideas to rate
	- Ideas introduced by the final participants will not be exposed to many participants

### Three Phase:
- Pros
	- Categories
	- Higher quality results for moderator
	- Ideas are all weighted equally
- Cons
	- Users have to rejoin the conversation
	- Moderator has to do an extra step and contact participants again (note this can be set up to automatically happen, and if participant includes their email, they will be notified)
	- Not all participants will rejoin
	- Complexity about participants who want to do initial conversation joining the conversation after Tacit Analysis

This was a difficult decision to shift to a 3-phase approach and required significant development to implement.

## Participant: Crowd Validation
The **participant** enters the conversation again to rate the generated categories and ideas from the other participants.

![Validation](/projects/tacit/validation.gif)

## Moderator: Results Home
The **moderator** could view results before Tacit Analysis and Crowd Validation, however, they would only see user ideas and summaries for the question. After Crowd Validation occurs, the results are much more valuable.

![Results](/projects/tacit/results.jpg)

## Moderator: Results Summary
This results page provides the top collective answer to the question from participants as well as statistics from each category.

![Summary](/projects/tacit/summary.jpg)

The category table can be sorted by demographics, search term, score, etc.

![Category Viewing](/projects/tacit/category-viewing.gif)

## Moderator: Category View
Clicking view on a category will allow the **moderator** to see specifics about the category such as group rating, the agreement level, contributing ideas, contributing users, and contributing demographics.

![Category View](/projects/tacit/category-view.jpg)

## Moderator: Results Ideas
The **moderator** can view all the ideas generated by the participants, the scores, as well as the number of times the ideas were rated by participants.

![Ideas](/projects/tacit/ideas.jpg)

## Moderator: Results User Responses
The **moderator** can view the summaries and transcripts of all the user responses.

![User Response](/projects/tacit/user-response.jpg)

## Moderator: Q&A
The **moderator** can directly ask questions about the conversations. RAG is performed on the moderator query to fetch the most relevant transcripts from the discussions.

![Ask Tacit](/projects/tacit/ask-tacit.jpg)

# Technical Details
## Frontend
The frontend was written in React and JavaScript. In hindsight I should’ve paired React with [Vite](https://vitejs.dev/) or [Next.js](https://nextjs.org/) to be more optimized and scalable. I used [Redux](https://react-redux.js.org/)to manage the state of the application and Axios to make API calls to my backend.
## Backend

### Specs
- The backend was created Django Rest Framework using Python
- Backend hosted on Heroku
- Testing with pytest-django
- Django ORM to handle database migrations
- PostgreSQL database hosted on Amazon Web Services RDS
- Redis to run longer background jobs
- Celery to schedule events, such as Tacit Analysis at a specific date
- Authentication with simple-jwt and djoser, including social auth for Google login
- Vector database with Pinecone
- LangChain and OpenAI API for calling querying LLM models
- Stripe payment integration partially completed
### Interesting Aspects
#### Idea Generation
Every conversation a participant has with Tacit AI generates a summary and ideas. It is important that ideas generated are tracked and we don’t allow duplicates. How do you know if two ideas are duplicates? For instance, these three ideas:

```
1. Dogs are man's best friend
2. Dogs are not man's best friend
3. Dogs are humanity's most loyal and trusted companions
```

Idea 1 and 3 should be classified as the same, while idea 1 and 2 should be classified as different. There’s many ways to approach this problem, clustering algorithms, sentence transformers, or vector embeddings.

We choose the latter as we were already using a vector database for retrieval augmented generation (RAG) for the question and answer. Vector databases are very neat, they are trained to transform a data point (sentence, image, etc) into a vector, and the vector space will preserve the initial similarity. So ideally, two sentences that are semantically similar (have the same meaning) will also be close to each other in a vector space.

I say ideally, because this is not always the case. We ran into the problem of two opposite ideas, such as idea 1 and idea 2, having extremely high similarity scores. To solve this issue, we took a brute-force by effective approach of throwing a LLM query at the problem.

Given one idea, we query our vector space for the 10 most similar ideas, and then we query GPT-4 to rate each idea on having the same meaning to the original idea. Using this score we determine if we have a duplicate.

So for for example:

New Idea: Dogs are man's best friend

Vector Database:
- Dogs are not man's best friend
- Dogs are humanity's most loyal and trusted companions

1. Vector database query: Dogs are man's best friend
	1. Dogs are not man's best friend. Similarity: 0.92
	2. Dogs are humanity's most loyal and trusted companions. Similarity: 0.78

With more ideas, only the top 10 similar  ideas will continue to the next step

2. ChatGPT API query: “Score each idea 1-10 based on how similar it is to original idea”
	1. Dogs are not man's best friend. Score: 2
	2. Dogs are humanity's most loyal and trusted companions. Similarity: 9

3. Similar idea(s) selected based on score threshold
	1. Similar Idea: Dogs are humanity's most loyal and trusted companions.

This process can be refined with better prompts and different threshold values.
#### Idea Rating
Each idea receives a score based on the average rating from participants. However, a challenge arises because a large number of ideas are generated, while the number of participants available to rate them is relatively low.

For instance, let’s say we have a conversation with 10 participants. Each participant conversation creates 5 ideas. We want each idea to have at least 4 ratings. That means each participant needs to rate 20 ideas.

We solved this problem through two methods:
1. **Categories**
	
Tacit Analysis creates categories and classifies ideas into categories. Participants rate categories, and by doing so all the ideas all receive that rating. While this approach is broader and can sometimes lead to inaccuracies, it generally performs well. The final rankings are further refined when participants rank individual ideas in a list.


2. **Ranking as list**

Originally ideas were shown individually to the user and then ranked. Users could also provide feedback on each idea. This process was slow and we changed the mechanism to be list ranking where participants could move ideas up or down

![[idea-ranking.jpg]]

# Challenges
Like many startups, Tacit failed. Here I will explain the reasons I believe that contributed to this.

- Too much friction and effort for a moderator to learn and setup. This made it difficult to get customers to use and provide feedback. On many occasions a company said they would try our product, however, they never followed through.
- No concrete target audience. Tacit has a wide array of use cases and we decided to focus on the consulting industry, however, this still feels too broad. It didn’t feel like we were designing specific features for this use case, but our general idea.
- Sometimes we got lost on the detail. For instance, we did A/B testing on our main Tacit AI prompt. This required me setting up and recording surveys after each question, getting users to test the prompts, and analyzing the results. A lot of effort for something that we could’ve done internally in a fraction of the time.
- We never released it for public use and only kept it to participants who we could communicate and get feedback from. This limited possible opportunities of users finding our product.
- No promise on data security. Many companies, especially consulting companies, have policies about sharing data. Our method of using ChatGPT API would violate their policies.

# Conclusion
My time at Tacit was an invaluable experience. We made significant strides in leveraging AI to harness collective intelligence. While the product ultimately didn't succeed, the insights gained in product development, customer engagement, and startup dynamics have been instrumental in shaping my approach to future projects.