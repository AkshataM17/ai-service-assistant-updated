// app/api/knowledge-base/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const knowledgeBaseFilePath = path.join(process.cwd(), 'knowledgeBase.txt');

export async function GET() {
  try {
    const knowledgeBase = fs.readFileSync(knowledgeBaseFilePath, 'utf8');
    return NextResponse.json({ 
      success: true, 
      knowledgeBase: knowledgeBase || 'Knowledge base not initialized.' 
    });
  } catch (error) {
    console.error('Error reading knowledge base:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred while accessing the knowledge base.' 
    }, { status: 500 });
  }
}
