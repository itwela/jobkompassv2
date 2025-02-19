import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const jsonResumeData = await request.json();
    return NextResponse.json({ data: jsonResumeData });
  } catch (error) {
    console.error('Error processing resume data:', error);
    return NextResponse.json({ error: 'Failed to process resume data' }, { status: 500 });
  }
}