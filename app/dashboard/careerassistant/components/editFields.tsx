'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { JkInput } from "@/app/jkComponents/jkInput";
import { JkSelect } from "@/app/jkComponents/jkSelect";
import { JkPopUp } from "@/app/jkComponents/jkPopUp";
import { JkCombobox } from "@/app/jkComponents/jkCombobox";
import { Briefcase, GraduationCap, LucideGraduationCap, LucidePlus, Plus, Sparkles, User, X } from "lucide-react";
import { useRef } from "react";
import { JkEducationFields } from "@/app/jkComponents/jkEducationFields";
import { JkExperienceFields } from "@/app/jkComponents/jkExperienceFields";
import { Download } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { TechBroProps } from "./resume/resumeTemplates";
import { JkProjectFields } from "@/app/jkComponents/jkProjectFields";

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
            {/* <button
                onClick={async () => {await generateTechBroPDF(resumeData)}}
                className="w-full p-4 rounded-xl border border-dashed flex items-center justify-center gap-3 transition-all duration-300 hover:border-solid hover:bg-white/5 hover:scale-[1.01] active:scale-[0.99] mb-8"
                style={{ 
                    borderColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                    color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor 
                }}
            >
                <Download className="h-[18px] w-[18px]" />
                <span>Download Resume as PDF</span>
            </button> */}
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
                        className="w-full backdrop-blur-sm"
                        value={resumeData.personalInfo.firstName}
                        onChange={(e) => handleUpdateResumeData("firstName", e.target.value)}
                    />
                    <JkInput
                        user={user}
                        label="Last Name"
                        placeholderText="Doe"
                        type="text"
                        className="w-full backdrop-blur-sm"
                        value={resumeData.personalInfo.lastName}
                        onChange={(e) => handleUpdateResumeData("lastName", e.target.value)}
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
                    />
                    <JkSelect
                        user={user}
                        label="Citizenship"
                        value={resumeData.personalInfo.citizenship}
                        triggerText="Select Citizenship"
                        options={[
                            { value: 'us', label: 'US Citizen' },
                            { value: 'canadian', label: 'Canadian Citizen' },
                            { value: 'australian', label: 'Australian Citizen' },
                            { value: 'british', label: 'British Citizen' },
                            { value: 'italian', label: 'Italian Citizen' },
                            { value: 'german', label: 'German Citizen' },
                            { value: 'french', label: 'French Citizen' },
                            { value: 'spanish', label: 'Spanish Citizen' },
                        ]} // --- 🦕 ---
                        onChange={(value) => handleUpdateResumeData("citizenship", value)}
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
                        BigField={<JkExperienceFields user={user} experience={resumeData.experience} />}
                    />

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
                    <JkCombobox
                        user={user}
                        label="Technical Skills"
                        onChange={(index, field, value) => {
                            const updatedSkills = {
                                technical: [...resumeData.skills.technical],
                                additional: [...resumeData.skills.additional]
                            };
                            updatedSkills.technical[index] = value;
                            handleUpdateResumeData("skills", updatedSkills);
                        }}
                        initialObjectOfThings={[
                            { value: 'javascript', label: 'JavaScript' },
                            { value: 'typescript', label: 'TypeScript' },
                            { value: 'react', label: 'React' },
                            { value: 'node', label: 'Node.js' },
                            { value: 'python', label: 'Python' },
                            { value: 'java', label: 'Java' },
                            { value: 'csharp', label: 'C#' },
                            { value: 'sql', label: 'SQL' },
                            { value: 'aws', label: 'AWS' },
                            { value: 'docker', label: 'Docker' },
                        ]} // --- 🦕 ---
                        notFoundComponent={<></>}
                    />

                    <div className="flex flex-wrap gap-2">
                        {resumeData?.skills?.technical?.map((skill, index) => (
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
                                            technical: resumeData.skills.technical.filter((_ : any, i : number) => i !== index)
                                        };
                                        handleUpdateResumeData("skills", updatedSkills);
                                    }}
                                />
                            </span>
                        ))}
                    </div>

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