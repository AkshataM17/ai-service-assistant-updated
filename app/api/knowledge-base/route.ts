// app/api/knowledge-base/route.ts
import { NextRequest, NextResponse } from 'next/server';

let knowledgeBase = ''; // Track the knowledge base in memory
let isInitialized = false; // Flag to check if knowledge base is set

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      knowledgeBase: isInitialized ? knowledgeBase : 'Knowledge base not initialized.',
    });
  } catch (error) {
    console.error('Error fetching knowledge base:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred while fetching the knowledge base.',
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message, isInitialSetup } = body;

  if (isInitialSetup && !isInitialized) {
    knowledgeBase = message; // Save the knowledge base when first initialized
    isInitialized = true;
    return NextResponse.json({ 
      success: true, 
      message: 'Knowledge base initialized successfully' 
    });
  }

  // Additional logic for handling other messages can be added here
  return NextResponse.json({ 
    success: false, 
    message: 'Knowledge base is already initialized.'
  });
}
