'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { Check, Pencil, Plus, Trash } from "lucide-react";
import { memo, useState } from "react";
import { JkInput } from "./jkInput";

export interface JkEducationFieldsProps {
    user: any;
    education: Array<{
        school: string;
        degree: string;
        date: string;
        details: string[];
    }>;
    onCreate?: () => void;
    onChange?: (index: number, field: string, value: any) => void;
    onDelete?: (index: number) => void;
}

export const JkEducationFields = memo(
    ({
        user,
        education,
        onCreate,
        onChange,
        onDelete,
    }: JkEducationFieldsProps) => {
        const [educationNumber, setEducationNumber] = useState(-1);
        const [isAddingNew, setIsAddingNew] = useState(false);
        const [isEditingExisting, setIsEditingExisting] = useState(false);
        const { styles } = useJobKompassTheme();

        const educationCount = education?.length;

        const handleAddEducation = () => {
            setIsAddingNew(true);
            onCreate && onCreate();
            setEducationNumber(educationCount);
        };

        const handleUpdateEducation = (index: number) => {
            setIsEditingExisting(true);
            setEducationNumber(index);
        };

        const handleLooksGoodEducation = () => {
            setIsAddingNew(false);
            setEducationNumber(-1);
        };

        const handleDeleteEducation = (index: number) => {
            onDelete && onDelete(index);
            setEducationNumber(-1);
            setIsAddingNew(false);
        };

        const EducationForm = ({ index }: { index: number }) => (
            <span className="flex flex-col gap-5">
                <JkInput
                    user={user}
                    label="School"
                    placeholderText="Add Your School"
                    type="text"
                    className="w-full"
                    value={education[index]?.school || ""}
                    onChange={(e) => onChange && onChange(index, "school", e.target.value)}
                />

                <span className="flex relative gap-5 w-full">
                    <JkInput
                        user={user}
                        label="Degree"
                        placeholderText="Add Your Degree"
                        type="text"
                        className="w-full"
                        value={education[index]?.degree || ""}
                        onChange={(e) => onChange && onChange(index, "degree", e.target.value)}
                    />

                    <JkInput
                        user={user}
                        label="Date"
                        placeholderText="e.g., December 2023"
                        type="text"
                        className="w-full"
                        value={education[index]?.date || ""}
                        onChange={(e) => onChange && onChange(index, "date", e.target.value)}
                    />
                </span>

                {education[index]?.details.map((detail, detailIndex) => (
                    <JkInput
                        key={detailIndex}
                        user={user}
                        label={`Detail ${detailIndex + 1}`}
                        placeholderText="Add Detail"
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
                {education?.length > 0 && (
                    <>
                        <div className="flex gap-5 justify-between w-full items-center">
                            <h2 className="text-lg font-bold"
                                style={{ color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor }}
                            >
                                Educational History
                            </h2>
                        </div>

                        <div className="w-full overflow-x-auto no-scrollbar">
                            <div className="flex gap-2 w-max h-[100px]">
                                {education.map((edu, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col w-[200px] h-[100px] items-start p-2 rounded-md transition-all duration-300 hover:scale-[1.02]"
                                        style={{
                                            backgroundColor: `${styles.card.background}90`,
                                            backdropFilter: 'blur(8px)',
                                            border: styles.card.border
                                        }}
                                    >
                                        <span className="w-full flex justify-end p-1 gap-1">
                                            <button
                                                className="p-1 rounded-full transition-all duration-300 hover:bg-white/10"
                                                onClick={() => handleUpdateEducation(index)}
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                className="p-1 rounded-full transition-all duration-300 hover:bg-white/10"
                                                onClick={() => handleDeleteEducation(index)}
                                            >
                                                <Trash size={15} />
                                            </button>
                                        </span>
                                        <p className="truncate w-full break-words">{edu.school || "Add Your School"}</p>
                                        <p className="opacity-50">{edu.date || "Add Grad Date"}</p>
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
                    onClick={() => isAddingNew ? handleLooksGoodEducation() : handleAddEducation()}
                >
                    <span>
                        {isAddingNew || (isEditingExisting && education[educationNumber]?.school?.length > 0) ? (
                            <Check size={15} />
                        ) : (
                            <Plus size={15} />
                        )}
                    </span>
                    <span className="font-bold">
                        {isAddingNew || isEditingExisting ? 'Save Education Entry' : 'Add Education History'}
                    </span>
                </button>

                {(isAddingNew || isEditingExisting) && (
                    <EducationForm index={educationNumber} />
                )}
            </div>
        );
    }
);