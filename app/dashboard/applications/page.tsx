'use client'

import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import SplashScreen from "@/app/jkUtilities_and_Tokens/components/splashScreen";
import { useJobKompassJobs } from "@/app/helpers/providers/jobsProvider";
import ConsoleHeader from "../../jkComponents/jkConsoleHeader";
import { useSidebar } from "@/components/ui/sidebar";
import JobsList from "./components/jobsList";
import JobStats from "./components/jobStats";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";

export default function ApplicationsClient() {
    const { user, userDataIsLoading } = useJobKompassUser()
    const { styles } = useJobKompassTheme();
    const {} = useJobKompassJobs()
    const { open } = useSidebar()

    if (userDataIsLoading) {
        return (
            <div className="fixed w-screen z-[30] h-screen flex items-center justify-center">
                <SplashScreen />
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full"
            style={{ backgroundColor: styles.background }}
        >
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16"
            >
                <ConsoleHeader 
                    headingText="Your Applications"
                    subTitleText="Track and manage your job applications"
                />
                <div className="mt-8 h-max space-y-8">
                    <JobsList/>
                    <JobStats/>
                </div>
            </div>
        </div>
    );
}