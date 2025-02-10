'use client'

import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { useQuery } from "@tanstack/react-query";
import { ThemeKeys } from "@/app/types";
import { JKLogoSVG } from "@/app/assets/svgs/logo";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import SplashScreen from "@/app/jkUtilities_and_Tokens/components/splashScreen";
import JobKompassGrid from "@/app/jkComponents/jkGrid";
import { useJobKompassJobs } from "@/app/helpers/providers/jobsProvider";
import ConsoleHeader from "../../jkComponents/jkConsoleHeader";
import { useSidebar } from "@/components/ui/sidebar";
import JobsList from "./components/jobsList";
import JobStats from "./components/jobStats";

export default function ApplicationsClient() {

    const { user, userDataIsLoading } = useJobKompassUser()
    const {} = useJobKompassJobs()
    const { open } = useSidebar()
    if (userDataIsLoading) {
        return (
            <>
                <div className={`${JK_Styles(open).bigDashboardContainerStyle}`}>
                    <SplashScreen />
                </div>
            </>
        )
    }

    const filterOfJobButtonStatusClasses = {
        Interested: {
            classname: 'w-[61.8px] h-[61.8px]',
            style: {
                backgroundColor: JK_Colors?.white,
                boxShadow: `6.18px 6.18px 0px ${JK_Colors?.blue_accent}` 
            },
        },
        Applied: {
            classname: 'w-[61.8px] h-[61.8px]',
            style: {
                backgroundColor: JK_Colors?.blue,
                boxShadow: `6.18px 6.18px 0px ${JK_Colors?.blue_accent}`    
            },
        },
        Interviewing: {
            classname: 'w-[61.8px] h-[61.8px]',
            style: {
                backgroundColor: JK_Colors?.indigo,
                boxShadow: `6.18px 6.18px 0px ${JK_Colors?.indigo_accent}`    
            },
        },
        Rejected: {
            classname: 'w-[61.8px] h-[61.8px]',
            style: {
                backgroundColor: JK_Colors?.purple,
                boxShadow: `6.18px 6.18px 0px ${JK_Colors?.purple_accent}`    
            },
        },
        Ghosted: {
            classname: 'w-[61.8px] h-[61.8px]',
            style: {
                backgroundColor: JK_Colors?.darkGrey,
                boxShadow: `6.18px 6.18px 0px ${JK_Colors?.black}`    
            },
        },
    }

    return (
        <div className={`${JK_Styles(open).bigDashboardContainerStyle} w-full min-h-screen h-max`}
        style={{ backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg }}
    >
        <div
            className={`min-h-screen relative h-max w-full ${open ? JK_Styles(open).consoleOpenPadding : JK_Styles(open).consoleClosedPadding}`}
            style={{
                backgroundColor: 'transparent',
                color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
            }}
        >
                <ConsoleHeader 
                    headingText={`Your Applications`}
                    subTitleText={``}
                />
                <div className="flex flex-col w-full  gap-5">
                    <JobsList/>
                    <JobStats/>
                </div>
                {/* <JobKompassGrid /> */}
            </div>
        </div>
    );
}