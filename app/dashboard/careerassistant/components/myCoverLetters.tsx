'use client'

import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors"
import { ThemeKeys } from "@/app/types"
import { FileText, FileUser, Upload } from "lucide-react"

export default function MyCoverLetters() {

    const { user } = useJobKompassUser()
    const {myCoverLetterSelection, myCoverLetterSelectionIndex, setMyCoverLetterSelection, setMyCoverLetterSelectionIndex} = useJobKompassCareerAssistant()
    
    const coverLetterNames = user?.[0]?.cover_letters

    return (
        <>
            <div className="w-full h-max">
                <div>
                    <p>View and even update your saved cover letters!</p>
                </div>
                <div className="flex flex-col w-full gap-2 my-5 h-[200px]">

                    {coverLetterNames?.map((coverLetter, index) => {
                        return (
                            <div key={index}
                                style={{ backgroundColor: `${JK_Colors.indigo_accent}` }}
                                // style={{backgroundColor: `${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.boxShadow}61`}}
                                className="max-w-[261.8px] cursor-pointer p-2 rounded-lg">
                                <div className="flex gap-2  items-center justify-between">
                                    <div className="flex  gap-2 items-center ">
                                        <div style={{ backgroundColor: `${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.bg}10` }} className="p-2 rounded-sm">
                                            <FileText style={{ color: JK_Colors.indigo }} className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p style={{ color: JK_Colors.black }} className="text-sm font-bold">{coverLetter}</p>
                                            {/* <p style={{color:JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor}} className="text-sm font-bold">{resume}</p> */}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { }}
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