For many language learners, mastering speaking and listening skills presents significant challenges. While studying Chinese, real-world conversations can be intimidating, especially when learning in a non-native environment. Regular practice is essential, but finding reliable practice opportunities or an affordable solution isn't always easy.


## The Solution: A Conversation-Based Learning Web App

A conversation-based language learning web app addresses this gap by enabling users to engage in practical conversations powered by **ChatGPT** and the **Whisper API**. There will be a strong emphasis on practical situations, role-playing, and cultural elements. Additionally, there will be a high level of personalization through using user-submitted information and custom prompting. I additionally plan to have three different levels of language practice, each with a storyline. This storyline will contain practical situations, cultural elements, and media to keep the user highly motivated.

### How the Application Works:

1. **User Onboarding**: Users sign in to create their account.
2. **Selecting Scenarios**: They choose from a variety of conversation situations, ranging from beginner to advanced levels.
3. **Engage in Conversations**: Users participate in dialogues with ChatGPT through voice input, powered by the Whisper API. This provides an experience close to natural conversation.
4. **Feedback & Review**: After each session, users can review the dialogue and receive feedback to help improve their language skills.

### Key Features

- **Cost-Effective**: The pricing model is based on API token usage, making it a more affordable alternative to traditional language apps.
- **Contextual Scenarios**: Users can practice in specific real-world situations like ordering food or speaking with a delivery person, providing relevant experience for practical use.
- **Level-Based Practice**: The web app offers different difficulty levels, allowing learners to choose the level that best suits their language proficiency.

## What Makes It Different?

### LLM-Powered Conversations
By leveraging large language models (LLMs) like ChatGPT, the web app creates a low-pressure environment for users to practice speaking. This reduces the anxiety that many language learners feel when speaking to another person, providing an opportunity for practice without the need for a human language partner.

### Real-Life Situations
The application’s focus on real-world, practical conversations means users can develop language skills that are directly applicable to their daily lives. From receiving deliveries to casual chats, the scenarios are designed to be as relevant and useful as possible.

## Current Progress
### Software Architecture
![Software Architecture](/projects/chinese-conversation-llm/software-architecture.png)
- Calling OpenAI from the frontend for the conversation component reduces code complexity. The OpenAI Assistants manages the conversation history.


### Progress Video
[Video](https://youtu.be/DCjocpQmyfM)

