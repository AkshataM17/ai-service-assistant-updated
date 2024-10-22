// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const knowledgeBaseFilePath = path.join(process.cwd(), 'knowledgeBase.txt');

// Initialize the knowledge base file if it doesn't exist
if (!fs.existsSync(knowledgeBaseFilePath)) {
  fs.writeFileSync(knowledgeBaseFilePath, '', 'utf8');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, isInitialSetup } = body;

    if (!message) {
      return NextResponse.json({ success: false, message: 'Message is required' }, { status: 400 });
    }

    if (isInitialSetup) {
      // Save the initial message to the knowledge base file
      fs.writeFileSync(knowledgeBaseFilePath, message, 'utf8');
      return NextResponse.json({ success: true, message: 'Knowledge base initialized successfully' });
    }

    // Read the knowledge base from the file
    const knowledgeBase = fs.readFileSync(knowledgeBaseFilePath, 'utf8');

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: `You are a customer service AI assistant. Use this knowledge base to inform your responses: ${knowledgeBase}` },
        { role: 'user', content: message }
      ],
      model: 'gpt-3.5-turbo',
    });

    return NextResponse.json({
      success: true,
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while processing your request.' }, { status: 500 });
  }
}
