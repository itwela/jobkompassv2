import { useJobKompassCareerAssistant } from "@/app/helpers/providers/careerAssistantProvider";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { useJobKompassToast } from "@/app/helpers/providers/toastProvider";
import { Card } from "@/components/ui/card"

export default function StartCareerChat() {
    const { styles } = useJobKompassTheme()
    const {
        wantsToPreviewResume,
        setWantsToPreviewResume,
        startEditingDocument,
        setStartEditingDocument,
        myResumeSelection,
        myCoverLetterSelection,
        myResumeTemplateSelection,
        myCoverLetterTemplateSelection,
        myResumeSelectionIndex,
        myCoverLetterSelectionIndex,
        myResumeTemplateSelectionIndex,
        myCoverLetterTemplateSelectionIndex,
        setMyResumeSelection,
        setMyResumeSelectionIndex,
        setMyCoverLetterSelection,
        setMyCoverLetterSelectionIndex,
        setMyResumeTemplateSelection,
        setMyResumeTemplateSelectionIndex,
        setMyCoverLetterTemplateSelection,
        setMyCoverLetterTemplateSelectionIndex
    } = useJobKompassCareerAssistant();
    const { setToastIsVisible, setToastMessage, setToastHeader } = useJobKompassToast();

    const handleStartEditing = () => {
        setStartEditingDocument(true);
        setWantsToPreviewResume(false);
        setToastIsVisible(false);
        setToastHeader('');
        setToastMessage('');
    };

    return (
        <div className="w-full h-max overflow-x-hidden transition-all duration-300">
            <div className="w-full h-max flex justify-center items-center">
                <Card 
                    onClick={handleStartEditing}
                    className="cursor-pointer overflow-hidden w-full h-[300px] rounded-xl flex place-items-center place-content-center transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg backdrop-blur-sm relative"
                    style={{
                        backgroundColor: styles.card.background,
                        border: styles.card.border,
                        boxShadow: styles.card.boxShadow,
                    }}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute w-full h-full object-cover"
                        style={{ filter: 'brightness(0.7) contrast(1.2)' }}
                        onLoadedMetadata={(e) => {
                            const video = e.target as HTMLVideoElement;
                            video.playbackRate = 1.5;
                        }}
                    >
                        <source src="/assets/vids/gradientOneCompressed.mp4" type="video/mp4" />
                    </video>

                    <div 
                        className="text-xl font-medium z-10 transition-all duration-300 hover:scale-105"
                        style={{ color: styles.white }}
                    >
                        Start Resume Chat
                    </div>
                </Card>
            </div>
        </div>
    )
}

interface ResumeChoicesLayoutProps {
    children: React.ReactNode;
}
