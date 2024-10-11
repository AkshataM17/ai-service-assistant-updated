// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let knowledgeBase = '';
let isInitialized = false;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, isInitialSetup } = body;

    if (!message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Message is required' 
      }, { status: 400 });
    }

    if (isInitialSetup && !isInitialized) {
      knowledgeBase = message;
      isInitialized = true;
      return NextResponse.json({ 
        success: true, 
        message: 'Knowledge base initialized successfully' 
      });
    }

    if (!isInitialized) {
      return NextResponse.json({ 
        success: false, 
        message: 'Please provide initial knowledge base information first.' 
      }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: `You are a customer service AI assistant. Use this knowledge base to inform your responses: ${knowledgeBase}` },
        { role: 'user', content: message }
      ],
      model: 'gpt-3.5-turbo',
    });

    return NextResponse.json({ 
      success: true, 
      message: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred while processing your request.' 
    }, { status: 500 });
  }
}