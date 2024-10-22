// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const knowledgeBaseFilePath = path.join(process.cwd(), 'knowledgeBase.txt');
let isInitialized = false; // Flag to track initialization

// Check if the knowledge base file exists and load it
function loadKnowledgeBase() {
  try {
    if (fs.existsSync(knowledgeBaseFilePath)) {
      const knowledgeBase = fs.readFileSync(knowledgeBaseFilePath, 'utf8');
      if (knowledgeBase) {
        isInitialized = true;
        return knowledgeBase;
      }
    }
  } catch (error) {
    console.error('Error reading knowledge base:', error);
  }
  return '';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, isInitialSetup } = body;

    let knowledgeBase = loadKnowledgeBase();

    if (!isInitialized) {
      if (isInitialSetup) {
        if (!message) {
          return NextResponse.json({ 
            success: false, 
            message: 'Message is required for initialization.' 
          }, { status: 400 });
        }

        // Save the knowledge base in a file (instead of memory)
        fs.writeFileSync(knowledgeBaseFilePath, message);
        isInitialized = true;

        return NextResponse.json({ 
          success: true, 
          message: 'Knowledge base initialized successfully.' 
        });
      } else {
        return NextResponse.json({ 
          success: false, 
          message: 'Please provide initial knowledge base information first.' 
        }, { status: 400 });
      }
    }

    // Once the knowledge base is initialized, proceed with the user query
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
