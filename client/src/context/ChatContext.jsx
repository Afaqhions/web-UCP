import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { socketService } from '../services/socket';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { token } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('human');
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    if (token) {
      socketService.connect(token);
      
      socketService.on('new-message', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socketService.on('message-read', (messageId) => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg))
        );
      });

      socketService.on('typing', (data) => {
        setIsTyping(data.isTyping);
      });

      return () => {
        socketService.disconnect();
      };
    }
  }, [token]);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const sendMessage = useCallback(
    async (content, attachments = []) => {
      if (!content.trim() && attachments.length === 0) return;

      const message = {
        content,
        attachments,
        timestamp: new Date(),
        sender: 'user',
      };

      setMessages((prev) => [...prev, message]);
      socketService.sendMessage(currentChatId, content, attachments);
    },
    [currentChatId]
  );

  const markAsRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  const connectChat = useCallback((chatId) => {
    setCurrentChatId(chatId);
    socketService.joinChat(chatId);
  }, []);

  const value = {
    isChatOpen,
    toggleChat,
    activeTab,
    setActiveTab,
    unreadCount,
    setUnreadCount,
    messages,
    setMessages,
    chatHistory,
    setChatHistory,
    isTyping,
    setIsTyping,
    sendMessage,
    markAsRead,
    connectChat,
    currentChatId,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
