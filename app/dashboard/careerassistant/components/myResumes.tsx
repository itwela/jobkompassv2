'use client'

import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider"
import { useJobKompassToast } from "@/app/helpers/providers/toastProvider"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { Eye, FileText, Trash } from "lucide-react"
import { jsPDF } from "jspdf";
import { useRef, useState, useEffect } from "react"
import { getUsersResume } from "@/app/actions/databaseActions"
import { JkPopUp } from "@/app/jkComponents/jkPopUp"

export default function MyResumes ({parentRef}: {parentRef: React.RefObject<HTMLDivElement>}) {

    const {user} = useJobKompassUser()
    const { styles } = useJobKompassTheme()
    const {wantsToPreviewResume, setWantsToPreviewResume, startEditingDocument, setStartEditingDocument, myResumeSelection, myCoverLetterSelection, myResumeTemplateSelection, myCoverLetterTemplateSelection, myResumeSelectionIndex, myCoverLetterSelectionIndex, myResumeTemplateSelectionIndex, myCoverLetterTemplateSelectionIndex, setMyResumeSelection, setMyResumeSelectionIndex, setMyCoverLetterSelection, setMyCoverLetterSelectionIndex, setMyResumeTemplateSelection, setMyResumeTemplateSelectionIndex, setMyCoverLetterTemplateSelection, setMyCoverLetterTemplateSelectionIndex } = useJobKompassCareerAssistant()
    const {setToastHeader, setToastMessage, setToastIsVisible, setToastType} = useJobKompassToast()
    const resumeNames = user?.[0]?.resumes
    const pdfIframeRef = useRef<HTMLIFrameElement>(null);

    const handleSelectResume = (index: number) => {

        if (
            index === myResumeSelectionIndex &&
            startEditingDocument === false
        ) {
            setMyResumeSelectionIndex(-1)
            setMyResumeSelection('')
            setToastIsVisible(false)
            setToastMessage('')
            setToastType("none")
            return
        }

        // setToastIsVisible(false)
        setMyResumeSelection(resumeNames?.[index] as string)
        setMyResumeSelectionIndex(index)
        setTimeout(() => {
            setToastIsVisible(true)
            setToastHeader('Resume selected!')
            setToastMessage('Choose a template below to continue! ⤵')
            setToastType("info")
        }, 61)
    }

    const handleEditNowPress = () => {

        if (myResumeSelectionIndex < 0) {
            setToastHeader('Woah there!')
            setToastMessage('Please select a resume first before editing!')
            setToastIsVisible(true)
            setToastType("error")

            setTimeout(() => {
                setToastIsVisible(false)
                setToastMessage('')
                setToastType("none")
            }, 6180)
            return
        }

        setStartEditingDocument(true)
        setToastIsVisible(false)
        setToastMessage('')
        setToastType("none")
    }

    const handleWantsToViewResume = (resumeName: string) => {
        setWantsToPreviewResume(true)
        setMyResumeSelection(resumeName)
        resumePreview(resumeName)
    }

    const resumePreview = (resumeName : string) => {
        const doc = new jsPDF();
            
        const generatePDFPreview = async () => {
            try {
                const getResume = await getUsersResume(resumeName, user?.[0]?.firstName, user?.[0]?.user_id);
        
                console.log("data", getResume?.data)
                console.log("type", getResume?.type)

                if (!getResume?.data) {
                    console.error("No resume data received.");
                    return;
                }
        
                try {
                    // Convert ArrayBuffer to Blob
                    const blob = new Blob([getResume.data], { type: "application/pdf" });
            
                    // Create an Object URL
                    const pdfDataUrl = URL.createObjectURL(blob);
            
                    // Update iframe src
                    if (pdfIframeRef.current) {
                        pdfIframeRef.current.src = pdfDataUrl;
                    }

                } catch (error) {
                    console.error("Error creating PDF preview:", error);
                }
        
            } catch (error) {
                console.error("PDF generation error:", error);
            }
        };

        generatePDFPreview();
    }

    // useEffect(() => {
    //     if (myResumeTemplateSelection) {
    //         window.scrollTo({
    //             top: document.documentElement.scrollHeight,
    //             behavior: 'smooth'
    //         });
    //     }
    // }, [myResumeTemplateSelection]);


    return (
        <>
        
        <div style={{color: styles.text.primary}} className="w-full h-max">

            <p>View and even update your saved resumes!</p>
                
            <div className="flex place-items-center gap-1">
                <span>
                    How? Just click the  
                </span> 

                <FileText size={10}/>

                <span>
                    <p> icon next to the name of your resume to get started!</p>
                </span> 
            </div>

            <div className="flex flex-col w-full gap-2 my-5 h-max">
               
                {resumeNames?.map((resume, index) => {
                    return (
                        <div key={index}
                        style={{
                            backgroundColor: styles.card.background,
                            position: 'relative',
                            overflow: 'hidden',
                            border: styles.card.border,
                            boxShadow: `0 4px 6px -1px ${styles.card.boxShadow}`,
                            transition: 'all 0.3s ease'
                        }}
                        className={`w-full max-w-[300px]  p-2 rounded-lg
                            ${myResumeSelectionIndex === index ? 'border-[3.618px] border-[#635AD9] rounded-lg' : 'border-[3.618px] border-transparent rounded-lg '}`}>
                            <div className="flex gap-2 items-center justify-between">
                                <div className="flex  gap-2 items-center justify-evenly w-full">
                                   
                                   <div
                                   onClick={() => handleSelectResume(index)} 
                                   className="w-max h-max flex cursor-pointer gap-2 items-center hover:opacity-90 transition-all duration-300">

                                    <div style={{backgroundColor: styles.card.accent}} className="p-2 rounded-sm transition-colors duration-300">
                                        <FileText style={{color: styles.nav.colors.careerAssistant}} className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p style={{color: styles.text.primary}} className="text-sm font-bold line-clamp-2">{resume}</p>
                                    </div>

                                   </div>

                                    <span className="h-[20px] w-[2px]" style={{backgroundColor: styles.text.tertiary}}></span>
                                    
                                    <div style={{color: styles.text.primary}} className="flex place-items-center place-content-center h-full gap-2">
                                        
                                        <span onClick={() => handleWantsToViewResume(resume)} className="relative outline-none w-[15px] h-[15px] flex place-content-start  cursor-pointer">
                                            <JkPopUp
                                                user={user}
                                                refComponent={parentRef}
                                                trigger={<Eye className="absolute outline-none top-0 z-10"  size={15}/>}
                                                styledTrigger={false}
                                                triggerClassName="cursor-pointer"
                                                BigField={
                                                    <>
                                                    <div className="w-full h-[calc(100vh-50px)] flex place-items-center place-content-center">
                                                        <iframe
                                                            ref={pdfIframeRef}
                                                            className="w-[80%] h-[80%] flex place-self-center place-items-center"
                                                            style={{ border: 'none' }}
                                                        />
                                                    </div>
                                                    </>
                                                }
                                                label=""
                                                header={myResumeSelection}
                                                subtitle="Brought to you by JobKompass"
                                            />
                                        </span>
                                        <span className="h-max outline-none cursor-pointer">
                                            <Trash  className="outline-none" size={15}/>
                                        </span>

                                    </div>

                                </div>
                                <button 
                                    onClick={() => {}}
                                    className="text-red-500 opacity-[61.8%] hover:opacity-[100%] hover:text-red-600"
                                >
                                    {/* <p className="">restart</p> */}
                                </button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
        </>
    )
}
