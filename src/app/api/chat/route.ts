import OpenAI from 'openai';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userInput = searchParams.get('userInput');

  if (!userInput) {
    return new Response('Missing user input', { status: 400 });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const assistant_id = process.env.OPENAI_ASSISTANT_ID;

        const thread = await openai.beta.threads.create();

        await openai.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: userInput,
        });

        const runStream = openai.beta.threads.runs.stream(thread.id, {
          assistant_id,
        });

        let buffer = '';
        let isInCodeBlock = false;

        runStream
          .on('textDelta', (textDelta) => {
            buffer += textDelta.value;

            // Have to process the buffer like this because markdown was not rendering otherwise
            while (buffer.includes('\n') || buffer.length > 10) {
              let index = buffer.indexOf('\n');
              if (index === -1) index = 10;

              let chunk = buffer.slice(0, index + 1);
              buffer = buffer.slice(index + 1);

              // Handle code blocks
              if (chunk.includes('```')) {
                isInCodeBlock = !isInCodeBlock;
                chunk = chunk.replace('```', '\\```');
              }

              // Ensure proper newline encoding
              chunk = chunk.replace(/\n/g, '\\n');

              // Send the data in SSE format
              const sseFormattedData = `data: ${chunk}\n\n`;
              controller.enqueue(encoder.encode(sseFormattedData));
            }
          })
          .on('error', (error) => {
            console.error('An error occurred during streaming:', error);
            // Send custom error message in SSE format
            const errorMessage = 'Sorry, an error occurred. Please try again.';
            const sseErrorData = `data: ${errorMessage}\n\n`;
            controller.enqueue(encoder.encode(sseErrorData));
            controller.close();
          })
          .on('end', () => {
            // Send any remaining buffer
            if (buffer.length > 0) {
              const sseFormattedData = `data: ${buffer.replace(/\n/g, '\\n')}\n\n`;
              controller.enqueue(encoder.encode(sseFormattedData));
            }
            const endMessage = `data: [END]\n\n`;
            controller.enqueue(encoder.encode(endMessage));
            controller.close();
          });
      } catch (error) {
        console.error('An error occurred:', error);
        // Send custom error message in SSE format
        const errorMessage = 'Sorry, an error occurred. Please try again.';
        const sseErrorData = `data: ${errorMessage}\n\n`;
        controller.enqueue(encoder.encode(sseErrorData));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}