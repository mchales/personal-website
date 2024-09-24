// File: /app/api/your-function/route.ts

import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

async function sendErrorToServerlessFunction(request: Request, message: string, error: any) {
  try {
    const headersList = headers();
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const host = headersList.get('host');
    const baseUrl = `${protocol}://${host}`;

    await fetch(`${baseUrl}/api/error-handler`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        error: error.toString(),
      }),
    });
  } catch (fetchError) {
    // Optionally handle errors from the error handler itself
    console.error('Failed to send error to error handler:', fetchError);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userInput = searchParams.get('userInput');

  if (!userInput) {
    return new NextResponse('Missing user input', { status: 400 });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const assistant_id = process.env.OPENAI_ASSISTANT_ID as string;

      let thread;
      try {
        thread = await openai.beta.threads.create();
      } catch (error) {
        await sendErrorToServerlessFunction(request, 'Error creating thread', error);
        controller.enqueue(encoder.encode(`data: Error creating thread. Please try again.\n\n`));
        controller.error(error);
        return;
      }

      try {
        await openai.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: userInput,
        });
      } catch (error) {
        await sendErrorToServerlessFunction(request, 'Error creating message', error);
        controller.enqueue(encoder.encode(`data: Error creating message. Please try again.\n\n`));
        controller.error(error);
        return;
      }

      let runStream;
      try {
        runStream = openai.beta.threads.runs.stream(thread.id, {
          assistant_id,
        });
      } catch (error) {
        await sendErrorToServerlessFunction(request, 'Error starting run stream', error);
        controller.enqueue(encoder.encode(`data: Error starting stream. Please try again.\n\n`));
        controller.error(error);
        return;
      }

      let buffer = '';

      runStream
        .on('textDelta', async (textDelta) => {
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
          } catch (error) {
            await sendErrorToServerlessFunction(request, 'Error processing text delta', error);
            controller.enqueue(
              encoder.encode(`data: Error processing data. Please try again.\n\n`)
            );
            controller.error(error);
          }
        })
        .on('error', async (error) => {
          await sendErrorToServerlessFunction(request, 'An error occurred during streaming', error);
          const errorMessage = 'Sorry, an error occurred during streaming. Please try again.';
          const sseErrorData = `data: ${errorMessage}\n\n`;
          controller.enqueue(encoder.encode(sseErrorData));
          controller.error(error);
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
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
