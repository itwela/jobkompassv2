import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider"
import { useJobKompassToast } from "@/app/helpers/providers/toastProvider"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors"
import JkGap from "@/app/jkUtilities_and_Tokens/components/jkGap"
import { ThemeKeys } from "@/app/types"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { title } from "process"

export default function ResumeChoices() {

    const { user, userDataIsLoading } = useJobKompassUser()
    const { startEditingDocument, setStartEditingDocument, myResumeSelection, myCoverLetterSelection, myResumeTemplateSelection, myCoverLetterTemplateSelection, myResumeSelectionIndex, myCoverLetterSelectionIndex, myResumeTemplateSelectionIndex, myCoverLetterTemplateSelectionIndex, setMyResumeSelection, setMyResumeSelectionIndex, setMyCoverLetterSelection, setMyCoverLetterSelectionIndex, setMyResumeTemplateSelection, setMyResumeTemplateSelectionIndex, setMyCoverLetterTemplateSelection, setMyCoverLetterTemplateSelectionIndex } = useJobKompassCareerAssistant()
    const {setToastHeader, setToastMessage, setToastIsVisible, setToastType} = useJobKompassToast()
    const resumeTemplate = [
        {
            title: 'Tech Bro',
            img: '',
        },
        {
            title: 'Manager',
            img: '',
        },
        {
            title: 'Creative',
            img: '',
        },
    ]

    const handleSelectResumeTemplate = (index: number) => {

        if (
            index === myResumeTemplateSelectionIndex &&
            startEditingDocument === false
        ) {
            // setMyResumeSelectionIndex(-1)
            // setMyResumeSelection('')
            setMyResumeTemplateSelectionIndex(-1)
            setMyResumeTemplateSelection("")
            setToastIsVisible(false)
            setToastMessage('')
            setToastType("none")
            return
        }

        setToastIsVisible(false)
        setMyResumeTemplateSelectionIndex(index)
        setMyResumeTemplateSelection(resumeTemplate?.[index]?.title)
        setTimeout(() => {
            setToastIsVisible(true)
            setToastHeader(`${resumeTemplate?.[index]?.title} template selected!`)
            setToastMessage(`Start a fresh resume with this template, or apply it to an existing resume by selecting one of your resumes in "My Docs"` )
            setToastType("info")
        }, 361)
    }

    return (
        <>
            <h2 className="font-bold opacity-[61.8%]">Resumes</h2>
            <div className="w-full h-max overflow-x-scroll no-scrollbar">

                <div className="flex gap-5 w-max">


                    <div className="flex flex-col w-max">
                        
                        <JkGap />
                        
                        <div className="flex gap-5 w-max">

                            <div className="flex flex-col">
                                <Card 
                                className={`w-[200px] h-[300px] rounded-lg flex place-items-center place-content-center`}
                                    style={{
                                        backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
                                        boxShadow: `3.18px 3.18px 0px ${JK_Colors?.[user?.[0].color_theme as ThemeKeys]?.boxShadow}`
                                    }}
                                >
                                    <Plus size={60} color={JK_Colors.lightBlueAccent} />
                                </Card>
                                <JkGap />
                                <h2 className="text-center font-bold">Blank</h2>
                            </div>

                            <div className="h-[300px] place-self-center flex place-items-center place-content-center"> <span style={{ backgroundColor: JK_Colors?.darkGrey }} className="w-[1px] opacity-[61.8%] h-[50%]"></span> </div>

                            {resumeTemplate.map((item, index) => (
                                <div key={index}          onClick={() => {handleSelectResumeTemplate(index)}}
                                className={`flex flex-col`}
                                    >
                                    <Card 
                                    className={`cursor-pointer w-[200px] h-[300px] rounded-lg flex place-items-center place-content-center
                                        ${myResumeTemplateSelectionIndex === index ? 'border !border-[3.618px] !border-[#635AD9] rounded-lg' : ''}`}
                                        style={{
                                            backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
                                            boxShadow: `3.18px 3.18px 0px ${JK_Colors?.[user?.[0].color_theme as ThemeKeys]?.boxShadow}`
                                        }}
                                    >
                                    </Card>
                                    <JkGap />
                                    <h2 className="text-center font-bold">{item.title}</h2>
                                </div>
                            ))}

                            <div className='w-[6.18px] h-full' />
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}