import OpenAI from 'openai';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const maxDuration = 60;

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
  const model = process.env.OPENAI_MODEL || 'gpt-5.5';
  const instructions = process.env.OPENAI_SEAN_AI_INSTRUCTIONS;

  if (!instructions) {
    return new NextResponse('Missing OPENAI_SEAN_AI_INSTRUCTIONS', { status: 500 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const responseStream = openai.responses.stream({
          model,
          input: userInput,
          instructions,
          store: false,
        });

        responseStream.on('response.output_text.delta', (event) => {
          const sseFormattedData = `data: ${event.delta.replace(/\n/g, '\\n')}\n\n`;
          controller.enqueue(encoder.encode(sseFormattedData));
        });

        await responseStream.finalResponse();

        controller.enqueue(encoder.encode('data: [END]\n\n'));
        controller.close();
      } catch (error) {
        await sendErrorToServerlessFunction(request, 'An error occurred during streaming', error);
        const errorMessage = 'Sorry, an error occurred during streaming. Please try again.';
        const sseErrorData = `data: ${errorMessage}\n\n`;
        controller.enqueue(encoder.encode(sseErrorData));
        controller.error(error);
      }
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
