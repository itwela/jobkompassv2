'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { Check, Pencil, Plus, Trash } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { JkInput } from "./jkInput";
import { useJobKompassResume } from "../helpers/providers/JobKompassResumeProvider";
import { JkTextArea } from "./jkTextArea";

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
}

export const JkExperienceFields = memo(
    ({
        user,
        experience,
    }: JkExperienceFieldsProps) => {
        const [experienceNumber, setExperienceNumber] = useState(-1);
        const [isAddingNew, setIsAddingNew] = useState(false);
        const [isEditingExisting, setIsEditingExisting] = useState(false);
        const { styles } = useJobKompassTheme();
        const { handleCreateNewComplexField, handleSaveComplexFields, handleDeleteComplexField, sectionImCurrentlyEditingRef, setSectionImCurrentlyEditingRef, currentThemeName } = useJobKompassResume();

        const experienceFormRef = useRef<() => any>(null); // Ref to get experience state

        const handleStartUpdatingSelectedExperience = (index: number) => {
            setIsEditingExisting(true);
            setExperienceNumber(index);
        };

        const handleSave = () => {
            if (experienceFormRef.current) {
                const experienceData = experienceFormRef.current();
                console.log("Saving experience data:", experienceNumber, experienceData); // Debug
                handleSaveComplexFields(currentThemeName, experienceNumber, experienceData, "Experience");
            }
            setIsAddingNew(false);
            setIsEditingExisting(false);
            setExperienceNumber(-1);
        };

        const ExperienceForm = ({ index }: { index: number }) => {

            const [localTitle, setLocalTitle] = useState(experience[index]?.title || "");
            const [localCompany, setLocalCompany] = useState(experience[index]?.company || "");
            const [localLocation, setLocalLocation] = useState(experience[index]?.location || "");
            const [localDate, setLocalDate] = useState(experience[index]?.date || "");
            const [localDescription, setLocalDescription] = useState(experience[index]?.description || "");
            const [localDetails, setLocalDetails] = useState(experience[index]?.details || [""]);

            const handleFocus = (e: any) => {
                console.log("Focus event triggered for project:", index, e);
                setSectionImCurrentlyEditingRef(`experience-${index}`);
            };

            const setAllFieldsWithDebugData = () => {
                setLocalTitle("Software Engineer");
                setLocalCompany("Tech Corp");
                setLocalLocation("San Francisco, CA");
                setLocalDate("Jan 2020 - Present");
                setLocalDescription("Led development of core platform features");
                setLocalDetails([
                    "Increased system performance by 40%",
                    "Managed team of 5 developers",
                    "Implemented CI/CD pipeline"
                ]);
            };

            useEffect(() => {
                experienceFormRef.current = () => ({
                    title: localTitle,
                    company: localCompany,
                    location: localLocation,
                    date: localDate,
                    description: localDescription,
                    details: localDetails,
                });
            }, [localTitle, localCompany, localLocation, localDate, localDescription, localDetails]);

            return (
                <span className="flex flex-col h-max  gap-5">

                    <span onClick={setAllFieldsWithDebugData}>debug</span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <JkInput
                            user={user}
                            label="Title"
                            placeholderText="Add Your Job Title"
                            type="text"
                            className="w-full"
                            value={localTitle}
                            onChange={(e) => setLocalTitle(e.target.value)}
                            onMouseEnter={handleFocus}
                            fieldImIn="Experience"
                        />
                        <JkInput
                            user={user}
                            label="Company"
                            placeholderText="Add Company Name"
                            type="text"
                            className="w-full"
                            value={localCompany}
                            onChange={(e) => setLocalCompany(e.target.value)}
                            onMouseEnter={handleFocus}
                            fieldImIn="Experience"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <JkInput
                            user={user}
                            label="Location"
                            placeholderText="Add Location"
                            type="text"
                            className="w-full"
                            value={localLocation}
                            onChange={(e) => setLocalLocation(e.target.value)}
                            onMouseEnter={handleFocus}
                            fieldImIn="Experience"
                        />
                        <JkInput
                            user={user}
                            label="Date"
                            placeholderText="e.g., Jan 2020 - Present"
                            type="text"
                            className="w-full"
                            value={localDate}
                            onChange={(e) => setLocalDate(e.target.value)}
                            onMouseEnter={handleFocus}
                            fieldImIn="Experience"
                        />
                    </div>

                    <JkInput
                        user={user}
                        label="Description"
                        placeholderText="Add Job Description"
                        type="text"
                        className="w-full"
                        value={localDescription}
                        onChange={(e) => setLocalDescription(e.target.value)}
                        onMouseEnter={handleFocus}
                        fieldImIn="Experience"
                    />

                    {localDetails.map((detail, detailIndex) => (
                        <JkTextArea
                            key={detailIndex}
                            user={user}
                            label={`Detail ${detailIndex + 1}`}
                            placeholderText="Add Detail"
                            type="text"
                            className="w-full"
                            value={detail}
                            onChange={(e) => setLocalDetails((prevDetails) => {
                                const newDetails = [...prevDetails];
                                newDetails[detailIndex] = e.target.value;
                                return newDetails;
                            })}
                            onDelete={() => setLocalDetails((prevDetails) => {
                                const newDetails = [...prevDetails];
                                newDetails.splice(detailIndex, 1);
                                return newDetails;
                            })}
                            onMouseEnter={handleFocus}
                            fieldImIn="Experience"
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
            <div className="w-full h-max relative border-t border-opacity-10 pt-4 flex flex-col gap-5"
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
                                                className="p-1 outline-none border-none rounded-full transition-all duration-300 hover:bg-white/10"
                                                onClick={() => handleStartUpdatingSelectedExperience(index)}
                                            >
                                                <a href="#start-of-experience-form">
                                                    <Pencil size={15} />
                                                </a>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteComplexField(currentThemeName, index, "Experience")}
                                                className="p-2 outline-none border-none rounded-lg hover:bg-white/5"
                                                style={{ color: styles.text.primary }}
                                            >
                                                <a>
                                                    <Trash className="h-[14px] w-[14px]" />
                                                </a>
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



                {(isAddingNew || isEditingExisting) && (
                    <>
                        <span className="w-full relative h-max">

                            <span id="start-of-experience-form"></span>
                            <span
                                style={{
                                    backgroundColor: styles.nav.colors.careerAssistant,
                                    color: '#ffffff'
                                }} className="flex sticky top-0 mb-4 items-center justify-between gap-2 py-2 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                                <span className="font-bold">
                                    Editing: {experience[experienceNumber]?.title || "New Experience"}
                                </span>
                                <span className="p-2 cursor-pointer" onClick={handleSave}>
                                    Save?
                                </span>
                            </span>
                            <ExperienceForm index={experienceNumber} />
                        </span>
                    </>
                )}

                <button
                    onClick={() => handleCreateNewComplexField(currentThemeName, "Experience")}
                    className="w-full p-4 rounded-xl border border-dashed flex items-center justify-center gap-3 transition-all duration-300 hover:border-solid hover:bg-white/5 hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                        borderColor: styles.card.border,
                        color: styles.text.primary,
                    }}
                >
                    <Plus className="h-[14px] w-[14px]" />
                    <span>Add Experience</span>
                </button>

            </div>
        );
    }
);