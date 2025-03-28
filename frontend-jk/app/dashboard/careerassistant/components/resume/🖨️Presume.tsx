"use client"

import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider";
import TechBroResume from "@/app/jkComponents/TechBro/jkTechBroResume";
import React from "react";

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