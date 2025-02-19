'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { Check, Pencil, Plus, Trash } from "lucide-react";
import { memo, useState } from "react";
import { JkInput } from "./jkInput";

export interface JkExperienceFieldsProps {
    user: any;
    experience: Array<{
        title: string;
        company: string;
        location: string;
        date: string;
        description: string;
        details: string[];
    }>;
    onCreate?: () => void;
    onChange?: (index: number, field: string, value: any) => void;
    onDelete?: (index: number) => void;
}

export const JkExperienceFields = memo(
    ({
        user,
        experience,
        onCreate,
        onChange,
        onDelete,
    }: JkExperienceFieldsProps) => {
        const [experienceNumber, setExperienceNumber] = useState(-1);
        const [isAddingNew, setIsAddingNew] = useState(false);
        const [isEditingExisting, setIsEditingExisting] = useState(false);
        const { styles } = useJobKompassTheme();

        const experienceCount = experience?.length;

        const handleAddExperience = () => {
            setIsAddingNew(true);
            onCreate && onCreate();
            setExperienceNumber(experienceCount);
        };

        const handleUpdateExperience = (index: number) => {
            setIsEditingExisting(true);
            setExperienceNumber(index);
        };

        const handleLooksGoodExperience = () => {
            setIsAddingNew(false);
            setExperienceNumber(-1);
        };

        const handleDeleteExperience = (index: number) => {
            onDelete && onDelete(index);
            setExperienceNumber(-1);
            setIsAddingNew(false);
        };

        const ExperienceForm = ({ index }: { index: number }) => (
            <span className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <JkInput
                        user={user}
                        label="Title"
                        placeholderText="Add Your Job Title"
                        type="text"
                        className="w-full"
                        value={experience[index]?.title || ""}
                        onChange={(e) => onChange && onChange(index, "title", e.target.value)}
                    />
                    <JkInput
                        user={user}
                        label="Company"
                        placeholderText="Add Company Name"
                        type="text"
                        className="w-full"
                        value={experience[index]?.company || ""}
                        onChange={(e) => onChange && onChange(index, "company", e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <JkInput
                        user={user}
                        label="Location"
                        placeholderText="Add Location"
                        type="text"
                        className="w-full"
                        value={experience[index]?.location || ""}
                        onChange={(e) => onChange && onChange(index, "location", e.target.value)}
                    />
                    <JkInput
                        user={user}
                        label="Date"
                        placeholderText="e.g., Jan 2020 - Present"
                        type="text"
                        className="w-full"
                        value={experience[index]?.date || ""}
                        onChange={(e) => onChange && onChange(index, "date", e.target.value)}
                    />
                </div>

                <JkInput
                    user={user}
                    label="Description"
                    placeholderText="Add Job Description"
                    type="text"
                    className="w-full"
                    value={experience[index]?.description || ""}
                    onChange={(e) => onChange && onChange(index, "description", e.target.value)}
                />

                {experience[index]?.details.map((detail, detailIndex) => (
                    <JkInput
                        key={detailIndex}
                        user={user}
                        label={`Achievement ${detailIndex + 1}`}
                        placeholderText="Add Achievement"
                        type="text"
                        className="w-full"
                        value={detail}
                        onChange={(e) => onChange && onChange(index, "details", e.target.value)}
                    />
                ))}
            </span>
        );

        return (
            <div className="w-full border-t border-opacity-10 pt-4 flex flex-col gap-5"
                style={{ borderColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor }}
            >
                {experience?.length > 0 && (
                    <>
                        <div className="flex gap-5 justify-between w-full items-center">
                            <h2 className="text-lg font-bold"
                                style={{ color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor }}
                            >
                                Professional Experience
                            </h2>
                        </div>

                        <div className="w-full overflow-x-auto no-scrollbar">
                            <div className="flex gap-2 w-max">
                                {experience.map((exp, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col w-[250px] p-3 rounded-md transition-all duration-300 hover:scale-[1.02]"
                                        style={{
                                            backgroundColor: `${styles.card.background}90`,
                                            backdropFilter: 'blur(8px)',
                                            border: styles.card.border
                                        }}
                                    >
                                        <span className="w-full flex justify-end gap-1 mb-2">
                                            <button
                                                className="p-1 rounded-full transition-all duration-300 hover:bg-white/10"
                                                onClick={() => handleUpdateExperience(index)}
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                className="p-1 rounded-full transition-all duration-300 hover:bg-white/10"
                                                onClick={() => handleDeleteExperience(index)}
                                            >
                                                <Trash size={15} />
                                            </button>
                                        </span>
                                        <p className="font-medium">{exp.title || "Add Job Title"}</p>
                                        <p className="text-sm opacity-70">{exp.company || "Add Company"}</p>
                                        <p className="text-sm opacity-50">{exp.date || "Add Date Range"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                <button
                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                        backgroundColor: styles.nav.colors.careerAssistant,
                        color: '#ffffff'
                    }}
                    onClick={() => isAddingNew ? handleLooksGoodExperience() : handleAddExperience()}
                >
                    <span>
                        {isAddingNew || (isEditingExisting && experience[experienceNumber]?.title?.length > 0) ? (
                            <Check size={15} />
                        ) : (
                            <Plus size={15} />
                        )}
                    </span>
                    <span className="font-bold">
                        {isAddingNew || isEditingExisting ? 'Save Experience Entry' : 'Add Professional Experience'}
                    </span>
                </button>

                {(isAddingNew || isEditingExisting) && (
                    <ExperienceForm index={experienceNumber} />
                )}
            </div>
        );
    }
);