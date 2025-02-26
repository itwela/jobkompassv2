'use client'

import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createSupClientInstance, supabaseClientClient } from '@/app/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { queryKeys } from '@/app/jkUtilities_and_Tokens/tokens';
import { getCurrentUser, getUserInfo, getUserJobs } from '../functions';
import { UserFieldData } from '@/app/jkComponents/TechBro/types';
export interface JobKompassUserType {
    user_id: any;
    firstName: any;
    lastName: any;
    username: any;
    email: string;
    color_theme?: any  
    resumes: string[];
    cover_letters: string[];
    bios?: {
        title: string;
        text: string;
    }[];
    // TODO
    fields? : {
        title: string;
        data: UserFieldData[];
    }[];
}
interface JobKompassUserContextType {
    userId: any;
    setUserId: (user: any) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    user: JobKompassUserType[] | null;
    setUser: (user: JobKompassUserType[] | null) => void;
    userDataIsLoading: boolean;
    setUserDataIsLoading: (value: boolean) => void;

    // userJobs: any;
    // setUserJobs: (user: any) => void;
    
    
    refetchAuthUser: () => Promise<any>;
    refetchUserData: () => Promise<any>;
    // refetchUserJobs: () => Promise<any>;

}



const JobKompassUserContext = createContext<JobKompassUserContextType | null>(null);

export const JobKompassUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const router = useRouter();
    const [userId, setUserId] = useState<any>(null);
    const [user, setUser] = useState<JobKompassUserType[] | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<any>(null);
    const [userDataIsLoading, setUserDataIsLoading] = useState<any>(null);
    const [userJobs, setUserJobs] = useState<any>(null);
    const [jobsDataIsLoading, setJobsDataIsLoading] = useState<boolean>(false);

    // Use useQuery to handle auth user data fetching
    const { data: authUserId, isLoading: auidLoading, refetch: refetchAUID } = useQuery({
        queryKey: [queryKeys.currentUser],
        queryFn: getCurrentUser
    });

    // Use useQuery to handle user data fetching
    const { data: userData, isLoading: udLoading, refetch: refetchUD } = useQuery({
        queryKey: [queryKeys.currentUser_Data, authUserId], // Add authUserId to queryKey
        queryFn: () => getUserInfo(authUserId as string),
        enabled: !!authUserId, // Only run query when authUserId exists
    });

    // Use useQuery to handle user jobs data fetching
    // const { data: jobsData, isLoading: jdLoading, refetch: refetchJD } = useQuery({
    //     queryKey: [queryKeys.currentUser_Jobs],
    //     queryFn: () => getUserJobs(authUserId as string),
    //     enabled: !!authUserId, // Only run query when userId exists
    // });

    useEffect(() => {
        if (auidLoading || udLoading) {
            setUserDataIsLoading(true);
        } else {
            setUserDataIsLoading(false);
        }
    }, [auidLoading, udLoading]);

    useEffect(() => {
        if (authUserId) {
            setUserId(authUserId);
            setIsAuthenticated(true);
            console.log('User ------ IS ------ authenticated');
        } else {
            setUserId(null);
            setIsAuthenticated(false);
            console.log('User is ------ NOT ----- authenticated');
        }
    }, [authUserId]);

    useEffect(() => {
        if (userData) {
            setUser(userData);
            console.log('------ YES ------ User');
        } else {
            setUser(null);
            console.log('------ NO ------ User:');
        }
    }, [userData]);

    // useEffect(() => {
    //     if (jdLoading) {
    //         console.log('Loading Jobs...');
    //         setJobsDataIsLoading(true);
    //     } else {
    //         console.log('Jobs Data Loaded!');
    //         setJobsDataIsLoading(false);
    //     }
    // }, [jdLoading]); 

    // useEffect(() => {
    //     if (jobsData) {
    //         setUserJobs(jobsData);
    //         console.log('------ YES ------ User Jobs');
    //     } else {
    //         setUserJobs(null);
    //         console.log('------ NO ------ User Jobs', jobsData);
    //     }
    // }, [jobsData]); 

    return (
        <JobKompassUserContext.Provider value={{
            userId,
            setUserId,
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            userDataIsLoading,
            setUserDataIsLoading,

            // userJobs,
            // setUserJobs,
                        
            refetchAuthUser: refetchAUID,
            refetchUserData: refetchUD,
            // refetchUserJobs: refetchJD,
        }}>
            {children}
        </JobKompassUserContext.Provider>
    );
}

export const useJobKompassUser = () => {
    const context = useContext(JobKompassUserContext);
    if (!context) throw new Error('useJobKompassUser must be used within a JobKompassUserProvider');
    return context;
};