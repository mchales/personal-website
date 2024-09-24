import OpenAI from 'openai';

export async function GET(request: Request) {
  console.log('Received GET request:', request.url);
  const { searchParams } = new URL(request.url);
  const userInput = searchParams.get('userInput');
  console.log('User input:', userInput);

  if (!userInput) {
    console.log('Missing user input');
    return new Response('Missing user input', { status: 400 });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log('Initialized OpenAI with API key');

  const encoder = new TextEncoder();
  let textDeltaCounter = 0; // Counter to track the number of textDelta events

  const stream = new ReadableStream({
    async start(controller) {
      const assistant_id = process.env.OPENAI_ASSISTANT_ID as string;
      console.log('Assistant ID:', assistant_id);

      let thread;
      try {
        thread = await openai.beta.threads.create();
        console.log('Thread created successfully:', thread.id);
      } catch (error) {
        console.error('Error creating thread:', error);
        controller.enqueue(encoder.encode(`data: Error creating thread. Please try again.\n\n`));
        controller.error(error);
        return;
      }

      try {
        await openai.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: userInput,
        });
        console.log('Message created successfully in thread:', thread.id);
      } catch (error) {
        console.error('Error creating message:', error);
        controller.enqueue(encoder.encode(`data: Error creating message. Please try again.\n\n`));
        controller.error(error);
        return;
      }

      let runStream;
      try {
        runStream = openai.beta.threads.runs.stream(thread.id, {
          assistant_id,
        });
        console.log('Run stream started successfully:', thread.id);
      } catch (error) {
        console.error('Error starting run stream:', error);
        controller.enqueue(encoder.encode(`data: Error starting stream. Please try again.\n\n`));
        controller.error(error);
        return;
      }

      let buffer = '';

      runStream
        .on('textDelta', (textDelta) => {
          textDeltaCounter++; // Increment the counter on each textDelta
          console.log(`Received text delta ${textDeltaCounter}:`, textDelta.value);

          // Simulate throwing an error midstream after 2 textDelta events
          if (textDeltaCounter === 2) {
            console.error('Simulated error midstream'); // Log the simulated error
            controller.enqueue(
              encoder.encode(`data: Simulated error occurred. Please try again.\n\n`)
            );
            controller.error(new Error('Simulated error midstream'));
            return;
          }

          try {
            buffer += textDelta.value;

            const index = buffer.length;

            let chunk = buffer.slice(0, index);
            buffer = buffer.slice(index);

            // Ensure proper newline encoding
            chunk = chunk.replace(/\n/g, '\\n');

            // Send the data in SSE format
            const sseFormattedData = `data: ${chunk}\n\n`;
            controller.enqueue(encoder.encode(sseFormattedData));
            console.log('Sent SSE formatted data:', sseFormattedData);
          } catch (error) {
            console.error('Error processing text delta:', error);
            controller.enqueue(
              encoder.encode(`data: Error processing data. Please try again.\n\n`)
            );
            controller.error(error);
          }
        })
        .on('error', (error) => {
          console.error('An error occurred during streaming:', error);
          const errorMessage = 'Sorry, an error occurred during streaming. Please try again.';
          const sseErrorData = `data: ${errorMessage}\n\n`;
          controller.enqueue(encoder.encode(sseErrorData));
          controller.error(error);
        })
        .on('end', () => {
          console.log('Stream ended, sending remaining buffer:', buffer);
          // Send any remaining buffer
          if (buffer.length > 0) {
            const sseFormattedData = `data: ${buffer.replace(/\n/g, '\\n')}\n\n`;
            controller.enqueue(encoder.encode(sseFormattedData));
            console.log('Sent remaining buffer data:', sseFormattedData);
          }
          const endMessage = `data: [END]\n\n`;
          controller.enqueue(encoder.encode(endMessage));
          console.log('Stream closed, sent end message');
          controller.close();
        });
    },
  });

  console.log('Returning response with stream');
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
