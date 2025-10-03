import { useContext } from 'react';
import { ChatbotContext } from '../contexts/ChatbotContext';

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};