'use client';

import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { useSidebar } from "@/components/ui/sidebar";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { useQuery } from "@tanstack/react-query";
import { JKLogoSVG } from "@/app/assets/svgs/logo";
import { ThemeKeys } from "@/app/types";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import SplashScreen from "@/app/jkUtilities_and_Tokens/components/splashScreen";
import ConsoleHeader from "@/app/jkComponents/jkConsoleHeader";
import ResumeChoices from "./components/resumeChoices";
import JkGap from "@/app/jkUtilities_and_Tokens/components/jkGap";
import UploadDocs from "./components/uploadDocs";
import JobKompassTabs from "@/app/jkComponents/jkTabs";
import MyDocs from "./components/myResumes";
import MyResumes from "./components/myResumes";
import MyCoverLetters from "./components/myCoverLetters";
import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider";
import JobKompassToast from "@/app/jkComponents/jkToast";

export default function CareerAssistantClient() {

    const { user, userDataIsLoading } = useJobKompassUser()
    const { startEditingDocument, setStartEditingDocument, myResumeSelection, myCoverLetterSelection, myResumeTemplateSelection, myCoverLetterTemplateSelection, myResumeSelectionIndex, myCoverLetterSelectionIndex, myResumeTemplateSelectionIndex, myCoverLetterTemplateSelectionIndex, setMyResumeSelection, setMyResumeSelectionIndex, setMyCoverLetterSelection, setMyCoverLetterSelectionIndex, setMyResumeTemplateSelection, setMyResumeTemplateSelectionIndex, setMyCoverLetterTemplateSelection, setMyCoverLetterTemplateSelectionIndex } = useJobKompassCareerAssistant()
    const { open, openMobile } = useSidebar()

    if (userDataIsLoading) {
        return (
            <>
                <div className={`${JK_Styles(open).bigDashboardContainerStyle}`}>
                    <SplashScreen />
                </div>
            </>
        )
    }

    return (
        <>
        <JobKompassToast/>
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
                    headingText={`Career Assistant`}
                    subTitleText={`Take one step closer to your dream job, today!`}
                />

                <JkGap/>


                {/* my docs and upload */}
                <JobKompassTabs
                tabs={[
                    {
                        label: 'My Resumes',
                        children: 
                        <>
                        <MyResumes/>
                        </>
                    },
                    {
                        label: 'My Cover Letters',
                        children: 
                        <>
                        <MyCoverLetters/>
                        </>
                    },
                    {
                        label: 'Upload',
                        children: 
                        <>
                            <UploadDocs/>
                        </>
                    },
                ]}
                />


                <JkGap/>
                <h2 className={`${JK_Styles(open).headingSize}`}>Templates</h2>
                <JkGap/>

                {/* resume choices */}
                <ResumeChoices/>

                {/* cover letter choices */}

            </div>

        </div>
        </>
    );
}