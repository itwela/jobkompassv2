'use client'

import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { FileText } from "lucide-react"

export default function MyCoverLetters() {

    const { user } = useJobKompassUser()
    const { styles } = useJobKompassTheme()
    const {myCoverLetterSelection, myCoverLetterSelectionIndex, setMyCoverLetterSelection, setMyCoverLetterSelectionIndex} = useJobKompassCareerAssistant()
    
    const coverLetterNames = user?.[0]?.cover_letters

    return (
        <>
            <div style={{color: styles.text.primary}} className="w-full h-max">
                <div>
                    <p>View and even update your saved cover letters!</p>
                </div>
                <div className="flex flex-col w-full gap-2 my-5 h-max">

                    {coverLetterNames?.map((coverLetter, index) => {
                        return (
                            <div key={index}
                                style={{
                                    backgroundColor: styles.card.background,
                                    border: styles.card.border,
                                    boxShadow: `0 4px 6px -1px ${styles.card.boxShadow}`,
                                    transition: 'all 0.3s ease'
                                }}
                                className="max-w-[261.8px] cursor-pointer p-2 rounded-lg hover:translate-y-[-2px]">
                                <div className="flex gap-2  items-center justify-between">
                                    <div className="flex  gap-2 items-center ">
                                        <div style={{backgroundColor: styles.card.accent}} className="p-2 rounded-sm transition-colors duration-300">
                                            <FileText style={{color: styles.nav.colors.careerAssistant}} className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p style={{color: styles.text.primary}} className="text-sm font-bold">{coverLetter}</p>
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