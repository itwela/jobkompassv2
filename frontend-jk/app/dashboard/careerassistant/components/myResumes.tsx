'use client'

import { deleteResumeFromDb, getUsersResume } from "@/app/actions/databaseActions"
import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider"
import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider"
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { useJobKompassToast } from "@/app/helpers/providers/toastProvider"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { JkPopUp } from "@/app/jkComponents/jkPopUp"
import { useSidebar } from "@/components/ui/sidebar"
import { jsPDF } from "jspdf"
import { Eye, FileText, Trash } from "lucide-react"
import { useRef } from "react"

export default function MyResumes ({parentRef}: {parentRef: React.RefObject<HTMLDivElement>}) {

    const {user, refetchUserData} = useJobKompassUser()
    const { styles } = useJobKompassTheme()
    const { toggleSidebar, setOpen } = useSidebar()
    const {wantsToPreviewResume, setWantsToPreviewResume, startEditingDocument, setStartEditingDocument, myResumeSelection, myCoverLetterSelection, myResumeTemplateSelection, myCoverLetterTemplateSelection, myResumeSelectionIndex, myCoverLetterSelectionIndex, myResumeTemplateSelectionIndex, myCoverLetterTemplateSelectionIndex, setMyResumeSelection, setMyResumeSelectionIndex, setMyCoverLetterSelection, setMyCoverLetterSelectionIndex, setMyResumeTemplateSelection, setMyResumeTemplateSelectionIndex, setMyCoverLetterTemplateSelection, setMyCoverLetterTemplateSelectionIndex } = useJobKompassCareerAssistant()
    const {setToastHeader, setToastMessage, setToastIsVisible, setToastType} = useJobKompassToast()
    const resumeNames = user?.[0]?.resumes
    const pdfIframeRef = useRef<HTMLIFrameElement>(null);
    const { setWantsToPrint } = useJobKompassResume()

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
        setOpen(false)
        // setWantsToPrint(true)
        setMyResumeSelection(resumeName)
        resumePreview(resumeName)
    }

    const handleWantsToDeleteResume = async (resumeName: string) => {

        setToastIsVisible(true)
        setToastMessage(`deleting ${resumeName}..`)

        const delResume = await deleteResumeFromDb(resumeName, user)

        if (delResume.status === 'success') {
            setToastIsVisible(true)
            setToastHeader('Resume deleted!')
            setToastMessage('You can upload a new resume in the Career Assistant!')
            setToastType("success")
            await refetchUserData();
            setTimeout(() => {
                setToastIsVisible(false)
                setToastMessage('')
                setToastType("none")
            }, 6180)
            return
        }

    }

    const handleCloseResumePreview = () => {
        setWantsToPreviewResume(false)
        setWantsToPrint(false)
        setWantsToPrint(false)
        setOpen(true)
        setOpen(true)
        console.log('close')
        setMyResumeSelection('')
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

            <p>View your uploaded resumes!</p>
                
            <div className="flex place-items-center gap-1">
                <span>
                    How? Just click the  
                </span> 

                <Eye size={10}/>

                <span>
                    <p> icon on the end of your resume!</p>
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
                        className="w-full max-w-[350px]  p-2 rounded-lg">
                            <div className="flex gap-2 items-center w-full justify-between">
                                <div className="flex gap-2 items-center justify-between w-full">
                                   
                                   <div
                                   onClick={() => handleSelectResume(index)} 
                                   className="w-max h-max flex cursor-pointer gap-2 items-center hover:opacity-90 transition-all duration-300">

                                    <div style={{backgroundColor: styles.card.accent}} className="p-2 rounded-sm transition-colors duration-300">
                                        <FileText style={{color: styles.nav.colors.careerAssistant}} className="w-4 h-4" />
                                    </div>
                                    <div className="max-w-[200px]">
                                        <p style={{color: styles.text.primary}} className="text-sm font-bold line-clamp-1">{resume}</p>
                                    </div>

                                   </div>

                                    <span className="flex gap-3 place-items-center place-content-center">
                                        <span className="h-[20px] w-[2px]" style={{backgroundColor: styles.text.tertiary}}></span>
                                        
                                        <div style={{color: styles.text.primary}} className="flex place-items-center place-content-center h-full gap-2">
                                            
                                            <span onClick={() => handleWantsToViewResume(resume)} className="relative outline-none w-[15px] h-[15px] flex place-content-start  cursor-pointer">
                                                <JkPopUp
                                                    user={user}
                                                    refComponent={parentRef}
                                                    trigger={<Eye className="absolute w-full outline-none top-0 z-10"  size={15}/>}
                                                    styledTrigger={false}
                                                    dialogId={`preview-resume-${index}`}
                                                    triggerClassName="cursor-pointer"
                                                    customclosefunction={handleCloseResumePreview}
                                                    BigField={
                                                        <>
                                                        <div className="h-[calc(100vh-50px)] pb-10 mb-10 w-full flex place-items-start place-content-center">
                                                            <iframe
                                                                ref={pdfIframeRef}
                                                                className=" w-[8in] max-w-[61.8%] h-[11in] flex  place-items-center"
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
                                            <span onClick={() => handleWantsToDeleteResume(resume)} className="h-max outline-none cursor-pointer">
                                                <Trash  className="outline-none" size={15}/>
                                            </span>

                                        </div>
                                    </span>

                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
        </>
    )
}
