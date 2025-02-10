'use client'

import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createSupClientInstance, supabaseClientClient } from '@/app/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { queryKeys } from '@/app/jkUtilities_and_Tokens/tokens';
import { getCurrentUser, getUserInfo, getUserJobs } from '../functions';
import { useJobKompassUser } from './userProvider';


export interface JobKompassJobsType {
    id: any,
    Company: string;
    Status: string;
    Link: string;
    Keywords: string[];
    Interviewed: boolean; 
    Title: string;
    "Date Applied": string;
    "Resume used": string;
    "Cover letter used": string;
    Description: string;
    Skills: string[];
}
interface JobKompassJobsContextType {

    userJobs: JobKompassJobsType[] | null;
    setUserJobs: (userJobs: JobKompassJobsType[] | null) => void;
    refetchUserJobs: () => Promise<any>;

}



const JobKompassJobsContext = createContext<JobKompassJobsContextType | null>(null);

export const JobKompassJobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const {user} = useJobKompassUser()
    const uid = user?.[0]?.user_id
    const [userJobs, setUserJobs] = useState<JobKompassJobsType[] | null>(null);
    const [jobsDataIsLoading, setJobsDataIsLoading] = useState<boolean>(false);

    // Use useQuery to handle user jobs data fetching
    const { data: jobsData, isLoading: jdLoading, refetch: refetchJD } = useQuery({
        queryKey: [queryKeys.currentUser_Jobs],
        queryFn: () => getUserJobs(uid as string),
        enabled: !!uid, // Only run query when userId exists
    });

    useEffect(() => {
        if (jdLoading) {
            console.log('Loading Jobs...');
            setJobsDataIsLoading(true);
        } else {
            console.log('Jobs Data Loaded!');
            setJobsDataIsLoading(false);
        }
    }, [jdLoading]); 

    useEffect(() => {
        if (jobsData) {
            setUserJobs(jobsData);
            console.log('------ YES ------ User Jobs');
        } else {
            setUserJobs(null);
            console.log('------ NO ------ User Jobs', jobsData);
        }
    }, [jobsData]); 

    return (
        <JobKompassJobsContext.Provider value={{
            userJobs,
            setUserJobs,                        
            refetchUserJobs: refetchJD,
        }}>
            {children}
        </JobKompassJobsContext.Provider>
    );
}

export const useJobKompassJobs = () => {
    const context = useContext(JobKompassJobsContext);
    if (!context) throw new Error('useJobKompassJobs must be used within a JobKompassJobsProvider');
    return context;
};