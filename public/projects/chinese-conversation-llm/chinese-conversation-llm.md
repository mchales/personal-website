For many language learners, speaking and listening are the hardest skills to practice consistently. HuiSpeak was built to make that practice more accessible by giving Chinese learners a low-pressure way to hold guided conversations that combine cultural context, role-playing, and practical communication.

## The Finished Product

HuiSpeak is a conversation-based language learning web app powered by **ChatGPT** and the **Whisper API**. It gives learners structured scenarios where they can practice speaking in Chinese, respond naturally, and review the conversation afterward. The finished experience balances immersive storytelling with practical everyday situations so practice feels both useful and motivating.

### How the Application Works

1. **User onboarding**: Learners create an account and set up their practice experience.
2. **Scenario selection**: Users choose a conversation scenario based on the kind of speaking practice they want.
3. **Voice-based conversation**: Learners speak with the assistant through voice input for a more natural practice loop.
4. **Feedback and review**: After each session, users can review the dialogue and reflect on how they responded.

### Key Features

- **Immersive role-playing**: Story-driven scenarios make speaking practice more engaging than flashcards or isolated prompts.
- **Practical situations**: Users can practice conversations they may actually need in real life.
- **Cultural context**: Scenarios are designed to expose learners to Chinese cultural themes in addition to vocabulary.
- **Personalized practice**: Prompting and scenario design support a more tailored learning experience.

## Example Experiences

### Journey to the West Role-Playing

One part of HuiSpeak focuses on more immersive, story-based practice. In this scenario, the learner enters a Journey to the West-inspired adventure and has to speak with the Monkey King as part of the story. This gives users a more memorable role-playing experience while still practicing real conversation.

![Journey to the West role-playing scenario](/projects/chinese-conversation-llm/meet-monkey-king.webp)

### Practical Scenario: Checking Into a Hotel

HuiSpeak also includes more grounded practice for everyday communication. This hotel check-in scenario helps learners practice greeting someone, asking about room availability, requesting accommodations, and confirming details in a realistic setting.

![Hotel check-in scenario](/projects/chinese-conversation-llm/hotel-check-in.webp)

## Software Architecture

![Software Architecture](/projects/chinese-conversation-llm/software-architecture.png)

- Calling OpenAI from the frontend for the conversation component keeps the implementation simpler.
- The OpenAI assistant manages conversation history so users can continue a scenario naturally.

## Demo

[Video](https://youtu.be/IX3PtzKD8BM)
