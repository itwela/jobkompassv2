import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider"
import { useJobKompassToast } from "@/app/helpers/providers/toastProvider"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors"
import JkGap from "@/app/jkUtilities_and_Tokens/components/jkGap"
import { ThemeKeys } from "@/app/types"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { title } from "process"
import { useSidebar } from '@/components/ui/sidebar'
import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider"
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"

export default function ResumeChoices() {
    const { user, userDataIsLoading } = useJobKompassUser()
    const { open } = useSidebar()
    const { startEditingDocument, setStartEditingDocument, myResumeSelection, myCoverLetterSelection, myResumeTemplateSelection, myCoverLetterTemplateSelection, myResumeSelectionIndex, myCoverLetterSelectionIndex, myResumeTemplateSelectionIndex, myCoverLetterTemplateSelectionIndex, setMyResumeSelection, setMyResumeSelectionIndex, setMyCoverLetterSelection, setMyCoverLetterSelectionIndex, setMyResumeTemplateSelection, setMyResumeTemplateSelectionIndex, setMyCoverLetterTemplateSelection, setMyCoverLetterTemplateSelectionIndex } = useJobKompassCareerAssistant()
    const {setToastHeader, setToastMessage, setToastIsVisible, setToastType} = useJobKompassToast()
    const { currentTheme, setCurrentTheme, currentThemeName, setCurrentThemeName } = useJobKompassResume()
    const { styles, theme } = useJobKompassTheme()
    
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
            setMyResumeTemplateSelectionIndex(-1)
            setMyResumeTemplateSelection("")
            setCurrentTheme(null)
            setToastIsVisible(false)
            setToastMessage('')
            setToastType("none")
            return
        }

        const selectedTemplate = resumeTemplate?.[index]?.title
        setMyResumeTemplateSelectionIndex(index)
        setMyResumeTemplateSelection(selectedTemplate)
        setCurrentThemeName(selectedTemplate)

        setTimeout(() => {
            setToastIsVisible(true)
            setToastHeader(`${selectedTemplate} template selected!`)
            setToastMessage(myResumeSelection
                ? `Apply this template to your resume just by clicking, "Start editing!"`
                : `Want to start a new resume with this template? Click "Start Editing!"`)
            setToastType("info")
        }, 61)
    }



    return (
        <div className="w-full h-max overflow-x-hidden transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6" style={{ color: styles.text.secondary }}>Resumes</h2>
            
            <div className="w-full h-max flex gap-5">
                   
                   {/* NOTE ------ START BLANK CARD COMPONENT */}
            <div      className={`flex flex-col group`}>

                        <div className="flex flex-col  h-[300px] group">
                            <Card 
                                className={`w-[200px] h-[300px] rounded-xl flex place-items-center place-content-center transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg backdrop-blur-sm`}
                                style={{
                                    backgroundColor: styles.card.background,
                                    border: styles.card.border,
                                    boxShadow: styles.card.boxShadow
                                }}
                            >
                                <Plus 
                                    size={48} 
                                    className="transition-all duration-300 group-hover:scale-110"
                                    style={{ color: styles.nav.colors.careerAssistant }} 
                                />
                            </Card>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-center font-medium" style={{ color: styles.text.primary }}>Blank</h2>
                        </div>

                   </div>
                    {/* NOTE ------ BLANK CARD COMPONENT END */}

                {resumeTemplate.map((item, index) => (
                    <div key={index} 
                        onClick={() => {handleSelectResumeTemplate(index)}}
                        className={`flex flex-col group`}
                    >
                        <Card 
                            className={`cursor-pointer w-[200px] h-[300px] rounded-xl flex place-items-center place-content-center transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg backdrop-blur-sm
                                ${myResumeTemplateSelectionIndex === index ? 'shadow-lg' : ''}`}
                            style={{
                                backgroundColor: styles.card.background,
                                border: myResumeTemplateSelectionIndex === index ? `2px solid ${styles.nav.colors.careerAssistant}` : styles.card.border,
                                boxShadow: styles.card.boxShadow,
                            }}
                        >
                            <div className="text-lg font-medium transition-all duration-300 group-hover:scale-105" style={{ color: styles.text.primary }}>
                                {item.title}
                            </div>
                        </Card>
                        <div className="mt-4">
                            <h2 className="text-center font-medium" style={{ color: styles.text.primary }}>{item.title}</h2>
                        </div>
                    </div>
                ))}

            </div>

            <div className='w-[6.18px] h-full' />
        </div>
    )
}

interface ResumeChoicesLayoutProps {
    children: React.ReactNode;
}

