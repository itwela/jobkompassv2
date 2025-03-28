import { addCoverLetterToDb, addResumeToDb } from "@/app/actions/databaseActions";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { fastComponentDelayTime } from "@/app/jkUtilities_and_Tokens/tokens";
import { ThemeKeys } from "@/app/types";
import { BlurFade } from "@/components/ui/blur-fade";
import { useSidebar } from "@/components/ui/sidebar";
import { ChevronRight, Upload, X } from "lucide-react";
import { useState } from "react";

export default function UploadDocs() {
    const { user, userDataIsLoading } = useJobKompassUser();
    const { open } = useSidebar();
    const { styles } = useJobKompassTheme();
    
    const uploadData = [
        {
            title: 'Resume',
            subTitle: 'Upload your own resume to get started if you already have one!',
            vid: ""
        },
        {
            title: 'Cover Letter',
            subTitle: 'Upload your own cover letter to get started if you already have one!',
            vid: ""
        },
    ]

    const [uploadIndexHovered, setUploadIndexHovered] = useState<number | null>(null);
    const [wantsToUploadResume, setWantsToUploadResume] = useState(false);
    const [userWantsToUploadA, setUserWantsToUploadA] = useState<any>(null);
    const [wantsToUploadCoverLetter, setWantsToUploadCoverLetter] = useState(false);
    const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null);
    const [fileToDbIsLoading, setFileToDbIsLoading] = useState<boolean>(false);
    const [uploadServerStatus, setUploadServerStatus] = useState<any>(null);
    const [uploadToDbTextButton, setUploadToDbTextButton] = useState<string>('Upload As Is');
    const handleUpdateMouseEnter = (index: number) => {
        setUploadIndexHovered(index);
    };

    const handleUpdateMouseLeave = () => {
        setUploadIndexHovered(null);
    };
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const fakeEvent = {
                target: event.dataTransfer.files[0] as unknown as HTMLInputElement
            } as React.ChangeEvent<HTMLInputElement>;
            handleFileUpload(fakeEvent);
            event.dataTransfer.clearData();
        }
    };
    
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    
    const handleShowUploadContainer = (type: 'resume' | 'coverLetter') => {
        if (type === 'resume') {
            setWantsToUploadResume(true);
            setWantsToUploadCoverLetter(false);
            setUserWantsToUploadA('Resume')
        } else {
            setWantsToUploadCoverLetter(true);
            setWantsToUploadResume(false);
            setUserWantsToUploadA('Cover Letter')
        }
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const file = e.target.files?.[0];
        if (file) {
            const size = file.size;
            const sizeDisplay = size > 1024 * 1024 
                ? `${(size / (1024 * 1024)).toFixed(2)} MB`
                : `${(size / 1024).toFixed(2)} KB`;
            
            setFileInfo({
                name: file.name,
                size: sizeDisplay
            });
        }

    };

    const handleFileToDb = async () => {
        
        setFileToDbIsLoading(true)
        setUploadToDbTextButton("Uploading...")

        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        const file = fileInput?.files?.[0];
        
        // if (!file || !fileInfo) return;

        // Prepare file data for upload
        const formData = new FormData();

        if (userWantsToUploadA === 'Resume') {
            formData.append("resume", file as any); // Append actual file
            formData.append("fileInfo", JSON.stringify(fileInfo)); // Append file metadata
            try {
    
    
                const response = await addResumeToDb(formData, user); // Call server action
                
                setUploadServerStatus(response.status);
                
                if (response.message === "Resume already exists") {
                    setUploadServerStatus('success');
                    setUploadToDbTextButton("Resume already exists!")
                    setFileToDbIsLoading(false)
                } else {
                    setUploadServerStatus('success');
                    setUploadToDbTextButton("Upload Success")
                    setFileToDbIsLoading(false)
                }
    
            } catch (error) {
                console.log("Upload failed:", error);
                setUploadServerStatus('error');
                setUploadToDbTextButton("Upload Failure")
                setFileToDbIsLoading(false)
            }
        }

        if (userWantsToUploadA === 'Cover Letter') {
            formData.append("cover", file as any); // Append actual file
            formData.append("fileInfo", JSON.stringify(fileInfo)); // Append file metadata
            try {
                const response = await addCoverLetterToDb(formData, user); // Call server action    
                setUploadServerStatus(response.status);
                
                if (response.message === "Cover Letter already exists") {
                    setUploadServerStatus('success');
                    setUploadToDbTextButton("Cover Letter already exists!")
                    setFileToDbIsLoading(false)
                } else {
                    setUploadServerStatus('success');
                    setUploadToDbTextButton("Upload Success")
                    setFileToDbIsLoading(false)
                }
    
            } catch (error) {
                console.log("Upload failed:", error);
                setUploadServerStatus('error');
                setUploadToDbTextButton("Upload Failure")
                setFileToDbIsLoading(false)
            }
        }

    };

    const handleClearFile = () => {
        // Reset file input value
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
        
        // Reset state
        setFileInfo(null);
        setUploadToDbTextButton("Upload As Is");
    };

    return (
        <div style={{color: styles.text.primary}} className={`w-full h-max transition-all duration-300 ${open ? 'md:ml-0' : ''}`}>
            <div>
                <p>Upload your resumes/cover letters now to get started, or choose from one of our templates!</p>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-5 justify-between my-5">
                <div className={`w-max h-max flex flex-row flex-wrap place-content-center lg:place-content-start lg:flex-col gap-5 ${open ? 'md:ml-0' : ''}`}>
                    {uploadData.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => handleShowUploadContainer(index === 0 ? 'resume' : 'coverLetter')} 
                            className="cursor-pointer w-max md:min-w-[200px] lg:min-w-[250px] h-[40px]"
                        >
                            <BlurFade 
                                onMouseEnter={() => handleUpdateMouseEnter(index)} 
                                onMouseLeave={handleUpdateMouseLeave} 
                                className="h-full flex place-items-center justify-between px-3 w-full rounded-lg" 
                                delay={fastComponentDelayTime} 
                                inView
                                style={{
                                    backgroundColor: uploadIndexHovered === index ? styles.nav.colors.careerAssistant : userWantsToUploadA === item.title ? styles.nav.colors.careerAssistant : styles.card.background,
                                    color: uploadIndexHovered === index ? '#ffffff' : userWantsToUploadA === item.title ? '#ffffff' : styles.text.primary,
                                    border: styles.card.border,
                                    boxShadow: styles.card.boxShadow
                                }}
                            >
                                <span className="flex gap-2 place-items-center">
                                    <Upload size={15}/>
                                    <p className="font-bold">{item.title}</p>
                                </span>
                                <ChevronRight color={uploadIndexHovered === index ? JK_Colors.white : userWantsToUploadA === item.title ? JK_Colors.blue : JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor} size={20}/>
                            </BlurFade>
                        </div>
                    ))}
                </div>

                <div className={`w-full flex place-items-center place-content-center transition-all duration-300 ${open ? 'md:ml-0' : ''}`}>
                    {/* {!wantsToUploadCoverLetter && !wantsToUploadResume && (
                        <div className="w-full h-[200px] p-2 border-2 border-dashed rounded-lg"
                        style={{
                            borderColor: `3.18px 3.18px 0px ${JK_Colors?.[user?.[0].color_theme as ThemeKeys]?.boxShadow}`
                        }}
                        >
                            <div className="flex flex-col h-full py-4 items-center justify-center">
                                <p className="font-bold opacity-[61.8%]">Cool edited video will go here</p>
                            </div>
                        </div>
                    )} */}

                    {(wantsToUploadResume || wantsToUploadCoverLetter) && (
                        <div className="w-full min-h-[200px] h-max p-2 border-2 border-dashed rounded-lg"
                        style={{
                            borderColor: `3.18px 3.18px 0px ${JK_Colors?.[user?.[0].color_theme as ThemeKeys]?.boxShadow}`
                        }}
                        >
                            <div className="flex flex-col py-4 relative items-center justify-center">
                                <button className="p-2" onClick={() => {setWantsToUploadCoverLetter(false); setWantsToUploadResume(false);}}>
                                    <X className="absolute top-0 right-2" />
                                </button>
                                
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    style={{
                                        zIndex: fileInfo ? -10 : 1,
                                    }}
                                    accept=".pdf,.docx"
                                    onChange={handleFileUpload}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="flex flex-col place-items-center cursor-pointer w-[71.8%] place-self-center"
                                >
                                    {!fileInfo && (
                                        <>
                                        <div style={{backgroundColor: `${styles.nav.colors.careerAssistant}20`}} className="p-4 rounded-full">
                                            <Upload style={{color: styles.nav.colors.careerAssistant}} className="w-6 h-6" />
                                        </div>
                                        <p className="mt-2 text-center">Add your <strong>{userWantsToUploadA}</strong> here by clicking the button above!</p>
                                        <p className="text-sm text-gray-500">Supports PDF, DOCX up to 10MB</p>
                                        </>
                                    )}
                                </label>      

                                {fileInfo && (
                                    <>
                                        <div className="w-full px-4 flex flex-col md:flex-row gap-5">
                                            <p className="">Pick one of our amazing templates to improve your <strong>{userWantsToUploadA}</strong> even more, or</p>
                                            <div className="flex flex-col gap-2">
                                                <p style={{color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor }} className="opacity-[61.8%]">Save this <strong>{userWantsToUploadA}</strong> <em>AS IS</em>, allowing you to refer to it later!</p>
                                                <button 
                                                    className="w-full font-bold border p-1 rounded-lg transition-opacity duration-200 opacity-[61.8%] hover:opacity-100"
                                                    onClick={() => {uploadToDbTextButton === 'Upload Failure' ? handleClearFile() : uploadToDbTextButton === "Upload Success" ? handleClearFile() :  uploadToDbTextButton === "Resume already exists!" ? handleClearFile() : handleFileToDb();}}
                                                    style={{
                                                        backgroundColor: styles.nav.colors.careerAssistant,
                                                        color: '#ffffff',
                                                        border: styles.card.border,
                                                        boxShadow: styles.card.boxShadow
                                                    }}
                                                >
                                                    {uploadToDbTextButton}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full max-w-md p-3 mt-4 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div style={{backgroundColor: `${styles.nav.colors.careerAssistant}20`}} className="p-2 rounded-sm">
                                                        <Upload style={{color: styles.nav.colors.careerAssistant}} className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{fileInfo.name}</p>
                                                        <p className="text-xs text-gray-500">{fileInfo.size}</p>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={handleClearFile}
                                                    className="text-red-500 opacity-[61.8%] hover:opacity-[100%] hover:text-red-600"
                                                >
                                                    <p className="">restart</p>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>

                        </div>

                )}
            </div>
        </div>
        </div>
    );
}