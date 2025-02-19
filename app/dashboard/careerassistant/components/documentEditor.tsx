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



    // Sync user data when available
    useEffect(() => {
        if (user?.[0]) {
            setTechBroData((prev: any) => ({
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
        field: keyof TechBroProps["personalInfo"] | "summary" | "skills" | "education" | "experience" | "projects",
        value: any
    ) => {
        setTechBroData((prev: TechBroProps): TechBroProps => {

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
    const { currentTheme, setCurrentTheme, techBroData, setTechBroData, wantsToPrint } = useJobKompassResume()
    const [isReady, setIsReady] = useState(false);
    console.log("DocumentEditor currentTheme:", currentTheme)
    console.log("DocumentEditor wantsToPrint:", wantsToPrint)
    
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
        console.log("not ready")
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p>Loading resume editor...</p>
            </div>
        );
    }

    if (wantsToPrint) {
        console.log("Rendering print view");
        return (
           <PrintDocumentComponent currentTheme={techBroData} styles={styles} data={techBroData}/>
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
                    lg:w-[40%]
                    md:w-[60%]
                        no-scrollbar
                        h-full
                       ">
                        <EditFields 
                            user={user} 
                            resumeData={techBroData} 
                            handleUpdateResumeData={handleUpdateResumeData as (field: string, value: any) => void} 
                        />
                    </div>
                    <div className="w-full h-full  overflow-x-hidden overflow-y-scroll">
                        <ResumeRenderPage 
                            styles={styles} 
                            data={techBroData} 
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

const ResumeChat = ({ user }: { user: any }) => {
    return (
        <>
            <div
                style={{
                    backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_shadow,
                }}
                className="absolute bottom-10 right-10 w-[61.8%] h-[300px] z-100 rounded-lg">

            </div>
        </>
    )
}



