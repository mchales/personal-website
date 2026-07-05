

This website is built with **React**, **Next.js**, and **TypeScript**, and it's hosted on **Vercel** for fast and reliable deployment. The site features **Sean AI Assistant** and my **Projects**


## ChatGPT API Integration

Sean AI Assistant uses the [OpenAI Responses API](https://developers.openai.com/api/docs/guides/text) with custom instructions and Sean-specific background context. API requests are handled **server-side** using Next.js API routes, which keeps sensitive credentials off the frontend. After sending a request, the response is streamed back to the server in chunks which are immediately sent to the frontend to be displayed. These chunks create a markdown document (the same type of document as this), so correct formatting is still important.


## Projects

The Projects page is structured similarly to a blog, where each of my projects is showcased individually. The site uses Next.js's dynamic routing feature to load content based on project IDs, allowing for flexible and scalable project displays. The Project Pages supports posts in both markdown and HTML formats. This flexibility ensures that posts can remain simple with markdown while also allowing for more dynamic content using HTML when necessary.

