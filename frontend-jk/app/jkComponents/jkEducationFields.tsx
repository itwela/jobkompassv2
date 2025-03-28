'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { Check, Pencil, Plus, Trash } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { JkInput } from "./jkInput";
import { useJobKompassResume } from "../helpers/providers/JobKompassResumeProvider";
import { JkTextArea } from "./jkTextArea";

export interface JkEducationFieldsProps {
    user: any;
    education: Array<{
        name: string;
        school: string;
        startDate: string;
        endDate: string;
        degree: string;
        field: string;
        date: string;
        details: string[];
        description: string;
        technologies: string[];
    }>;
}

export const JkEducationFields = memo(
    ({
        user,
        education,
    }: JkEducationFieldsProps) => {
        const [educationNumber, setEducationNumber] = useState(-1);
        const [isAddingNew, setIsAddingNew] = useState(false);
        const [isEditingExisting, setIsEditingExisting] = useState(false);
        const { styles } = useJobKompassTheme();
        const { handleCreateNewComplexField, handleSaveComplexFields, handleDeleteComplexField, sectionImCurrentlyEditingRef, setSectionImCurrentlyEditingRef, currentThemeName } = useJobKompassResume();

        const educationFormRef = useRef<() => any>(null); // Ref to get ProjectForm state

        const handleStartUpdatingSelectedEducation = (index: number) => {
            setIsEditingExisting(true);
            setEducationNumber(index);
        };

        const handleSave = () => {
            if (educationFormRef.current) {
                const educationData = educationFormRef.current();
                console.log("Saving project data:", educationNumber, educationData); // Debug
                handleSaveComplexFields(currentThemeName, educationNumber, educationData, "Education");
            }
            setIsAddingNew(false);
            setIsEditingExisting(false);
            setEducationNumber(-1);
        };


        const EducationForm = ({ index }: { index: number }) => {

            const [localName, setLocalName] = useState(education[index]?.name || "");
            const [localSchool, setLocalSchool] = useState(education[index]?.school || "");
            const [localStartDate, setLocalStartDate] = useState(education[index]?.startDate || "");
            const [localEndDate, setLocalEndDate] = useState(education[index]?.endDate || "");
            const [localDegree, setLocalDegree] = useState(education[index]?.degree || "");
            const [localField, setLocalField] = useState(education[index]?.field || "");
            const [localDate, setLocalDate] = useState(education[index]?.date || "");
            const [localDetails, setLocalDetails] = useState(education[index]?.details || "");
            const [localDescription, setLocalDescription] = useState(education[index]?.description || "");
            const [localTechnologies, setLocalTechnologies] = useState(education[index]?.technologies || "");

            const handleFocus = (e: any) => {
                console.log("Focus event triggered for project:", index, e);
                setSectionImCurrentlyEditingRef(`education-${index}`);
            };

            const setALlFeildsWIthDebugData = () => {
                setLocalName("Computer Science");
                setLocalSchool("University of California, Berkeley");
                setLocalStartDate("January 2023");
                setLocalEndDate("December 2023");
                setLocalDegree("Bachelor of Science");
                setLocalField("Computer Science");
                setLocalDate("December 2023");
                setLocalDetails(["Computer Science", "Computer Science", "Computer Science"]);
                setLocalDescription("Computer Science");
                setLocalTechnologies(["Computer Science", "Computer Science", "Computer Science"]);
            };

            // Update the ref with a function to get current state
            useEffect(() => {
                educationFormRef.current = () => ({
                    name: localName,
                    school: localSchool,
                    startDate: localStartDate,
                    endDate: localEndDate,
                    degree: localDegree,
                    field: localField,
                    date: localDate,
                    details: localDetails,
                    description: localDescription,
                    technologies: localTechnologies,
                });
            }, [localName, localSchool, localStartDate, localEndDate, localDegree, localField, localDate, localDetails, localDescription, localTechnologies]);

            return (
                <span className="flex flex-col gap-5">

                    <span onClick={setALlFeildsWIthDebugData}>debug</span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <JkInput
                            user={user}
                            label="School Name"
                            placeholderText="Add Your School"
                            type="text"
                            className="w-full"
                            value={localName}
                            onChange={(e) => setLocalName(e.target.value)}
                            onMouseEnter={handleFocus}
                            fieldImIn="Education"
                        />
                        <JkInput
                            user={user}
                            label="School"
                            placeholderText="Add School Name"
                            type="text"
                            className="w-full"
                            value={localSchool}
                            onChange={(e) => setLocalSchool(e.target.value)}
                            onMouseEnter={handleFocus}
                            fieldImIn="Education"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <JkInput
                            user={user}
                            label="Degree"
                            placeholderText="Add Your Degree"
                            type="text"
                            className="w-full"
                            value={localDegree}
                            onChange={(e) => setLocalDegree(e.target.value)}
                            onMouseEnter={handleFocus}
                            fieldImIn="Education"
                        />
                        <JkInput
                            user={user}
                            label="Date"
                            placeholderText="e.g., December 2023"
                            type="text"
                            className="w-full"
                            value={localDate}
                            onChange={(e) => setLocalDate(e.target.value)}
                            onMouseEnter={handleFocus}
                            fieldImIn="Education"
                        />
                    </div>

                    {localDetails.map((detail, detailIndex) => (
                            <JkTextArea
                                key={detailIndex}
                                user={user}
                                label={`Detail ${detailIndex + 1}`}
                                placeholderText="Add Detail"
                                type="text"
                                className="w-full"
                                value={detail}
                                onChange={(e) => {
                                    const newDetails = [...localDetails];
                                    (newDetails as any)[detailIndex] = e.target.value;
                                    setLocalDetails(newDetails);
                                }}
                                onDelete={() => {
                                    const newDetails = [...localDetails];
                                    newDetails.splice(detailIndex, 1);
                                    setLocalDetails(newDetails);
                                }}                   
                                fieldImIn="Education"
                            />
                    ))}

                    <button
                        onClick={() => {
                            const newDetails = [...localDetails];
                            newDetails.push("");
                            setLocalDetails(newDetails);
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
                            <div className="flex gap-2 w-[200px] s:w-[300px] h-[100px] sm:h-[150px]">
                                {education.map((edu, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col justify-between overflow-hidden w-[200px] s: w-[300px] h-[100px] sm:h-[150px] items-start p-2 rounded-md transition-all duration-300 hover:scale-[1.02]"
                                        style={{
                                            backgroundColor: `${styles.card.background}90`,
                                            backdropFilter: 'blur(8px)',
                                            border: styles.card.border
                                        }}
                                    >
                                        <span className="w-full flex justify-end p-1 gap-1">

                                            <button
                                                className="p-1 outline-none border-none rounded-full transition-all duration-300 hover:bg-white/10"
                                                onClick={() => handleStartUpdatingSelectedEducation(index)}
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                className="p-1 outline-none border-none rounded-full transition-all duration-300 hover:bg-white/10"
                                                onClick={() => handleDeleteComplexField(currentThemeName, index, "Education")}
                                            >
                                                <Trash size={15} />
                                            </button>
                                        </span>
                                        <span className="flex flex-col w-full h-max">
                                            <p className="font-medium">{edu.name || "Add Education"}</p>
                                            <p className="truncate line-clamp-1 overflow-hidden w-full">{edu.school || "Add Your School"}</p>
                                            <p className="opacity-50">{edu.date?.replace(/\D/g, '') || "Add Grad Date"}</p>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}


                {(isAddingNew || isEditingExisting) && (
                    <>
                        <span
                            style={{
                                backgroundColor: styles.nav.colors.careerAssistant,
                                color: '#ffffff'
                            }} className="flex sticky top-0 mb-4 items-center justify-between gap-2 py-2 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                            <span className="font-bold w-[70%]">
                                Editing: {education[educationNumber]?.name || "New Education"}
                            </span>
                            <span className="p-2 cursor-pointer" onClick={handleSave}                            >
                                Save?
                            </span>
                        </span>
                        <EducationForm index={educationNumber} />


                    </>
                )}

                <button
                    onClick={() => handleCreateNewComplexField(currentThemeName, "Education")}
                    className="w-full p-4 rounded-xl border border-dashed flex items-center justify-center gap-3 transition-all duration-300 hover:border-solid hover:bg-white/5 hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                        borderColor: styles.card.border,
                        color: styles.text.primary,
                    }}
                >
                    <Plus className="h-[14px] w-[14px]" />
                    <span>Add Education</span>
                </button>
            </div>
        );
    }
);