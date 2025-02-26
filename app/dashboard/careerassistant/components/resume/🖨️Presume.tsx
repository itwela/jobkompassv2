"use client"

import React from "react";
import { Document } from "@htmldocs/react";
import { TechBroProps } from "./resumeTemplates";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider";
import TechBroResume from "@/app/jkComponents/TechBro/jkTechBroResume";

export default function PrintResume() {
    const {currentTheme, userFieldData, wantsToPrint, setWantsToPrint, registerContentRef} = useJobKompassResume();

    React.useEffect(() => {
        setWantsToPrint(true);

        console.log("wantsToPrint: ", wantsToPrint)
        
        return () => {
            setWantsToPrint(false);
        };
        
    }, [setWantsToPrint])

    return (

        <TechBroResume
            data={userFieldData}
            theme={currentTheme as any}
            registerContentRef={registerContentRef}
        />
        
    );
}