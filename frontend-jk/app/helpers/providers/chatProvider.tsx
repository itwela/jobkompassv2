'use client'

import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface JobKompassChatContextType {
    input: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

const JobKompassChatContext = createContext<JobKompassChatContextType | undefined>(undefined);

export const JobKompassChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [input, setInput] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSubmit = async () => {
        if (!input.trim()) return;
        // Handle form submission logic here
        console.log('Form submitted with input:', input);
        // Reset the input field
        setInput('');
    };

    const value = {
        input,
        handleInputChange,
        handleSubmit,
    };

    return (
        <JobKompassChatContext.Provider value={value}>
            {children}
        </JobKompassChatContext.Provider>
    );
};

export const useJobKompassChat = () => {
    const context = useContext(JobKompassChatContext);
    if (!context) {
        throw new Error('useJobKompassChat must be used within a JobKompassChatProvider');
    }
    return context;
};