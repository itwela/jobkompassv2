'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { Check, Pencil, Plus, Trash } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { JkInput } from "./jkInput";
import { useJobKompassResume } from "../helpers/providers/JobKompassResumeProvider";

export interface JkProjectFieldsProps {
    user: any;
    projects: Array<{
        name: string;
        description: string;
        technologies: string[];
        date: string;
        details: string[];
    }>;
    onCreate?: () => void;
    onSave?: (index: number, projectData: any) => void;
    onDelete?: (index: number) => void;
}

export const JkProjectFields = memo(
    ({
        user,
        projects,
        onCreate,
        onSave,
        onDelete,
    }: JkProjectFieldsProps) => {
        const [projectNumber, setProjectNumber] = useState(-1);
        const [isAddingNew, setIsAddingNew] = useState(false);
        const [isEditingExisting, setIsEditingExisting] = useState(false);
        const { styles } = useJobKompassTheme();
        const { sectionImCurrentlyEditingRef, setSectionImCurrentlyEditingRef } = useJobKompassResume();

        const projectCount = projects?.length;

        const handleStartUpdatingSelectedProject = (index: number) => {
            setIsEditingExisting(true);
            setProjectNumber(index);
            setName(projects[index].name);
            setDescription(projects[index].description);
            setTechnologies(projects[index].technologies);
            setDate(projects[index].date);
            const detailsArray = projects[index].details || [];
            setDetails([...detailsArray] as any);
        };

        const handleLooksGoodProject = () => {
            setIsAddingNew(false);
            setIsEditingExisting(false);
            setProjectNumber(-1);
        };

        const handleDeleteProject = (index: number) => {
            onDelete && onDelete(index);
            setProjectNumber(-1);
            setIsAddingNew(false);
        };

        const [name, setName] = useState("");
        const [description, setDescription] = useState("");
        const [technologies, setTechnologies] = useState<string[]>([]);
        const [date, setDate] = useState("");
        const [details, setDetails] = useState([]);

        const handleSave = () => {
            const updatedProject = {
                name,
                description,
                technologies,
                date,
                details
            };
            onSave && onSave(projectNumber, updatedProject);
            handleLooksGoodProject();
        };

        const ProjectForm = ({ index }: { index: number }) => {
            const [localName, setLocalName] = useState(name);
            const [localDescription, setLocalDescription] = useState(description);
            const [localTechnologies, setLocalTechnologies] = useState(technologies);
            const [localDate, setLocalDate] = useState(date);
            const [localDetails, setLocalDetails] = useState(details);
            
            const handleFocus = (e: any) => {
                console.log("Focus event triggered for project:", index, e);
                setSectionImCurrentlyEditingRef(`project-${index}`);
            };


            useEffect(() => {
                setLocalName(name);
                setLocalDescription(description);
                setLocalTechnologies(technologies);
                setLocalDate(date);
                setLocalDetails(details);
            }, [name, description, technologies, date, details]);

            return (
                <span className="flex flex-col gap-5">
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
                    </div>

                    <JkInput
                        user={user}
                        label="Description"
                        placeholderText="Add Project Description"
                        type="text"
                        className="w-full"
                        value={localDescription}
                        onChange={(e) => {
                            setLocalDescription(e.target.value); 
                        }}
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
                        onChange={(e) => {
                            setLocalTechnologies(e.target.value.split(", ")); 
                        }}
                        onMouseEnter={handleFocus}
                        fieldImIn="Projects"
                    />

                    {projects[index]?.details.map((detail, detailIndex) => (
                        <JkInput
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

                    <button
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
                    </button>
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
                                <button
                                    onClick={() => handleStartUpdatingSelectedProject(index)}
                                    className="p-2 outline-none border-none rounded-lg hover:bg-white/5"
                                    style={{ color: styles.text.primary }}
                                >
                                    <a href="#start-of-project-form">
                                        <Pencil className="h-[14px] w-[14px]" />
                                    </a>
                                </button>
                            </span>
                        )}
                    </div>
                ))}

                <button
                    onClick={() => {
                        setIsAddingNew(true);
                        setProjectNumber(projects.length);
                        setName("");
                        setDescription("");
                        setTechnologies([]);
                        setDate("");
                        setDetails([]);
                        onCreate && onCreate();
                    }}
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