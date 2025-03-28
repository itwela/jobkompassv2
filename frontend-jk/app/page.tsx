'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "./jkUtilities_and_Tokens/components/splashScreen";
import LandingPage from "./landing/landingPage";
import { useQuery } from "@tanstack/react-query";
export default function Home() {
  const router = useRouter();
  // Check sign-in status on component mount

  // Redirect to dashboard if signed in
  // useEffect(() => {
  //   if (isSignedIn === true) {
  //     console.log('usertheme', userColorTheme)
  //     router.push('/dashboard/');
  //   }
  // }, [isSignedIn, router]);

  // Show splash screen while loading
  // if (   
  //   user === null 
  //   ) {
  //   return <SplashScreen />;
  // }

  // Render LandingPage with fetched color theme
  return (
    <>
        <LandingPage />
    </>
  );

}