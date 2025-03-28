'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface JobKopmassAuthContextType {
    jkToken?: string;
    setjkToken?: (value: string) => void;
    authIntent?: string;
    setAuthIntent?: (value: string) => void;
    authEmail?: string;
    setAuthEmail?: (value: string) => void;
    authPassword?: string;
    setAuthPassword?: (value: string) => void;
}

const JobKompassAuthContext = createContext<JobKopmassAuthContextType | null>(null);

export const JobKompassAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jkToken, setjkToken] = useState('')
    const [authIntent, setAuthIntent] = useState<string>('login')
    const [authEmail, setAuthEmail] = useState<string>('')
    const [authPassword, setAuthPassword] = useState<string>('')

    return (
        <JobKompassAuthContext.Provider value={{
            jkToken,
            setjkToken,
            authIntent,
            setAuthIntent,
            authEmail,
            setAuthEmail,
            authPassword,
            setAuthPassword
        }}>
          {children}
        </JobKompassAuthContext.Provider>
      );
}

export const useJobKompassAuth = (match?: string) => {
    const context = useContext(JobKompassAuthContext);
    if (!context) throw new Error('useJobKompassAuth must be used within a JobKompassAuthProvider');
    return context;
};