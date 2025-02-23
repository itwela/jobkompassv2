'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { JkInput } from "@/app/jkComponents/jkInput";
import { JkSelect } from "@/app/jkComponents/jkSelect";
import { JkPopUp } from "@/app/jkComponents/jkPopUp";
import { JkCombobox } from "@/app/jkComponents/jkCombobox";
import { Bot, Briefcase, DownloadCloud, GraduationCap, LucideGraduationCap, LucidePlus, Plus, Sparkles, User, X } from "lucide-react";
import { useRef, useState } from "react";
import { JkEducationFields } from "@/app/jkComponents/jkEducationFields";
import { JkExperienceFields } from "@/app/jkComponents/jkExperienceFields";
import { Download } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { TechBroProps } from "./resume/resumeTemplates";
import { JkProjectFields } from "@/app/jkComponents/jkProjectFields";
import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider";

export default function EditFields({
    user,
    resumeData,
    handleUpdateResumeData
}: {
    user: any,
    resumeData: TechBroProps;
    handleUpdateResumeData: (field: keyof TechBroProps["personalInfo"] | "summary" | "skills" | "education" | "experience" | "projects", value: any) => void;
}) {
    const { styles } = useJobKompassTheme();
    const refOfThisComponent = useRef<HTMLDivElement>(null);

    const [currentTechnicalSkill, setCurrentTechnicalSkill] = useState<string>('');
    const [currentAdditionalSkill, setCurrentAdditionalSkill] = useState<string>('');
    const { registerContentRef, wantsToPrint, setWantsToPrint, currentTheme } = useJobKompassResume();
    const { sectionImCurrentlyEditingRef, setSectionImCurrentlyEditingRef } = useJobKompassResume();

    const handleWantingToPrint = () => {

        // NOTE this is setup to effectively hide everything else on the page
        // and then we are going to print the page/save it

        // NOTE Component references:
        // LINK app/dashboard/careerassistant/components/resume/🖨️Presume.tsx
        // LINK app/dashboard/careerassistant/components/🖨️PdocumentComponent.tsx
        // LINK app/dashboard/careerassistant/components/documentEditor.tsx:143


        // NOTE this is where the preview component is being rendered as well, I found myself loosing it sometime:
        // LINK app/dashboard/careerassistant/components/documentEditor.tsx:188

        setWantsToPrint(true);
    }

    const handleFocus = ( e: any, fieldName? : string,) => {
        console.log("Focus event triggered for project:", fieldName, e);
        setSectionImCurrentlyEditingRef(`${fieldName}`);
    };

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
            <section className="w-full">
                <div className="flex gap-3 mb-8  flex place-content-center w-full">
                   
                    <button 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-y-[-2px]"
                        style={{
                            backgroundColor: `${styles.nav.colors.careerAssistant}20`,
                            color: styles.text.primary,
                            border: styles.card.border
                        }}
                    >
                        <Bot className="h-[16px] w-[16px]" />
                    </button>

                    <button 
                        onClick={handleWantingToPrint}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-y-[-2px]"
                        style={{
                            backgroundColor: `${styles.nav.colors.careerAssistant}20`,
                            color: styles.text.primary,
                            border: styles.card.border
                        }}
                    >
                        <Download className="h-[16px] w-[16px]" />
                    </button>
                    <button 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-y-[-2px]"
                        style={{
                            backgroundColor: `${styles.nav.colors.careerAssistant}20`,
                            color: styles.text.primary,
                            border: styles.card.border
                        }}
                    >
                        <DownloadCloud className="h-[16px] w-[16px]" />
                    </button>

                </div>
            </section>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
                <JkPopUp
                        user={user}
                        refComponent={refOfThisComponent}
                        label="Education"
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
                        BigField={<JkEducationFields user={user} education={resumeData.education} />}
                    />

                    <JkPopUp
                        user={user}
                        label="Experience"
                        refComponent={refOfThisComponent}
                        header="Professional Experience"
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
                            onCreate={() => {
                                const newExperience = {
                                    title: "",
                                    company: "",
                                    location: "",
                                    date: "",
                                    description: "",
                                    details: []
                                };
                                handleUpdateResumeData("experience", [...resumeData.experience, newExperience]);
                            }}
                            onSave={(index: number, updatedExperience: any) => {
                                const newExperience = [...resumeData.experience];
                                newExperience[index] = updatedExperience;
                                handleUpdateResumeData("experience", newExperience);
                            }}
                            onDelete={(index) => {
                                const updatedExperience = resumeData.experience.filter((_, i) => i !== index);
                                handleUpdateResumeData("experience", updatedExperience);
                            }}
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
                        BigField={<JkProjectFields user={user} projects={resumeData.projects} />}
                    />

                </div>


                </div>
                
            </section>
            
        </div>
    );
}