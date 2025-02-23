'use client';

import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import TechBroResume from "@/app/jkComponents/TechBro/jkTechBroResume";
import { useEffect, useState } from "react";

interface ResumeHTMLProps {
    styles: any
    data: any;
}

export default function ResumeRenderPage({ styles, data }: ResumeHTMLProps) {
    const { user } = useJobKompassUser();
    const { styles: utilStyles } = useJobKompassTheme();
    const { registerContentRef, wantsToPrint, setWantsToPrint, currentTheme } = useJobKompassResume();

    return (
        <div className="relative">
            
            <TechBroResume     
              data={data}
              theme={currentTheme as any}
              registerContentRef={registerContentRef}
            />

        </div>
    );
}