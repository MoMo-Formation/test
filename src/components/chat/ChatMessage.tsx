import React from 'react';
import { User, Bot } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../types/course';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex items-start space-x-2 max-w-[80%] ${
          isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
        }`}
      >
        <div
          className={`p-2 rounded-full ${
            isUser ? 'bg-blue-100' : 'bg-gray-100'
          }`}
        >
          {isUser ? (
            <User className="h-5 w-5 text-blue-600" />
          ) : (
            <Bot className="h-5 w-5 text-gray-600" />
          )}
        </div>
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}