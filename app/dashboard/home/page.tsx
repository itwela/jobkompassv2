'use client';
import { JK_Styles } from '@/app/jkUtilities_and_Tokens/styles';
import AiResumeEditor from './components/AiResumeEditor';
import JobScraper from './components/JobScraper';
import { ThemeKeys } from "@/app/types";
import { JK_Colors } from '@/app/jkUtilities_and_Tokens/colors';
import SplashScreen from '@/app/jkUtilities_and_Tokens/components/splashScreen';
import { useJobKompassUser } from '@/app/helpers/providers/userProvider';
import { createSupClientInstance } from '@/app/utils/supabase/client';
import { useEffect, useState } from 'react';
import QuickAdd from './components/quickAdd';
import ConsoleHeader from '../../jkComponents/jkConsoleHeader';
import FeatuureBoxes from './components/featureBoxes';
import { useSidebar } from '@/components/ui/sidebar';
import RecentJobs from './components/recentJobs';
import ShortCuts from './components/shortcuts';

export default function Dashboard({getJobInformationStagehand}: {getJobInformationStagehand: any}) {
    const {user, userDataIsLoading} = useJobKompassUser();
    const supabase = createSupClientInstance();
    const { open } = useSidebar()
  
    if(userDataIsLoading) {
        return (
            <>
            <div className={`${JK_Styles(open).bigDashboardContainerStyle}`}>
                <SplashScreen />
            </div>
        </>
        )
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
                    headingText={`Good Morning, ${user?.[0]?.username?.charAt(0).toUpperCase() + user?.[0]?.username?.slice(1)}`}
                    subTitleText={`Check out our features:`}
                />
                <FeatuureBoxes/>
                <div className='h-[60px]'/>
                <div className='flex md:flex-row flex-col md:min-h-[400px] h-max  justify-between '>
                    <RecentJobs/>
                    <div className='flex flex-col gap-5 justify-between md:w-[48%]'>
                        <QuickAdd user={user} handleGetJobWithStageHand={getJobInformationStagehand} />
                        <ShortCuts/>
                    </div>
                </div>
            </div>
        </div>
    );
}

