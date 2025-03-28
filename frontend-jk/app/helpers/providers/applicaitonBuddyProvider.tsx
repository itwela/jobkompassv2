'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

interface JobKompassApplicationBuddyContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openApplicationBuddy: () => void;
  closeApplicationBuddy: () => void;
}

const JobKompassApplicationBuddyContext = createContext<JobKompassApplicationBuddyContextType | undefined>(undefined);

export function JobKompassApplicationBuddyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);  
  const openApplicationBuddy = () => setIsOpen(true);
  const closeApplicationBuddy = () => setIsOpen(false);

  return (
    <JobKompassApplicationBuddyContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openApplicationBuddy,
        closeApplicationBuddy,
      }}
    >
      {children}
    </JobKompassApplicationBuddyContext.Provider>
  );
}

export function useJobKompassApplicationBuddy() {
  const context = useContext(JobKompassApplicationBuddyContext);
  if (context === undefined) {
    throw new Error('useJobKompassBuddy must be used within a JobKompassBuddyProvider');
  }
  return context;
}
