'use client';

import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { useSidebar } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import SplashScreen from "@/app/jkUtilities_and_Tokens/components/splashScreen";
import ConsoleHeader from "@/app/jkComponents/jkConsoleHeader";
import ResumeChoices from "./components/resumeChoices";
import JkGap from "@/app/jkUtilities_and_Tokens/components/jkGap";
import UploadDocs from "./components/uploadDocs";
import JobKompassTabs from "@/app/jkComponents/jkTabs";
import MyResumes from "./components/myResumes";
import MyCoverLetters from "./components/myCoverLetters";
import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider";
import JobKompassToast from "@/app/jkComponents/jkToast";
import DocumentEditor from "./components/documentEditor";
import { useRef } from "react";
import { useJobKompassToast } from "@/app/helpers/providers/toastProvider";
import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider";
import { themes } from "./components/resume/resumeTemplates";
import JkGradientImage from "@/app/jkComponents/jkGradientImage";
import { useJobKompassAssets } from "@/app/helpers/hooks/useJobKompassAssets";
import Image from "next/image";
import robot from './../../../public/assets/images/robot.png'
import bluegraient from './../../../public/assets/images/b-grad-1.png'
import bluegraient2 from './../../../public/assets/images/b-grad-2.png'
import map from './../../../public/assets/images/map-layout.png'
import JkGradientVideo from "@/app/jkComponents/jkGradientVideo";

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

            <div ref={refOfThisComponent} className="fixed w-screen z-[-30] bg-red-200 h-screen"/>

            <div className="min-h-screen w-full relative" style={{ backgroundColor: styles.background }}>
                <JkGradientImage
                    imageSrc={getAsset('mapLayout')}
                    imageRight="-20px"
                    imageTop="-200px"
                    opacity="30%"
                    flip
                    needsInversion
                />
                {/* <JkGradientVideo
                videoName="gradient4Compressed.mp4"
                /> */}
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
                            <h2 style={{color: styles.text.primary}} className={`${JK_Styles(open).headingSize}`}>Templates</h2>
                            <JkGap />

                            {/* resume choices */}
                            <ResumeChoices />

                            {/* start editing */}
                            {myResumeTemplateSelection && (
                                <div
                                    onClick={handleStartEditing}
                                    style={{
                                        backgroundColor: styles.nav.colors.careerAssistant,
                                        transition: 'all 0.3s ease'
                                    }}
                                    className="w-full rounded-md text-white font-bold h-[50px] flex place-items-center place-content-center mt-[75px] cursor-pointer hover:opacity-90 hover:translate-y-[-2px]"
                                >
                                    <h1>Start Editing!</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}