'use client'

import { JK_Styles  } from "@/app/jkUtilities_and_Tokens/styles";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { JKLogoSVG } from "@/app/assets/svgs/logo";
import { useQuery } from "@tanstack/react-query";
import { ThemeKeys } from "@/app/types";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import SplashScreen from "@/app/jkUtilities_and_Tokens/components/splashScreen";
import { useSidebar } from "@/components/ui/sidebar";

export default function CompanyHubClient() {

    const {user, userDataIsLoading} = useJobKompassUser()
    const { open } = useSidebar()

    if(userDataIsLoading) {
        return (
            <>
            <div className={`${JK_Styles.bigDashboardContainerStyle}`}>
                <SplashScreen />
            </div>
        </>
        )
    }

    return (
        <div className={`${JK_Styles.bigDashboardContainerStyle} w-full`}
        style={{ backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg }}
    >
        <div
            className={`min-h-screen relative h-max w-full ${open ? JK_Styles.consoleOpenPadding : JK_Styles.consoleClosedPadding}`}
            style={{
                backgroundColor: 'transparent',
                color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
            }}
        >
            <h1 className='text-2xl animate-pulse'>Company Hub</h1>
        </div>
        </div>
    );
}