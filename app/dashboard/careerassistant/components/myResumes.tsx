'use client'

import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider"
import { useJobKompassToast } from "@/app/helpers/providers/toastProvider"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors"
import { ThemeKeys } from "@/app/types"
import { FileText, FileUser, Pencil, Trash, Upload } from "lucide-react"
 
export default function MyResumes () {

    const {user} = useJobKompassUser()
    const { startEditingDocument, setStartEditingDocument, myResumeSelection, myCoverLetterSelection, myResumeTemplateSelection, myCoverLetterTemplateSelection, myResumeSelectionIndex, myCoverLetterSelectionIndex, myResumeTemplateSelectionIndex, myCoverLetterTemplateSelectionIndex, setMyResumeSelection, setMyResumeSelectionIndex, setMyCoverLetterSelection, setMyCoverLetterSelectionIndex, setMyResumeTemplateSelection, setMyResumeTemplateSelectionIndex, setMyCoverLetterTemplateSelection, setMyCoverLetterTemplateSelectionIndex } = useJobKompassCareerAssistant()
    const {setToastHeader, setToastMessage, setToastIsVisible, setToastType} = useJobKompassToast()
    const resumeNames = user?.[0]?.resumes

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

        setToastIsVisible(false)
        setMyResumeSelection(resumeNames?.[index] as string)
        setMyResumeSelectionIndex(index)
        setTimeout(() => {
            setToastIsVisible(true)
            setToastHeader('Resume selected!')
            setToastMessage('Edit now " ✎ " or choose a template! ⤵')
            setToastType("info")
        }, 361)
    }

    return (
        <>
        <div className="w-full h-max">
            <div>
                <p>View and even update your saved resumes!</p>
            </div>
            <div className="flex flex-col w-full gap-2 my-5 h-[200px]">
               
                {resumeNames?.map((resume, index) => {
                    return (
                        <div key={index}
                        style={{
                            backgroundColor: `${JK_Colors.indigo_accent}`,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        className={`w-full max-w-[300px]  p-2 rounded-lg
                            ${myResumeSelectionIndex === index ? 'border-[3.618px] border-[#635AD9] rounded-lg' : 'border-[3.618px] border-transparent rounded-lg '}`}>
                            <div className="flex gap-2 items-center justify-between">
                                <div className="flex  gap-2 items-center justify-between w-full">
                                   
                                   <div
                                   onClick={() => handleSelectResume(index)} 
                                   className="w-max h-max flex cursor-pointer  gap-2 items-center">

                                    <div style={{backgroundColor: `${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.bg}10`}} className="p-2 rounded-sm">
                                        <FileText style={{color: JK_Colors.indigo}} className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p style={{color:JK_Colors.black}} className="text-sm font-bold lins-clamp-2">{resume}</p>
                                    </div>

                                   </div>

                                    <div className="flex  place-items-center place-content-center gap-2">
                                        
                                        <span className="p-1">
                                            <Pencil size={15}/>
                                        </span>
                                        <span className="p-1">
                                            <Trash size={15}/>
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