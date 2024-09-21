

This website is built with **React**, **Next.js**, and **TypeScript**, and it's hosted on **Vercel** for fast and reliable deployment. The site features **Sean AI Assistant** and my **Projects**


## ChatGPT API Integration

Sean AI Assistant is a GPT assistant with a custom knowledge base and prompt. The assistant was built in the [OpenAI Playground](https://platform.openai.com/playground) and accessed using the [API Docs](https://platform.openai.com/docs/assistants/overview). API requests to ChatGPT are handled **server-side** using Next.js's API routes. This ensures the security of sensitive information like API keys, which would otherwise be exposed if handled on the frontend. After sending a request, the response is streamed back to the server in chunks which are immediately sent to the frontend to be displayed. These chunks create a markdown document (the same type of document as this) so it is important that the formatting is correct.


## Projects

The Projects page is structured similarly to a blog, where each of my projects is showcased individually. The site uses Next.js's dynamic routing feature to load content based on project IDs, allowing for flexible and scalable project displays. The Project Pages supports posts in both markdown and HTML formats. This flexibility ensures that posts can remain simple with markdown while also allowing for more dynamic content using HTML when necessary.


