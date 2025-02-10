'use client'

import Header from "../jkComponents/jkLandingHeader";
import { JK_Styles  } from "@/app/jkUtilities_and_Tokens/styles";
import { JK_Colors } from "../jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "../types";
import { useQuery } from "@tanstack/react-query";
import SplashScreen from "../jkUtilities_and_Tokens/components/splashScreen";
import { useJobKompassUser } from "../helpers/providers/userProvider";
import { useJobKompassLanding } from "../helpers/providers/landingProvider";

export default function LandingPage() {


    const {colorPreference, setColorPreference} = useJobKompassLanding()
    

    const handleColorPreferenceChange = (colorPreference: string) => {
        if (colorPreference === 'dark') {
            setColorPreference('light')
        } else {
            setColorPreference('dark')
        }
    };

    return (
        <>
        <Header/>
        <div className={`${JK_Styles.landingPageContainerStyle} flex flex-col`}
            style={{backgroundColor: JK_Colors?.[colorPreference as ThemeKeys]?.fg}}
        >
            <button onClick={() => handleColorPreferenceChange(colorPreference)}>
                switch
            </button>
            <h1 >JobKompass</h1>
            <a href="/dashboard">Go</a>
        </div>
        </>
    );
}