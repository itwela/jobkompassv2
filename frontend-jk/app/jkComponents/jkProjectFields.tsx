
'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { Pencil, Plus, Trash } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { useJobKompassResume } from "../helpers/providers/JobKompassResumeProvider";
import { JkInput } from "./jkInput";
import { JkTextArea } from "./jkTextArea";

export interface JkProjectFieldsProps {
    user: any;
    projects: Array<{
        name: string;
        achievement: string;
        description: string;
        link: string;
        technologies: string[];
        date: string;
        details: string[];
      }>;
}

export const JkProjectFields = memo(
    ({
        user,
        projects,
    }: JkProjectFieldsProps) => {
        const [projectNumber, setProjectNumber] = useState(-1);
        const [isAddingNew, setIsAddingNew] = useState(false);
        const [isEditingExisting, setIsEditingExisting] = useState(false);
        const { styles } = useJobKompassTheme();
        const { handleCreateNewComplexField, handleSaveComplexFields, handleDeleteComplexField, sectionImCurrentlyEditingRef, setSectionImCurrentlyEditingRef , currentThemeName } = useJobKompassResume();

        const projectFormRef = useRef<() => any>(null); // Ref to get ProjectForm state

        const handleStartUpdatingSelectedProject = (index: number) => {
            setIsEditingExisting(true);
            setProjectNumber(index);
        };

        const handleSave = () => {
            if (projectFormRef.current) {
                const projectData = projectFormRef.current();
                console.log("Saving project data:", projectNumber, projectData); // Debug
                handleSaveComplexFields( currentThemeName, projectNumber, projectData, "Projects");
            }
            setIsAddingNew(false);
            setIsEditingExisting(false);
            setProjectNumber(-1);
        };

        const ProjectForm = ({ index }: { index: number }) => {
            
            const [localName, setLocalName] = useState(projects[index]?.name || "");
            const [localDescription, setLocalDescription] = useState(projects[index]?.description || "");
            const [localTechnologies, setLocalTechnologies] = useState(projects[index]?.technologies || [""]);
            const [localDate, setLocalDate] = useState(projects[index]?.date || "");
            const [localDetails, setLocalDetails] = useState(projects[index]?.details || [""]);
            const [localAchievement, setLocalAchievement] = useState(projects[index]?.achievement || "");
            const [localLink, setLocalLink] = useState(projects[index]?.link || "");

            const handleFocus = (e: any) => {
                console.log("Focus event triggered for project:", index, e);
                setSectionImCurrentlyEditingRef(`project-${index}`);
            };

            const setALlFeildsWIthDebugData = () => {
                setLocalName("Project Name");
                setLocalDescription("Project Description");
                setLocalTechnologies(["React", "Node.js", "TypeScript"]);
                setLocalDate("Jan 2023 - Mar 2023");
                setLocalDetails?.(["Achievement 1", "Achievement 2", "Achievement 3"]);
                setLocalAchievement("Project Achievement");
                setLocalLink?.("setLocalLink");
            };


            // Update the ref with a function to get current state
            useEffect(() => {
                projectFormRef.current = () => ({
                    name: localName,
                    description: localDescription,
                    technologies: localTechnologies,
                    date: localDate,
                    details: localDetails,
                    achievement: localAchievement,
                    link: localLink,
                });
            }, [localName, localDescription, localTechnologies, localDate, localDetails, localAchievement, localLink]);

            return (
                <span className="flex flex-col gap-5">
                    
                    <span onClick={setALlFeildsWIthDebugData}>debug</span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <JkInput
                            user={user}
                            label="Project Name"
                            placeholderText="Add Project Name"
                            type="text"
                            className="w-full"
                            value={localName}
                            onChange={(e) => setLocalName(e.target.value)}
                            onMouseEnter={handleFocus}
                            fieldImIn="Projects"
                        />
                        
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <JkInput
                            user={user}
                            label="Date"
                            placeholderText="e.g., Jan 2023 - Mar 2023"
                            type="text"
                            className="w-full"
                            value={localDate}
                            onChange={(e) => setLocalDate(e.target.value)}
                            onMouseEnter={handleFocus}
                            fieldImIn="Projects"
                        />

                        <JkInput
                            user={user}
                            label="Link"
                            placeholderText="Add Project Link"
                            type="text"
                            className="w-full"
                            value={localLink}
                            onChange={(e) => setLocalLink(e.target.value)}
                            onMouseEnter={handleFocus}
                            fieldImIn="Projects"
                        />
                    </div>

                    <JkInput
                        user={user}
                        label="Description"
                        placeholderText="Add Project Description"
                        type="text"
                        className="w-full"
                        value={localDescription}
                        onChange={(e) => setLocalDescription(e.target.value)}
                        onMouseEnter={handleFocus}
                        fieldImIn="Projects"
                    />

                    <JkInput
                        user={user}
                        label="Achievement"
                        placeholderText="Add Project Achievement"
                        type="text"
                        className="w-full"
                        value={localAchievement}
                        onChange={(e) => setLocalAchievement(e.target.value)}
                        onMouseEnter={handleFocus}
                        fieldImIn="Projects"
                    />

                    <JkInput
                        user={user}
                        label="Technologies Used"
                        placeholderText="e.g., React, Node.js, TypeScript"
                        type="text"
                        className="w-full"
                        value={localTechnologies.join(", ")}
                        onChange={(e) => setLocalTechnologies(e.target.value.split(", "))}
                        onMouseEnter={handleFocus}
                        fieldImIn="Projects"
                    />


                    {projects[index]?.details.map((detail, detailIndex) => (
                        
                        // TODO
                        <JkTextArea
                            key={detailIndex}
                            user={user}
                            label={`Detail ${detailIndex + 1}`}
                            placeholderText="Add Achievement or Detail"
                            type="text"
                            className="w-full"
                            value={detail}
                            onChange={(e) => {
                                const newDetails = [...localDetails];
                                (newDetails as any)[detailIndex] = e.target.value;
                                setLocalDetails(newDetails);
                            }}
                            onMouseEnter={handleFocus}
                            fieldImIn="Projects"
                        />
                    ))}

                    {/* TODO */}
                    {/* <button
                        onClick={() => {
                            const newDetails = [...localDetails, ""];
                            setLocalDetails(newDetails as any);
                            setDetails(newDetails as any);
                        }}
                        className="w-full p-4 rounded-xl border border-dashed flex items-center justify-center gap-3 transition-all duration-300 hover:border-solid hover:bg-white/5 hover:scale-[1.01] active:scale-[0.99]"
                        style={{
                            borderColor: styles.card.border,
                            color: styles.text.primary,
                        }}
                    >
                        <Plus className="h-[14px] w-[14px]" />
                        <span>Add Detail</span>
                    </button> */}
                </span>
            );
        };

        return (
            <div className="space-y-6">
                {projects?.map((project, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-xl border relative transition-all duration-300"
                        style={{
                            borderColor: styles.card.border,
                            backgroundColor: styles.card.boxShadow,
                        }}
                    >
                        {projectNumber === index ? (
                            <>
                            <span id="start-of-project-form"></span>
                            <span className="flex flex-col gap-5">
                                <span className="w-full relative h-max">
                                    <span
                                        style={{
                                            backgroundColor: styles.nav.colors.careerAssistant,
                                            color: '#ffffff'
                                        }}
                                        className="flex sticky top-0 mb-4 items-center justify-between gap-2 py-2 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                                        <span className="font-bold">
                                            Editing: {projects[projectNumber]?.name || "New Project"}
                                        </span>
                                        <span className="p-2 cursor-pointer" onClick={handleSave}>
                                            Save?
                                        </span>
                                    </span>
                                    <ProjectForm index={index} />
                                </span>
                            </span>
                                    </>
                        ) : (
                            <span className="flex items-center justify-between">
                                <span className="flex flex-col gap-1">
                                    <h3
                                        className="text-base font-medium"
                                        style={{ color: styles.text.primary }}
                                    >
                                        {project.name || "Untitled Project"}
                                    </h3>
                                    <p
                                        className="text-sm"
                                        style={{ color: styles.text.subtitle }}
                                    >
                                        {project.date || "No date specified"}
                                    </p>
                                </span>

                                <span className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleStartUpdatingSelectedProject(index)}
                                        className="p-2 outline-none border-none rounded-lg hover:bg-white/5"
                                        style={{ color: styles.text.primary }}
                                    >
                                        <a href="#start-of-project-form">
                                            <Pencil className="h-[14px] w-[14px]" />
                                        </a>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteComplexField(currentThemeName, index, "Projects")}
                                        className="p-2 outline-none border-none rounded-lg hover:bg-white/5"
                                        style={{ color: styles.text.primary }}
                                    >
                                        <a>
                                            <Trash className="h-[14px] w-[14px]" />
                                        </a>
                                    </button>
                                </span>

                            </span>
                        )}
                    </div>
                ))}

                {/* REVIEW */}
                <button
                    onClick={() => handleCreateNewComplexField( currentThemeName, "Projects")}
                    className="w-full p-4 rounded-xl border border-dashed flex items-center justify-center gap-3 transition-all duration-300 hover:border-solid hover:bg-white/5 hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                        borderColor: styles.card.border,
                        color: styles.text.primary,
                    }}
                >
                    <Plus className="h-[14px] w-[14px]" />
                    <span>Add Project</span>
                </button>
            </div>
        );
    }
);