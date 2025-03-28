'use client';

import { GenFullResume_DeepSeekJk } from "@/app/actions/deepseekActions";
import { useJkAiChatHook } from "@/app/helpers/providers/aiResumeProvider";
import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider";
import { useJobKompassJobs } from "@/app/helpers/providers/jobsProvider";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { useJobKompassToast } from "@/app/helpers/providers/toastProvider";
import { JkCombobox } from "@/app/jkComponents/jkCombobox";
import { JkEducationFields } from "@/app/jkComponents/jkEducationFields";
import { JkExperienceFields } from "@/app/jkComponents/jkExperienceFields";
import { JkInput } from "@/app/jkComponents/jkInput";
import { JkPopUp } from "@/app/jkComponents/jkPopUp";
import { JkProjectFields } from "@/app/jkComponents/jkProjectFields";
import { JkSelect } from "@/app/jkComponents/jkSelect";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger
} from "@/components/ui/menubar";
import { Message } from "ai";
import { Bot, Briefcase, CopyIcon, Download, LucideGraduationCap, LucidePlus, Plus, Save, Sparkles, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TechBroProps } from "./resume/resumeTemplates";

export default function EditFields({
    user,
    resumeData,
    handleUpdateResumeData,
    messages, 
    setMessages, 
    input, 
    setInput, 
    handleSubmit, 
    isLoading,
    additionalResumeContext,
    selectedBio,
}: {
    user: any,
    resumeData: TechBroProps;
    handleUpdateResumeData: (field: keyof TechBroProps["personalInfo"] | "summary" | "skills" | "education" | "experience" | "projects" | "additionalInfo", value: any) => void;
    messages: any;
    setMessages: (messages: any) => void;
    input: string;
    setInput: (input: string) => void;
    handleSubmit: (e: any) => void;
    isLoading: boolean;
    additionalResumeContext: string;
    selectedBio: string;
}) {
    const { styles } = useJobKompassTheme();
    const refOfThisComponent = useRef<HTMLDivElement>(null);

    const [currentTechnicalSkill, setCurrentTechnicalSkill] = useState<string>('');
    const [currentAdditionalSkill, setCurrentAdditionalSkill] = useState<string>('');
    const { registerContentRef, wantsToPrint, setWantsToPrint, currentTheme, currentJobForResumeCreation, setCurrentJobForResumeCreation } = useJobKompassResume();
    const { sectionImCurrentlyEditingRef, setSectionImCurrentlyEditingRef, userFieldData, clearResumeDataDeepseek, updateResumeWithAIDataDeepseek } = useJobKompassResume();
    const { userJobs } = useJobKompassJobs()
    const { isOpen, setIsOpen } = useJkAiChatHook();

    const [openFieldPopup, setOpenFieldPopup] = useState<boolean>(false);
    const [currentInterest, setCurrentInterest] = useState<string>('');
    const [currentHobby, setCurrentHobby] = useState<string>('');
    const [currentLanguage, setCurrentLanguage] = useState<string>('');
    const [currentReference, setCurrentReference] = useState<string>('');
    const { setToastIsVisible, setToastMessage, setToastHeader } = useJobKompassToast();

    useEffect(() => {
        console.log(userJobs)
    }, [userJobs])


    const generateLatexPDF = async () => {
        try {
            // Show loading state or feedback to user
            console.log('Generating PDF...');

            const response = await fetch('/api/resume/jakeFull', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                },
                body: JSON.stringify({
                    data: resumeData,
                    user: user
                })
            });

            if (!response.ok) {
                throw new Error(`PDF generation failed: ${response.statusText}`);
            }

            // Verify content type
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/pdf')) {
                throw new Error('Received invalid content type from server');
            }

            // Get the PDF blob
            const pdfBlob = await response.blob();
            if (!pdfBlob || pdfBlob.size === 0) {
                throw new Error('Received empty PDF from server');
            }

            // Create download link
            const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.download = `resume_${Date.now()}.pdf`;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);

            console.log('PDF generated and download initiated');

        } catch (error) {
            console.error('Error generating PDF:', error);
            // You might want to show this error to the user
            alert('Failed to generate PDF. Please try again.');
        }
    };

    const handleFocus = (e: any, fieldName?: string,) => {
        console.log("Focus event triggered for project:", fieldName, e);
        setSectionImCurrentlyEditingRef(`${fieldName}`);
    };

    const genFullResume = async () => {

        if (currentJobForResumeCreation) {

            const startingToGenMessege: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: "I'm generating your new résumé...",
                parts: [{
                    type: 'text',
                    text: "I'm generating your new résumé..."
                }]
            };
            // Use callback form of setMessages to ensure we're working with the latest state
            setMessages((prevMessages: any) => [...prevMessages, startingToGenMessege]);

            const deepseekResume = await GenFullResume_DeepSeekJk(
                JSON.stringify(userFieldData, null, 2),
                JSON.stringify(currentJobForResumeCreation, null, 2),
                additionalResumeContext,
                selectedBio
            );

            clearResumeDataDeepseek()
            updateResumeWithAIDataDeepseek(deepseekResume as any)

            // need to update techbro data after this based on the response :D

            const completionMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I've generated your résumé",
                parts: [{
                    type: 'text',
                    text: "I've generated your résumé"
                }]
            };
            // Use callback form here too to ensure we're adding to the updated array
            setMessages((prevMessages: any) => [...prevMessages, completionMessage]);

        } else {

            const uhohNeedJob: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: "Uh oh...I need you to choose a job first before I can make your resume 😐",
            };
            // Use callback form of setMessages to ensure we're working with the latest state
            setMessages((prevMessages: any) => [...prevMessages, uhohNeedJob]);
        }

    }

    const copyResumeData = () => {
        const formattedData = `
Personal Information:
${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}
${resumeData.personalInfo.email}
${resumeData.personalInfo.phone}
${resumeData.personalInfo.citizenship}

Education:
${resumeData.education.map(edu => `
- ${edu.school}
  ${edu.degree} in ${edu.field}
  ${edu.startDate} - ${edu.endDate}
  ${edu.details?.join('\n  ')}
`).join('\n')}

Experience:
${resumeData.experience.map(exp => `
- ${exp.title} at ${exp.company}
  ${exp.location}
  ${exp.date}
  ${exp.details?.join('\n  ')}
`).join('\n')}

Projects:
${resumeData.projects.map(proj => `
- ${proj.name}
  ${proj.description}
  Technologies: ${proj.technologies?.join(', ')}
  ${proj.details?.join('\n  ')}
`).join('\n')}

Skills:
Technical: ${resumeData.skills.technical.join(', ')}
Additional: ${resumeData.skills.additional.join(', ')}

Additional Information:
Interests: ${resumeData.additionalInfo.interests.join(', ')}
Hobbies: ${resumeData.additionalInfo.hobbies.join(', ')}
Languages: ${resumeData.additionalInfo.languages.join(', ')}
References: ${resumeData.additionalInfo.references.join(', ')}
`;

        navigator.clipboard.writeText(formattedData)
            .then(() => {
                console.log('✅✅✅✅ Resume data copied to clipboard ✅✅✅✅');
                setToastIsVisible(true)
                setToastMessage('Resume data copied to clipboard')
                setToastHeader('Success')
            }).catch((err) => {
                console.error('❌❌❌❌ Failed to copy resume data to clipboard ❌❌❌❌', err);
                setToastIsVisible(true)
                setToastMessage('Failed to copy resume data to clipboard')
                setToastHeader('Error')
            });
    };

    const saveFieldsPopup = () => {
        setOpenFieldPopup(!openFieldPopup)
    }

    const saveFieldsToDb = () => {
        // TODO
    }

    // TODO
    // const formatFieldsForSelect = () => {
    //     console.log("user fields:", user?.[0]?.fields); // Debug log
    //     if (!user?.[0]?.bios) return [];
    //     const formattedBios = user[0].bios.map(bio => ({
    //         label: bio.title,
    //         value: bio.text
    //     }));
    //     console.log("formatted bios:", formattedBios); // Debug log
    //     return formattedBios;
    // };

    return (
        <div 
            ref={refOfThisComponent}
            className="w-full max-w-[800px] h-full rounded-xl mx-auto overflow-y-auto no-scrollbar relative space-y-30 p-8"
            style={{
                backgroundColor: styles.background,
                backdropFilter: 'blur(16px)',
                border: styles.card.border,
                boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s ease-in-out'
            }}
        >

            {/* TOOLS */}
            <section className="flex flex-col gap-5 place-items-center justify-content-center">

                <div className="flex gap-3  flex-col place-content-center w-max">
                    
                    {/* <label style={{color: styles.text.primary}}  className={`${JK_Styles().subTitleSize} text-sm font-medium tracking-wide opacity-[61.8%] transition-opacity duration-200 group-hover:opacity-100`}>
                        Tools
                    </label> */}

                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger>Actions</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem className="hover:!bg-black/10 transition-colors" onClick={genFullResume}>
                                    Generate with AI <MenubarShortcut><Bot className="h-[14px] w-[14px]" /></MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem className="hover:!bg-black/10 transition-colors" onClick={copyResumeData}>
                                    Copy Resume <MenubarShortcut><CopyIcon className="h-[14px] w-[14px]" /></MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger className="hover:!bg-black/10 transition-colors">Save</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem className="hover:!bg-black/10 transition-colors">
                                            <span className="flex items-center gap-2">
                                                Save Fields <MenubarShortcut><Save className="h-[14px] w-[14px]" /></MenubarShortcut>
                                            </span>
                                        </MenubarItem>
                                        <MenubarItem className="hover:!bg-black/10 transition-colors" onClick={generateLatexPDF}>
                                            <span className="flex items-center gap-2">
                                                Download PDF <MenubarShortcut><Download className="h-[14px] w-[14px]" /></MenubarShortcut>
                                            </span>
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>

                </div>

                <section className="w-full h-max place-items-center place-content-center justify-between flex gap-5">
                    
                    <div className="w-[200px]">
                    <JkCombobox
                            user={user}
                            label="Select Job"
                            placeholderText="Select Job"
                            initialObjectOfThings={
                                userJobs?.map(job => ({
                                    value: job.Title,
                                    label: `${job.Title} at ${job.Company}`
                                })) || []
                            }
                            onChange={(value: any, index?: number) => {
                                const selectedJob = userJobs?.find(job => job.Title === value);
                                if (selectedJob) {
                                    setCurrentJobForResumeCreation(selectedJob);
                                    console.log('✅✅✅✅ Selected job ✅✅✅✅:', selectedJob);
                                }
                            }}
                            notFoundComponent={
                                <div className="p-2 text-sm opacity-50">
                                    No jobs found
                                </div>
                            }
                        />
                    </div>
               
                    <div className="w-[200px]">
                    <JkCombobox
                            user={user}
                            label="Select Saved Fields"
                            placeholderText="Select Saved Fields"
                            initialObjectOfThings={
                                userJobs?.map(job => ({
                                    value: job.Title,
                                    label: `${job.Title} at ${job.Company}`
                                })) || []
                            }
                            onChange={(value: any, index?: number) => {
                                const selectedJob = userJobs?.find(job => job.Title === value);
                                if (selectedJob) {
                                    setCurrentJobForResumeCreation(selectedJob);
                                    console.log('✅✅✅✅ Selected job ✅✅✅✅:', selectedJob);
                                }
                            }}
                            notFoundComponent={
                                <div className="p-2 text-sm opacity-50">
                                    No jobs found
                                </div>
                            }
                        />
                    </div>

                </section>

            </section>


            <span className="w-[20px] opacity-[0%] h-[30px]">
                .
            </span>


            {/* Personal Information Section */}
            <section className="space-y-3">
                <div className="flex items-center gap-3">
                    <div 
                        className="p-2.5 rounded-lg transition-all duration-300"
                        style={{ backgroundColor: `${styles.nav.colors.applications}20` }}
                    >
                        <User 
                            className="h-[18px] w-[18px]" 
                            style={{ color: styles.nav.colors.applications }}
                        />
                    </div>
                    <h2 
                        className="text-base font-medium" 
                        style={{ color: styles.text.primary }}
                    >
                        Personal Information
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <JkInput
                        user={user}
                        label="First Name"
                        placeholderText="John"
                        type="text"
                        className="w-full "
                        value={resumeData.personalInfo.firstName}
                        onChange={(e) => handleUpdateResumeData("firstName", e.target.value)}
                        onMouseEnter={(e) => {handleFocus(e, "name-resume")}}
                    />
                    <JkInput
                        user={user}
                        label="Last Name"
                        placeholderText="Doe"
                        type="text"
                        className="w-full backdrop-blur-sm"
                        value={resumeData.personalInfo.lastName}
                        onChange={(e) => handleUpdateResumeData("lastName", e.target.value)}
                        onMouseEnter={(e) => {handleFocus(e, "name-resume")}}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <JkInput
                        user={user}
                        label="Email"
                        placeholderText="john@example.com"
                        type="email"
                        className="w-full backdrop-blur-sm"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => handleUpdateResumeData("email", e.target.value)}
                        onMouseEnter={(e) => {handleFocus(e, "name-resume")}}
                    />
                    <JkSelect
                        user={user}
                        label="Citizenship"
                        value={resumeData.personalInfo.citizenship}
                        triggerText="Select Citizenship"
                        options={[
                            { value: 'US Citizen', label: 'US Citizen' },
                            { value: 'Canadian Citizen', label: 'Canadian Citizen' },
                            { value: 'Australian Citizen', label: 'Australian Citizen' },
                            { value: 'British Citizen', label: 'British Citizen' },
                            { value: 'Italian Citizen', label: 'Italian Citizen' },
                            { value: 'German Citizen', label: 'German Citizen' },
                            { value: 'French Citizen', label: 'French Citizen' },
                            { value: 'Spanish Citizen', label: 'Spanish Citizen' },
                        ]} // --- 🦕 ---
                        onChange={(value) => handleUpdateResumeData("citizenship", value)}
                        onMouseEnter={(e) => handleFocus(e, "citizenship-resume")}
                    />
                </div>
            </section>

            {/* Professional Details Section */}
            <section 
                className="space-y-3 pt-8" 
                style={{ borderColor: styles.card.border }}
            >
                
                <div className="flex items-center gap-3">
                    <div 
                        className="p-2.5 rounded-lg transition-all duration-300"
                        style={{ backgroundColor: `${styles.nav.colors.companyHub}20` }}
                    >
                        <Briefcase 
                            className="h-[18px] w-[18px]" 
                            style={{ color: styles.nav.colors.companyHub }}
                        />
                    </div>
                    <h2 
                        className="text-base font-medium" 
                        style={{ color: styles.text.subtitle }}
                    >
                        Professional Details
                    </h2>
                </div>

                <div className="grid  grid-cols-1 md:grid-cols-2 gap-6">
               
                    <JkPopUp
                        user={user}
                        refComponent={refOfThisComponent}
                        label="Education"
                        dialogId="education-popup"
                        header="Educational Background"
                        subtitle="Add your academic qualifications"
                        trigger={
                            <span 
                                className="w-full flex-col p-4 rounded-xl border border-dashed flex items-center justify-center gap-3 transition-all duration-300 hover:border-solid hover:bg-white/5 hover:scale-[1.01] active:scale-[0.99]"
                                style={{ 
                                    borderColor: styles.card.border,
                                    color: styles.text.primary
                                }}
                            >
                                <LucideGraduationCap size={20} />
                                <span>Add Education</span>
                            </span>
                        }
                        styledTrigger={false}
                        BigField={
                            <JkEducationFields 
                                user={user} 
                                  education={resumeData.education} 
                            />}
                    />

                    <JkPopUp
                        user={user}
                        label="Experience"
                        refComponent={refOfThisComponent}
                        header="Professional Experience"
                        dialogId="experience-popup"
                        subtitle="Add your work history and achievements"
                        trigger={
                            <span 
                                className="w-full flex-col p-4 rounded-xl border border-dashed flex items-center justify-center gap-3 transition-all duration-300 hover:border-solid hover:bg-white/5 hover:scale-[1.01] active:scale-[0.99]"
                                style={{ 
                                    borderColor: styles.card.border,
                                    color: styles.text.primary
                                }}
                            >
                                <LucidePlus size={20} />
                                <span>Add Experience</span>
                            </span>
                        }
                        styledTrigger={false}
                        BigField={<JkExperienceFields 
                            user={user} 
                            experience={resumeData.experience}
                        />}
                    />

                
                </div>

            </section>

            {/* Skills & Projects Section */}
            <section>
                <div className="space-y-3 pt-6 border-t" 
                style={{ 
                    borderColor: `${styles.text.primary}10`
                }}>
                <div className="flex items-center gap-2">
                    <div 
                        className="p-2.5 rounded-lg transition-all duration-300"
                        style={{ backgroundColor: `${styles.nav.colors.careerAssistant}20` }}
                    >
                        <Sparkles 
                            className="h-[18px] w-[18px]"
                            style={{ color: styles.nav.colors.careerAssistant }}
                        />
                    </div>
                    <h2 className="text-base font-medium" style={{ color: styles.text.primary }}>
                        Skills & Projects
                    </h2>
                </div>

                <div className="space-y-3">
                    
                    {/* REVIEW Technical SKills */}
                    <div className="flex gap-2">
                        <JkInput
                            user={user}
                            label="Technical Skills"
                            placeholderText="Type a skill and press Enter"
                            type="text"
                            className="w-full"
                            value={currentTechnicalSkill}
                            onMouseEnter={(e) => {handleFocus(e, "skills-resume")}}
                            onChange={(e) => {
                                setCurrentTechnicalSkill(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.keyCode === 13) {
                                    e.preventDefault();
                                    if (currentTechnicalSkill.trim()) {
                                        const updatedSkills = {
                                            ...resumeData.skills,
                                            technical: [...resumeData.skills.technical, currentTechnicalSkill.trim()]
                                        };
                                        handleUpdateResumeData("skills", updatedSkills);
                                        setCurrentTechnicalSkill('');
                                    }
                                }
                            }}
                            fieldImIn="Skills"
                        />
                        <button
                            onClick={() => {
                                if (currentTechnicalSkill.trim()) {
                                    const updatedSkills = {
                                        ...resumeData.skills,
                                        technical: [...resumeData.skills.technical, currentTechnicalSkill.trim()]
                                    };
                                    handleUpdateResumeData("skills", updatedSkills);
                                    setCurrentTechnicalSkill('');
                                }
                            }}
                            className="self-end p-3 rounded-lg transition-all duration-300 hover:opacity-80"
                            style={{
                                backgroundColor: styles.nav.colors.careerAssistant,
                                color: '#ffffff',
                                marginBottom: '1px'
                            }}
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        
                        {resumeData.skills.technical.map((skill, index) => (
                            <span 
                                key={index} 
                                className="px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm"
                                style={{ 
                                    backgroundColor: styles.card.boxShadow,
                                    color: styles.text.primary
                                }}
                            >
                                {skill}
                                <X 
                                    className="h-3 w-3 cursor-pointer hover:opacity-70" 
                                    onClick={() => {
                                        const updatedSkills = {
                                            ...resumeData.skills,
                                            technical: resumeData.skills.technical.filter((_, i) => i !== index)
                                        };
                                        handleUpdateResumeData("skills", updatedSkills);
                                    }}
                                />
                            </span>
                        ))}

                    </div>

                    {/* REVIEW additional skills */}
                    <div className="flex gap-2">
                        <JkInput
                            user={user}
                            label="Additional Skills"
                            placeholderText="Type a skill and press Enter"
                            type="text"
                            className="w-full"
                            value={currentAdditionalSkill}
                            onChange={(e) => {
                                setCurrentAdditionalSkill(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (currentAdditionalSkill.trim()) {
                                        const updatedSkills = {
                                            ...resumeData.skills,
                                            additional: [...resumeData.skills.additional, currentAdditionalSkill.trim()]
                                        };
                                        handleUpdateResumeData("skills", updatedSkills);
                                        setCurrentAdditionalSkill('');
                                    }
                                }
                            }}
                            onMouseEnter={(e) => {handleFocus(e, "skills-resume")}}
                            fieldImIn="Skills"
                        />
                        <button
                            onClick={() => {
                                if (currentAdditionalSkill.trim()) {
                                    const updatedSkills = {
                                        ...resumeData.skills,
                                        additional: [...resumeData.skills.additional, currentAdditionalSkill.trim()]
                                    };
                                    handleUpdateResumeData("skills", updatedSkills);
                                    setCurrentAdditionalSkill('');
                                }
                            }}
                            className="self-end p-3 rounded-lg transition-all duration-300 hover:opacity-80"
                            style={{
                                backgroundColor: styles.nav.colors.careerAssistant,
                                color: '#ffffff',
                                marginBottom: '1px'
                            }}
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        
                        {resumeData.skills.additional.map((skill, index) => (
                            <span 
                                key={index} 
                                className="px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm"
                                style={{ 
                                    backgroundColor: styles.card.boxShadow,
                                    color: styles.text.primary
                                }}
                            >
                                {skill}
                                <X 
                                    className="h-3 w-3 cursor-pointer hover:opacity-70" 
                                    onClick={() => {
                                        const updatedSkills = {
                                            ...resumeData.skills,
                                            additional: resumeData.skills.additional.filter((_, i) => i !== index)
                                        };
                                        handleUpdateResumeData("skills", updatedSkills);
                                    }}
                                />
                            </span>
                        ))}

                    </div>

                    {/* Projects... */}
                    <JkPopUp
                        user={user}
                        label="Projects"
                        refComponent={refOfThisComponent}
                        header="Project Portfolio"
                        dialogId="projects-popup"
                        subtitle="Add your projects and achievements"
                        trigger={
                            <span 
                                className="w-full p-4 rounded-xl border border-dashed flex items-center justify-center gap-3 transition-all duration-300 hover:border-solid hover:bg-white/5 hover:scale-[1.01] active:scale-[0.99]"
                                style={{ 
                                    borderColor: styles.card.border,
                                    color: styles.text.primary
                                }}
                            >
                                <Plus className="h-[14px] w-[14px]" />
                                <span>Add Project</span>
                            </span>
                        }
                        styledTrigger={false}
                        BigField={
                            <JkProjectFields 
                                user={user} 
                                projects={resumeData.projects} 
                              
                        />}
                    />

                                {/* Skills & Projects Section */}
            <section>

                {/* Additional Information Section */}
                <div className="space-y-3 pt-6 border-t" 
                    style={{ borderColor: `${styles.text.primary}10` }}
                >
                    <div className="flex items-center gap-2">
                        <div 
                            className="p-2.5 rounded-lg transition-all duration-300"
                            style={{ backgroundColor: `${styles.nav.colors.careerAssistant}20` }}
                        >
                            <User 
                                className="h-[18px] w-[18px]"
                                style={{ color: styles.nav.colors.careerAssistant }}
                            />
                        </div>
                        <h2 className="text-base font-medium" style={{ color: styles.text.primary }}>
                            Additional Information
                        </h2>
                    </div>

                    {/* Interests */}
                    <div className="flex gap-2">
                        <JkInput
                            user={user}
                            label="Interests"
                            placeholderText="Add an interest"
                            type="text"
                            className="w-full"
                            value={currentInterest}
                            onChange={(e) => setCurrentInterest(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (currentInterest.trim()) {
                                        const updatedInfo = {
                                            ...resumeData.additionalInfo,
                                            interests: [...resumeData.additionalInfo.interests, currentInterest.trim()]
                                        };
                                        handleUpdateResumeData("additionalInfo", updatedInfo);
                                        setCurrentInterest('');
                                    }
                                }
                            }}
                        />
                        <button
                            onClick={() => {
                                if (currentInterest.trim()) {
                                    const updatedInfo = {
                                        ...resumeData.additionalInfo,
                                        interests: [...resumeData.additionalInfo.interests, currentInterest.trim()]
                                    };
                                    handleUpdateResumeData("additionalInfo", updatedInfo);
                                    setCurrentInterest('');
                                }
                            }}
                            className="self-end p-3 rounded-lg transition-all duration-300 hover:opacity-80"
                            style={{
                                backgroundColor: styles.nav.colors.careerAssistant,
                                color: '#ffffff',
                                marginBottom: '1px'
                            }}
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {resumeData.additionalInfo.interests.map((interest, index) => (
                            <span 
                                key={index} 
                                className="px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm"
                                style={{ 
                                    backgroundColor: styles.card.boxShadow,
                                    color: styles.text.primary
                                }}
                            >
                                {interest}
                                <X 
                                    className="h-3 w-3 cursor-pointer hover:opacity-70" 
                                    onClick={() => {
                                        const updatedInfo = {
                                            ...resumeData.additionalInfo,
                                            interests: resumeData.additionalInfo.interests.filter((_, i) => i !== index)
                                        };
                                        handleUpdateResumeData("additionalInfo", updatedInfo);
                                    }}
                                />
                            </span>
                        ))}
                    </div>

                                      {/* Hobbies */}
                                      <div className="flex gap-2">
                        <JkInput
                            user={user}
                            label="Hobbies"
                            placeholderText="Add a hobby"
                            type="text"
                            className="w-full"
                            value={currentHobby}
                            onChange={(e) => setCurrentHobby(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (currentHobby.trim()) {
                                        const updatedInfo = {
                                            ...resumeData.additionalInfo,
                                            hobbies: [...resumeData.additionalInfo.hobbies, currentHobby.trim()]
                                        };
                                        handleUpdateResumeData("additionalInfo", updatedInfo);
                                        setCurrentHobby('');
                                    }
                                }
                            }}
                        />
                        <button
                            onClick={() => {
                                if (currentHobby.trim()) {
                                    const updatedInfo = {
                                        ...resumeData.additionalInfo,
                                        hobbies: [...resumeData.additionalInfo.hobbies, currentHobby.trim()]
                                    };
                                    handleUpdateResumeData("additionalInfo", updatedInfo);
                                    setCurrentHobby('');
                                }
                            }}
                            className="self-end p-3 rounded-lg transition-all duration-300 hover:opacity-80"
                            style={{
                                backgroundColor: styles.nav.colors.careerAssistant,
                                color: '#ffffff',
                                marginBottom: '1px'
                            }}
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {resumeData.additionalInfo.hobbies.map((hobby, index) => (
                            <span 
                                key={index} 
                                className="px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm"
                                style={{ 
                                    backgroundColor: styles.card.boxShadow,
                                    color: styles.text.primary
                                }}
                            >
                                {hobby}
                                <X 
                                    className="h-3 w-3 cursor-pointer hover:opacity-70" 
                                    onClick={() => {
                                        const updatedInfo = {
                                            ...resumeData.additionalInfo,
                                            hobbies: resumeData.additionalInfo.hobbies.filter((_, i) => i !== index)
                                        };
                                        handleUpdateResumeData("additionalInfo", updatedInfo);
                                    }}
                                />
                            </span>
                        ))}
                    </div>

                    {/* Languages */}
                    <div className="flex gap-2">
                        <JkInput
                            user={user}
                            label="Languages"
                            placeholderText="Add a language"
                            type="text"
                            className="w-full"
                            value={currentLanguage}
                            onChange={(e) => setCurrentLanguage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (currentLanguage.trim()) {
                                        const updatedInfo = {
                                            ...resumeData.additionalInfo,
                                            languages: [...resumeData.additionalInfo.languages, currentLanguage.trim()]
                                        };
                                        handleUpdateResumeData("additionalInfo", updatedInfo);
                                        setCurrentLanguage('');
                                    }
                                }
                            }}
                        />
                        <button
                            onClick={() => {
                                if (currentLanguage.trim()) {
                                    const updatedInfo = {
                                        ...resumeData.additionalInfo,
                                        languages: [...resumeData.additionalInfo.languages, currentLanguage.trim()]
                                    };
                                    handleUpdateResumeData("additionalInfo", updatedInfo);
                                    setCurrentLanguage('');
                                }
                            }}
                            className="self-end p-3 rounded-lg transition-all duration-300 hover:opacity-80"
                            style={{
                                backgroundColor: styles.nav.colors.careerAssistant,
                                color: '#ffffff',
                                marginBottom: '1px'
                            }}
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {resumeData.additionalInfo.languages.map((language, index) => (
                            <span 
                                key={index} 
                                className="px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm"
                                style={{ 
                                    backgroundColor: styles.card.boxShadow,
                                    color: styles.text.primary
                                }}
                            >
                                {language}
                                <X 
                                    className="h-3 w-3 cursor-pointer hover:opacity-70" 
                                    onClick={() => {
                                        const updatedInfo = {
                                            ...resumeData.additionalInfo,
                                            languages: resumeData.additionalInfo.languages.filter((_, i) => i !== index)
                                        };
                                        handleUpdateResumeData("additionalInfo", updatedInfo);
                                    }}
                                />
                            </span>
                        ))}
                    </div>

                    {/* References */}
                    <div className="flex gap-2">
                        <JkInput
                            user={user}
                            label="References"
                            placeholderText="Add a reference"
                            type="text"
                            className="w-full"
                            value={currentReference}
                            onChange={(e) => setCurrentReference(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (currentReference.trim()) {
                                        const updatedInfo = {
                                            ...resumeData.additionalInfo,
                                            references: [...resumeData.additionalInfo.references, currentReference.trim()]
                                        };
                                        handleUpdateResumeData("additionalInfo", updatedInfo);
                                        setCurrentReference('');
                                    }
                                }
                            }}
                        />
                        <button
                            onClick={() => {
                                if (currentReference.trim()) {
                                    const updatedInfo = {
                                        ...resumeData.additionalInfo,
                                        references: [...resumeData.additionalInfo.references, currentReference.trim()]
                                    };
                                    handleUpdateResumeData("additionalInfo", updatedInfo);
                                    setCurrentReference('');
                                }
                            }}
                            className="self-end p-3 rounded-lg transition-all duration-300 hover:opacity-80"
                            style={{
                                backgroundColor: styles.nav.colors.careerAssistant,
                                color: '#ffffff',
                                marginBottom: '1px'
                            }}
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {resumeData.additionalInfo.references.map((reference, index) => (
                            <span 
                                key={index} 
                                className="px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm"
                                style={{ 
                                    backgroundColor: styles.card.boxShadow,
                                    color: styles.text.primary
                                }}
                            >
                                {reference}
                                <X 
                                    className="h-3 w-3 cursor-pointer hover:opacity-70" 
                                    onClick={() => {
                                        const updatedInfo = {
                                            ...resumeData.additionalInfo,
                                            references: resumeData.additionalInfo.references.filter((_, i) => i !== index)
                                        };
                                        handleUpdateResumeData("additionalInfo", updatedInfo);
                                    }}
                                />
                            </span>
                        ))}
                    </div>

                    {/* References tags similar to Interests */}
                </div>
            </section>

                </div>


                </div>
                
            </section>

            
        </div>
    );
}
