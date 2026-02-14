import { useChat } from '../context/ChatContext';
import { useEffect } from 'react';

export const useSocket = () => {
  const { sendMessage, connectChat, currentChatId } = useChat();

  return {
    sendMessage,
    connectChat,
    currentChatId,
  };
};
