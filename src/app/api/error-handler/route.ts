// File: /app/api/error-handler/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message, error } = await request.json();

  // Handle the error (e.g., log it to a database, send a notification, etc.)
  console.error('Error received:', message, error);

  return NextResponse.json({ message: 'Error logged' }, { status: 200 });
}
