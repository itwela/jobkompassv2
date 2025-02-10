'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface JobKopmassLandingContextType {
    colorPreference: string;
    setColorPreference: (value: string) => void;
}

const JobKompassLandingContext = createContext<JobKopmassLandingContextType | null>(null);

export const JobKompassLandingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [colorPreference, setColorPreference] = useState('light')
    return (
        <JobKompassLandingContext.Provider value={{
            colorPreference,
            setColorPreference
        }}>
          {children}
        </JobKompassLandingContext.Provider>
      );
}

export const useJobKompassLanding = (match?: string) => {
    const context = useContext(JobKompassLandingContext);
    if (!context) throw new Error('useJobKompassLanding must be used within a JobKompassLandingProvider');
    return context;
};