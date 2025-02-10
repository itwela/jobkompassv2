'use client'

import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface JobKompassCareerAssistantContextType {
    myResumeSelection: string;
    setMyResumeSelection: (selection: string) => void;
    myResumeSelectionIndex: number;
    setMyResumeSelectionIndex: (index: number) => void;
    myCoverLetterSelection: string;
    setMyCoverLetterSelection: (selection: string) => void;
    myCoverLetterSelectionIndex: number;
    setMyCoverLetterSelectionIndex: (index: number) => void;
    myResumeTemplateSelection: any;
    setMyResumeTemplateSelection: (selection: any) => void;
    myResumeTemplateSelectionIndex: number;
    setMyResumeTemplateSelectionIndex: (index: number) => void;
    myCoverLetterTemplateSelection: any;
    setMyCoverLetterTemplateSelection: (selection: any) => void;
    myCoverLetterTemplateSelectionIndex: number;
    setMyCoverLetterTemplateSelectionIndex: (index: number) => void;
    startEditingDocument: boolean;
    setStartEditingDocument: (startEditing: boolean) => void;
}

const JobKompassCareerAssistantContext = createContext<JobKompassCareerAssistantContextType | undefined>(undefined);

export const JobKompassCareerAssistantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [myResumeSelection, setMyResumeSelection] = useState<string>('');
    const [myResumeSelectionIndex, setMyResumeSelectionIndex] = useState<number>(-2);
    const [myCoverLetterSelection, setMyCoverLetterSelection] = useState<string>('');
    const [myCoverLetterSelectionIndex, setMyCoverLetterSelectionIndex] = useState<number>(-2);
    const [myResumeTemplateSelection, setMyResumeTemplateSelection] = useState<any>(null);
    const [myResumeTemplateSelectionIndex, setMyResumeTemplateSelectionIndex] = useState<number>(-2);
    const [myCoverLetterTemplateSelection, setMyCoverLetterTemplateSelection] = useState<any>(null);
    const [myCoverLetterTemplateSelectionIndex, setMyCoverLetterTemplateSelectionIndex] = useState<number>(-2);
    const [startEditingDocument, setStartEditingDocument] = useState<boolean>(false);

    const value = {
        myResumeSelection,
        setMyResumeSelection,
        myResumeSelectionIndex,
        setMyResumeSelectionIndex,
        myCoverLetterSelection,
        setMyCoverLetterSelection,
        myCoverLetterSelectionIndex,
        setMyCoverLetterSelectionIndex,
        myResumeTemplateSelection,
        setMyResumeTemplateSelection,
        myResumeTemplateSelectionIndex,
        setMyResumeTemplateSelectionIndex,
        myCoverLetterTemplateSelection,
        setMyCoverLetterTemplateSelection,
        myCoverLetterTemplateSelectionIndex,
        setMyCoverLetterTemplateSelectionIndex,
        startEditingDocument,
        setStartEditingDocument,
    };

    return (
        <JobKompassCareerAssistantContext.Provider value={value}>
            {children}
        </JobKompassCareerAssistantContext.Provider>
    );
};

export const useJobKompassCareerAssistant = () => {
    const context = useContext(JobKompassCareerAssistantContext);
    if (!context) {
        throw new Error('useJobKompassCareerAssistant must be used within a JobKompassCareerAssistantProvider');
    }
    return context;
};