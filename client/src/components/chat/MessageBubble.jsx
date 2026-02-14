import React from 'react';
import { formatTime } from '../../utils/formatters';

export const MessageBubble = ({ message, isOwn = false }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-900 rounded-bl-none'
        }`}
      >
        <p className="break-words">{message.content}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-600'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};
