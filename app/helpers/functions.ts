"use client";
import {useEffect} from "react";
import * as PDFJS from "pdfjs-dist/types/src/pdf";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
// import { getCurrentUser } from '../helpers/reactQueryFucntions';
import { useJobKompassUser } from "./providers/userProvider";
import { queryKeys } from "../jkUtilities_and_Tokens/tokens";
import { supabaseClientClient } from '@/app/utils/supabase/client';


const psch = process.env.NEXT_PUBLIC_PUB_SCHEMA_NAME;
const uta = process.env.NEXT_PUBLIC_USER_TABLE_NAME;
const jta = process.env.NEXT_PUBLIC_JOBS_TABLE_NAME;

if (!psch || !uta || !jta) {
  throw new Error('PUB_SCHEMA_NAME is not defined');
}

export async function getCurrentUser() {
  try {

    const { data, error } = await supabaseClientClient.auth.getSession();
    
    // If no session exists, return null (user not logged in)
    if (!data.session) {
      console.log('No active session found');
      return null;
    }

    // If we have a session, then get the user
    const { data: { user }, error: userError } = await supabaseClientClient.auth.getUser();
    
    if (userError) {
      console.error("getCurrentUser error:", userError);
      return null;
    }
    
    if (!user) {
      console.log('No user found');
      return null;
    }
    
    console.log('User found:');
    return user.id;
    
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
  
}

export const getUserInfo = async (id: string) => {
    
  try {
      const { data: profileData } = await supabaseClientClient
          .schema(psch)
          .from(uta)
          .select()
          .eq('user_id', id)
      return profileData;
  } catch (error) {
      return null;
  }
}

export async function getUserJobs(userId: string) {
     
    try {
        // Your implementation here
        const { data: jobsData } = await supabaseClientClient
            .schema(psch as string)
            .from(jta as string)
            .select()
            .eq('user_id', userId)  // Fixed: using userId instead of undefined 'id'
        return jobsData;
      } catch (error) {
        return null;
    }
  }

export const usePDFJS = (onLoad: (pdfjs: typeof PDFJS) => Promise<void>, deps: (string | number | boolean | undefined | null)[] = []) => {
  
  const [pdfjs, setPDFJS] = useState<typeof PDFJS>();
  
  // load the library once on mount (the webpack import automatically sets-up the worker)
  useEffect(() => {
    import("pdfjs-dist/webpack.mjs").then(setPDFJS)
  }, []);

  // execute the callback function whenever PDFJS loads (or a custom dependency-array updates)
  useEffect(() => {
    if(!pdfjs) return;
    (async () => await onLoad(pdfjs))();
  }, [ pdfjs, ...deps ]);
}