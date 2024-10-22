'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  content: string;
  isUser: boolean;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  // Fetch knowledge base status on component mount
  useEffect(() => {
    const checkKnowledgeBase = async () => {
      try {
        const response = await fetch('/api/knowledge-base');
        const data = await response.json();

        if (data.knowledgeBase && data.knowledgeBase !== 'Knowledge base not initialized.') {
          // Knowledge base is initialized
          setIsInitialized(true);
          setMessages([{
            content: "Thank you! I've saved this information and I'm ready to help customers.",
            isUser: false
          }]);
        } else {
          // Knowledge base is not initialized, prompt user for initial setup
          setMessages([{
            content: "Welcome! Please provide some initial information or FAQs that I can use to help future customers.",
            isUser: false
          }]);
        }
      } catch (error) {
        console.error('Error checking knowledge base:', error);
        setMessages([{
          content: "Sorry, there was an error checking the knowledge base.",
          isUser: false
        }]);
      }
    };

    checkKnowledgeBase();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { content: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          isInitialSetup: !isInitialized
        }),
      });

      const data = await response.json();

      if (!isInitialized && data.success) {
        setIsInitialized(true);
        setMessages(prev => [...prev, {
          content: "Thank you! I've saved this information and I'm ready to help customers.",
          isUser: false
        }]);
      } else {
        setMessages(prev => [...prev, {
          content: data.message,
          isUser: false
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        content: "Sorry, there was an error processing your message.",
        isUser: false
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Open Chat
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <h3 className="font-bold">Customer Support</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white hover:text-gray-300 text-xl font-bold"
        >
          ×
        </button>
      </div>
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start ${msg.isUser ? 'justify-end' : ''}`}>
            <div 
              className={`rounded-lg p-3 max-w-[75%] ${
                msg.isUser 
                  ? 'bg-black text-white' 
                  : 'bg-white border border-gray-200 text-black'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={isInitialized 
              ? "Type your message..." 
              : "Enter knowledge base information..."
            }
            className="flex-1 p-2 border rounded-l focus:outline-none focus:border-black text-black placeholder-gray-500"
          />
          <button 
            onClick={handleSend}
            className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
