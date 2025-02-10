'use client'

import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors"
import { ThemeKeys } from "@/app/types"
import { Check, Copy } from "lucide-react"
import { useState } from "react"


export default function ApplicationBuddy() {
    
    const [fI, setFI] = useState<any>()
    const [copied, setCopied] = useState(false)
    const {user} = useJobKompassUser()
    
    const CopyComponent = ({ text, fieldIndex, mappedQuestionIndex }: { text: string, fieldIndex: number, mappedQuestionIndex: number }) => {
        
        const copyToClipboard = async () => {
            await navigator.clipboard.writeText(text)
        }
        
        const handleCopy = () => {
            setCopied(true)
            setFI(fieldIndex)
            copyToClipboard()
            console.log('fieldIndex:', fieldIndex, 'type:', typeof fieldIndex)
            console.log('fI:', fI, 'type:', typeof fI)
            setTimeout(() => {
                setCopied(false)
            }, 60000)
            // }, 1000)
        }
        
        return (
            <>
            <div onClick={() => handleCopy()} 
            style={{
                backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.boxShadow,
            }}
            className="flex cursor-pointer p-1 px-2 place-items-center w-full justify-between">
                <p 
                style={{
                    color: 
                        copied && fI === mappedQuestionIndex && user?.[0]?.color_theme === 'dark' ? JK_Colors.lightBlue :  
                        copied && fI === mappedQuestionIndex && user?.[0]?.color_theme === 'light' ? JK_Colors.blue : 
                        JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                }}
                className="w-[75%] truncate">{text}</p>
                {copied === true && fI === mappedQuestionIndex && (
                    <>
                     <button onClick={() => handleCopy()} className="p-2">
                      <Check color={user?.[0]?.color_theme === "dark" ? JK_Colors.lightBlue : JK_Colors.blue} size={15}/>
                    </button>
                    </>
                )}

                {copied === true && fI != mappedQuestionIndex && (
                    <>
                    <button onClick={() => handleCopy()} className="p-2 outline-none">
                    <Copy size={15}/>
                    </button>
                    </>
                )}

                {copied === false && (
                    <>
                    <button onClick={() => handleCopy()} className="p-2 outline-none">
                      <Copy size={15}/>
                    </button>
                    </>
                )}
    
            </div>
            </>
        )
    }

    const normalRepeatedQuestions = [
        {
            id: 0,
            question: "First Name",
            answer: `${user?.[0].firstName}`,
            type: "normal",
        },
        {
            id: 1,
            question: "Last Name",
            answer: `${user?.[0].lastName}`,
            type: "normal",
        },
        {
            id: 2,
            question: "Email",
            answer: `${user?.[0].email}`,
            type: "normal",
        },
    ]

    return (
        <>
        <div className="sm:max-w-[425px] pt-3 md:max-w-[625px] h-max gap-2 grid grid-cols-2 ">

            {
                normalRepeatedQuestions.map((question, index) => {
                    return (
                        <div key={index} className="w-full h-max flex flex-col gap-2">
                            <div className="w-full h-max flex flex-col gap-2">
                                <div className="w-full h-max flex flex-col gap-2">
                                    {question.question}
                                </div>
                                <CopyComponent text={question.answer} fieldIndex={question.id} mappedQuestionIndex={index}/>
                                </div>
                            </div>
                        )
                })
            }

        </div>
        </>
    )
}