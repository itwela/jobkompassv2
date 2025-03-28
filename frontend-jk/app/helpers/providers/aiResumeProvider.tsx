'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';


interface JkAiChatProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  
}


const JkAiChatContext = createContext<JkAiChatProps | undefined>(undefined);

export function JobKompassAiResumeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <JkAiChatContext.Provider
      value={{
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </JkAiChatContext.Provider>
  );
}

export function useJkAiChatHook() {
  const context = useContext(JkAiChatContext);
  if (context === undefined) {
    throw new Error('useJkAiChatContext must be used within a JkAiChatContextProvider');
  }
  return context;
}
