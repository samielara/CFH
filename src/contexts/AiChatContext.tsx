
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AiChatContextType {
  isOpen: boolean;
  toggleOpen: () => void;
  setIsOpen: (open: boolean) => void;
}

const AiChatContext = createContext<AiChatContextType | undefined>(undefined);

export const AiChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <AiChatContext.Provider value={{ isOpen, toggleOpen, setIsOpen }}>
      {children}
    </AiChatContext.Provider>
  );
};

export const useAiChat = () => {
  const context = useContext(AiChatContext);
  if (context === undefined) {
    throw new Error('useAiChat must be used within an AiChatProvider');
  }
  return context;
};
