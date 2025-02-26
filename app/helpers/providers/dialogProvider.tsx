'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeDialog: string | null;
  setActiveDialog: (dialog: string | null) => void;
  openDialog: (dialogId: string) => void;
  closeDialog: () => void;
  toggleDialog: (dialogId: string) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const openDialog = useCallback((dialogId: string) => {
    setActiveDialog(dialogId);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setActiveDialog(null);
    setIsOpen(false);
  }, []);

  const toggleDialog = useCallback((dialogId: string) => {
    if (isOpen && activeDialog === dialogId) {
      closeDialog();
    } else {
      openDialog(dialogId);
    }
  }, [isOpen, activeDialog, openDialog, closeDialog]);

  return (
    <DialogContext.Provider 
      value={{ 
        isOpen, 
        setIsOpen, 
        activeDialog, 
        setActiveDialog, 
        openDialog, 
        closeDialog, 
        toggleDialog 
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};