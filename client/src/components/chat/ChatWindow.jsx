import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Tabs } from '../common/Tabs';

export const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('human');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      content: input,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          content: 'Thanks for your message! Our support team will respond soon.',
          timestamp: new Date(),
          isOwn: false,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) return null;

  const tabs = [
    {
      label: '👥 Support',
      content: (
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto space-y-4 mb-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} isOwn={msg.isOwn} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSendMessage} size="sm">
              Send
            </Button>
          </div>
        </div>
      ),
    },
    {
      label: '🤖 AI Bot',
      content: (
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto space-y-4 mb-4">
            <MessageBubble
              message={{
                content: 'Hello! I am Taakra AI. How can I help you today?',
                timestamp: new Date(),
              }}
              isOwn={false}
            />
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} isOwn={msg.isOwn} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask AI anything..."
              className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSendMessage} size="sm">
              Send
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed bottom-24 right-8 w-96 h-screen max-h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col">
      <div className="bg-blue-500 text-white px-4 py-3 flex items-center justify-between rounded-t-lg">
        <h3 className="font-bold">Chat & Support</h3>
        <button onClick={onClose} className="text-xl hover:bg-blue-600 px-2 rounded">
          ×
        </button>
      </div>
      <div className="flex-grow overflow-hidden p-0">
        <Tabs tabs={tabs} defaultTab={0} onChange={setActiveTab} />
      </div>
    </div>
  );
};
