'use client';

import { useJobKompassAssets } from "@/app/helpers/hooks/useJobKompassAssets";
import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider";
import { useJobKompassResume } from "@//app/helpers/providers/JobKompassResumeProvider";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { useJobKompassToast } from "@/app/helpers/providers/toastProvider";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import ConsoleHeader from "@/app/jkComponents/jkConsoleHeader";
import JkGradientImage from "@/app/jkComponents/jkGradientImage";
import JobKompassTabs from "@/app/jkComponents/jkTabs";
import JobKompassToast from "@/app/jkComponents/jkToast";
import JkGap from "@/app/jkUtilities_and_Tokens/components/jkGap";
import SplashScreen from "@/app/jkUtilities_and_Tokens/components/splashScreen";
import { useSidebar } from "@/components/ui/sidebar";
import { useRef } from "react";
import DocumentEditor from "./components/documentEditor";
import MyCoverLetters from "./components/myCoverLetters";
import MyResumes from "./components/myResumes";
import { themes } from "./components/resume/resumeTemplates";
import StartCareerChat from "./components/startResumeChat";
import UploadDocs from "./components/uploadDocs";

export default function CareerAssistantClient() {
    const { user, userDataIsLoading } = useJobKompassUser();
    const { styles } = useJobKompassTheme();
    const { setToastIsVisible, setToastMessage, setToastHeader } = useJobKompassToast();
    const { open } = useSidebar();
    const { currentTheme, setCurrentTheme, currentThemeName } = useJobKompassResume()
    const { getAsset } = useJobKompassAssets();
    const {
        wantsToPreviewResume,
        setWantsToPreviewResume,
        startEditingDocument,
        setStartEditingDocument,
        myResumeSelection,
        myCoverLetterSelection,
        myResumeTemplateSelection,
        myCoverLetterTemplateSelection,
        myResumeSelectionIndex,
        myCoverLetterSelectionIndex,
        myResumeTemplateSelectionIndex,
        myCoverLetterTemplateSelectionIndex,
        setMyResumeSelection,
        setMyResumeSelectionIndex,
        setMyCoverLetterSelection,
        setMyCoverLetterSelectionIndex,
        setMyResumeTemplateSelection,
        setMyResumeTemplateSelectionIndex,
        setMyCoverLetterTemplateSelection,
        setMyCoverLetterTemplateSelectionIndex
    } = useJobKompassCareerAssistant();

    const refOfThisComponent = useRef<HTMLDivElement>(null);

    if (userDataIsLoading) {
        return (
            <div className="fixed w-screen z-[30] h-screen flex items-center justify-center">
                <SplashScreen />
            </div>
        )
    }

    if (startEditingDocument) {
        return (
            <>
                <JobKompassToast />
                <DocumentEditor />
            </>
        );
    }

    const handleStartEditing = () => {
        setStartEditingDocument(true);
        setWantsToPreviewResume(false);
        setToastIsVisible(false);
        setToastHeader('');
        setToastMessage('');

        setCurrentTheme(themes[currentThemeName as keyof typeof themes])
    };

    return (
        <>
            <JobKompassToast />

            <div style={{backgroundColor: styles.background}} ref={refOfThisComponent} className="fixed w-screen z-[-30]  h-screen"/>

            <div className="min-h-screen w-full relative" style={{ backgroundColor: styles.background }}>
                <JkGradientImage
                    imageSrc={getAsset('mapLayout')}
                    imageRight="-20px"
                    imageTop="-200px"
                    opacity="30%"
                    flip
                    needsInversion
                />

                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="w-full z-[3] relative mx-auto h-max flex flex-col gap-5">
                        <div className="">
                            <ConsoleHeader
                                headingText="Career Assistant"
                                subTitleText="Take one step closer to your dream job, today!"
                            />

                            <JkGap />

                            {/* my docs and upload */}
                            <JobKompassTabs
                                tabs={[
                                    {
                                        label: 'My Resumes',
                                        children: <MyResumes parentRef={refOfThisComponent as React.RefObject<HTMLDivElement>} />
                                    },
                                    {
                                        label: 'My Cover Letters',
                                        children: <MyCoverLetters />
                                    },
                                    {
                                        label: 'Upload',
                                        children: <UploadDocs />
                                    }
                                ]}
                            />

                            <JkGap />

                            {/* resume choices */}
                            <StartCareerChat />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}