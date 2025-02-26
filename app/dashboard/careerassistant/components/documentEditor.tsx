'use client'

import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider";
import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import ConsoleHeader from "@/app/jkComponents/jkConsoleHeader";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import EditFields from './editFields';
import ResumeRenderPage from "./resume/page";
import { TechBroProps } from "./resume/resumeTemplates";
import PrintDocumentComponent from "./🖨️PdocumentComponent";
import { ResumeChat } from "./resumeChat";
import { Message, useChat } from '@ai-sdk/react';

export default function DocumentEditor() {

    const { user } = useJobKompassUser();
    const {
        startEditingDocument, setStartEditingDocument,
        myResumeSelection, myCoverLetterSelection,
        myResumeTemplateSelection, myCoverLetterTemplateSelection,
        myResumeSelectionIndex, myCoverLetterSelectionIndex,
        myResumeTemplateSelectionIndex, myCoverLetterTemplateSelectionIndex,
        setMyResumeSelection, setMyResumeSelectionIndex,
        setMyCoverLetterSelection, setMyCoverLetterSelectionIndex,
        setMyResumeTemplateSelection, setMyResumeTemplateSelectionIndex,
        setMyCoverLetterTemplateSelection, setMyCoverLetterTemplateSelectionIndex
    } = useJobKompassCareerAssistant()
    const { messages, setMessages, input, setInput, handleSubmit, isLoading } = useChat({});
    const [additionalResumeContext, setAdditionalResumeContext] = useState('')
    const [selectedBio, setSelectedBio] = useState<string>('');


    // Sync user data when available
    useEffect(() => {
        if (user?.[0]) {
            setUserFieldData((prev: any) => ({
                ...prev,
                personalInfo: {
                    firstName: user[0].firstName || prev.personalInfo.firstName,
                    lastName: user[0].lastName || prev.personalInfo.lastName,
                    email: user[0].email || prev.personalInfo.email,
                    citizenship: prev.personalInfo.citizenship,
                    phone: prev.personalInfo.phone,
                    location: prev.personalInfo.location,
                    website: prev.personalInfo.website,
                    socials: prev.personalInfo.socials,
                },
            }));
        }
    }, [user]);

    // Update resume data dynamically
    const handleUpdateResumeData = (
        field: keyof TechBroProps["personalInfo"] | "summary" | "skills" | "education" | "experience" | "projects" | "additionalInfo",
        value: any
    ) => {
        setUserFieldData((prev: TechBroProps): TechBroProps => {
            if (field === "skills") {
                return {
                    ...prev,
                    skills: value as { technical: string[]; additional: string[] }
                };
            }
            if (field === "education") {
                return {
                    ...prev,
                    education: value as Array<{
                        name: string;
                        field: string;
                        startDate: string;
                        endDate: string;
                        school: string;
                        degree: string;
                        description: string;
                        technologies: string[];
                        date: string;
                        details: string[];
                    }>
                };
            }
            if (field === "experience") {
                return {
                    ...prev,
                    experience: value as Array<{
                        title: string;
                        company: string;
                        location: string;
                        date: string;
                        description: string;
                        details: string[];
                    }>
                };
            }
            if (field === "projects") {
                return {
                    ...prev,
                    projects: value as Array<{
                        name: string;
                        achievement: string;
                        technologies: string[];
                        date: string;
                        details: string[];
                        title: string;
                        description: string;
                        link: string;
                        skills: string[];
                    }>
                };
            }

            if (field === "additionalInfo") {
                return {
                    ...prev,
                    additionalInfo: value as {
                        interests: string[];
                        hobbies: string[];
                        languages: string[];
                        references: string[];
                    }
                };
            }

            return { ...prev, personalInfo: { ...prev.personalInfo, [field]: value } };
        });
    };

    const handleCloseEditor = () => {
        setStartEditingDocument(false)
        setMyResumeSelection('')
        setMyCoverLetterSelection('')
        setMyResumeTemplateSelection('')
        setMyCoverLetterTemplateSelection('')
        setMyResumeSelectionIndex(-2)
        setMyCoverLetterSelectionIndex(-2)
        setMyResumeTemplateSelectionIndex(-2)
        setMyCoverLetterTemplateSelectionIndex(-2)
    };

    const { styles } = useJobKompassTheme()
    const { currentTheme, setCurrentTheme, userFieldData, setUserFieldData, wantsToPrint } = useJobKompassResume()
    const [isReady, setIsReady] = useState(false);

    
    useEffect(() => {
        if (wantsToPrint) {
            console.log("Print mode activated")
        }
    }, [wantsToPrint])

    useEffect(() => {
        if (styles && currentTheme) {
            setIsReady(true);
        }
    }, [styles, currentTheme]);

    if (!startEditingDocument) return null;
    if (!isReady) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p>Loading resume editor...</p>
            </div>
        );
    }

    if (wantsToPrint) {
        return (
           <PrintDocumentComponent currentTheme={userFieldData} styles={styles} data={userFieldData}/>
        );
    }



    return (
        <div
            style={{ backgroundColor: styles.background }}
            className="w-full h-full absolute z-10"
        >
            <div
                style={{ color: styles.text.primary }}
                className="w-full h-full relative p-4 no-scrollbar overflow-x-hidden"
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <span className="mx-8">
                        <ConsoleHeader
                            showLogo
                            headingText="Resume Editor"
                            subTitleText="Design the best resume for your next job. Try out our AI insights to speed up the process even more!"
                        />
                    </span>

                    <button style={{color: styles.text.primary}} onClick={handleCloseEditor} className="p-2 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Editor & Preview Sections */}
                <div className="flex flex-wrap md:flex-nowrap no-scrollbar justify-between gap-4 h-[calc(100vh-120px)] w-full">
                    <div className="w-full
                    lg:w-[60%]
                    md:w-[60%]
                        no-scrollbar
                        h-full
                       ">
                        <EditFields 
                            user={user} 
                            resumeData={userFieldData} 
                            handleUpdateResumeData={handleUpdateResumeData as (field: string, value: any) => void} 
                            messages={messages}
                            setMessages={setMessages}
                            input={input}
                            setInput={setInput}
                            handleSubmit={handleSubmit}
                            isLoading={isLoading}
                            additionalResumeContext={additionalResumeContext}
                            selectedBio={selectedBio}
                        />
                    </div>
                    <div className="w-full h-full z-[100] overflow-x-hidden no-scrollbar overflow-y-scroll">
                        <ResumeChat
                          messages={messages}
                          setMessages={setMessages}
                          input={input}
                          setInput={setInput}
                          handleSubmit={handleSubmit}
                          isLoading={isLoading}
                          additionalResumeContext={additionalResumeContext}
                          setAdditionalResumeContext={setAdditionalResumeContext}
                          selectedBio={selectedBio}
                          setSelectedBio={setSelectedBio}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}




