'use client';

import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import TechBroResume from "@/app/jkComponents/TechBro/jkTechBroResume";
import { useEffect, useState } from "react";
import { themes } from "./resumeTemplates";

interface ResumeHTMLProps {
    styles: any
    data: any;
}

export default function ResumeRenderPage({ styles, data }: ResumeHTMLProps) {
    const { user } = useJobKompassUser();
    const { styles: utilStyles } = useJobKompassTheme();
    const { registerContentRef, wantsToPrint, setWantsToPrint, currentTheme } = useJobKompassResume();

    return (
        <div className="w-full h-full bg-red-300">
        <TechBroResume
            data={data}
            theme={themes['Tech Bro']}
            registerContentRef={registerContentRef}
            />
        </div>
    //     <div
    //     className="w-full h-full overflow-y-auto rounded-xl"
    //     style={{ backgroundColor: "#fff" }}
    //     // style={{ backgroundColor: "red" }}
    // >
    //     <div className="relative">
    //     </div>

    // </div>
    );
}