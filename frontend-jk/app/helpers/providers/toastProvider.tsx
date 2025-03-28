'use client'

import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface JobKompassToastContextType {
    toastHeader: string;
    setToastHeader: (message: string) => void;
    toastMessage: string;
    setToastMessage: (message: string) => void;
    toastIsVisible: boolean;
    setToastIsVisible: (isVisible: boolean) => void;
    toastType: 'success' | 'error' | 'warning' | 'info' | 'none';
    setToastType: (type: 'success' | 'error' | 'warning' | 'info' | 'none') => void;
    toastButton?: React.ReactNode;
    setToastButton: (action: React.ReactNode | undefined) => void;
}
const JobKompassToastContext = createContext<JobKompassToastContextType | undefined>(undefined);

export const JobKompassToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [toastHeader, setToastHeader] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastIsVisible, setToastIsVisible] = useState(false);
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info' | 'none'>('none');
    const [toastButton, setToastButton] = useState<React.ReactNode>();

    const value = {
        toastHeader,
        setToastHeader,
        toastMessage,
        setToastMessage,
        toastIsVisible,
        setToastIsVisible,
        toastType,
        setToastType,
        toastButton,
        setToastButton,
    };

    return (
        <JobKompassToastContext.Provider value={value}>
            {children}
        </JobKompassToastContext.Provider>
    );
};

export const useJobKompassToast = () => {
    const context = useContext(JobKompassToastContext);
    if (!context) {
        throw new Error('useJobKompassToast must be used within a JobKompassToastProvider');
    }
    return context;
};