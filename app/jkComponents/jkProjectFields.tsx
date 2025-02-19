'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { Check, Pencil, Plus, Trash } from "lucide-react";
import { memo, useState } from "react";
import { JkInput } from "./jkInput";

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
    onChange?: (index: number, field: string, value: any) => void;
    onDelete?: (index: number) => void;
}

export const JkProjectFields = memo(
    ({
        user,
        projects,
        onCreate,
        onChange,
        onDelete,
    }: JkProjectFieldsProps) => {
        const [projectNumber, setProjectNumber] = useState(-1);
        const [isAddingNew, setIsAddingNew] = useState(false);
        const [isEditingExisting, setIsEditingExisting] = useState(false);
        const { styles } = useJobKompassTheme();

        const projectCount = projects?.length;

        const handleAddProject = () => {
            setIsAddingNew(true);
            onCreate && onCreate();
            setProjectNumber(projectCount);
        };

        const handleUpdateProject = (index: number) => {
            setIsEditingExisting(true);
            setProjectNumber(index);
        };

        const handleLooksGoodProject = () => {
            setIsAddingNew(false);
            setProjectNumber(-1);
        };

        const handleDeleteProject = (index: number) => {
            onDelete && onDelete(index);
            setProjectNumber(-1);
            setIsAddingNew(false);
        };

        const ProjectForm = ({ index }: { index: number }) => (
            <span className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <JkInput
                        user={user}
                        label="Project Name"
                        placeholderText="Add Project Name"
                        type="text"
                        className="w-full"
                        value={projects[index]?.name || ""}
                        onChange={(e) => onChange && onChange(index, "name", e.target.value)}
                    />
                    <JkInput
                        user={user}
                        label="Date"
                        placeholderText="e.g., Jan 2023 - Mar 2023"
                        type="text"
                        className="w-full"
                        value={projects[index]?.date || ""}
                        onChange={(e) => onChange && onChange(index, "date", e.target.value)}
                    />
                </div>

                <JkInput
                    user={user}
                    label="Description"
                    placeholderText="Add Project Description"
                    type="text"
                    className="w-full"
                    value={projects[index]?.description || ""}
                    onChange={(e) => onChange && onChange(index, "description", e.target.value)}
                />

                <JkInput
                    user={user}
                    label="Technologies Used"
                    placeholderText="e.g., React, Node.js, TypeScript"
                    type="text"
                    className="w-full"
                    value={projects[index]?.technologies?.join(", ") || ""}
                    onChange={(e) => onChange && onChange(index, "technologies", e.target.value.split(", "))}
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
                        onChange={(e) =>
                            onChange &&
                            onChange(
                                index,
                                "details",
                                projects[index].details.map((d, i) =>
                                    i === detailIndex ? e.target.value : d
                                )
                            )
                        }
                    />
                ))}

                <button
                    onClick={() =>
                        onChange &&
                        onChange(index, "details", [...(projects[index].details || []), ""])
                    }
                    className="w-full p-4 rounded-xl border border-dashed flex items-center justify-center gap-3 transition-all duration-300 hover:border-solid hover:bg-white/5 hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                        borderColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                        color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                    }}
                >
                    <Plus className="h-[14px] w-[14px]" />
                    <span>Add Detail</span>
                </button>
            </span>
        );

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
                            <span className="flex flex-col gap-5">
                                <ProjectForm index={index} />
                                <span className="flex items-center justify-end gap-3">
                                    <button
                                        onClick={() => handleDeleteProject(index)}
                                        className="p-2 rounded-lg hover:bg-white/5"
                                        style={{ color: styles.text.error }}
                                    >
                                        <Trash className="h-[14px] w-[14px]" />
                                    </button>
                                    <button
                                        onClick={handleLooksGoodProject}
                                        className="p-2 rounded-lg hover:bg-white/5"
                                        style={{ color: styles.text.success }}
                                    >
                                        <Check className="h-[14px] w-[14px]" />
                                    </button>
                                </span>
                            </span>
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
                                    onClick={() => handleUpdateProject(index)}
                                    className="p-2 rounded-lg hover:bg-white/5"
                                    style={{ color: styles.text.primary }}
                                >
                                    <Pencil className="h-[14px] w-[14px]" />
                                </button>
                            </span>
                        )}
                    </div>
                ))}

                <button
                    onClick={handleAddProject}
                    className="w-full p-4 rounded-xl border border-dashed flex items-center justify-center gap-3 transition-all duration-300 hover:border-solid hover:bg-white/5 hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                        borderColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                        color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                    }}
                >
                    <Plus className="h-[14px] w-[14px]" />
                    <span>Add Project</span>
                </button>
            </div>
        );
    }
);