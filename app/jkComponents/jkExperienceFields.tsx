'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { Check, Pencil, Plus, Trash } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { JkInput } from "./jkInput";
import { useJobKompassResume } from "../helpers/providers/JobKompassResumeProvider";

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
    onSave?: (index: number, experienceData: any) => void;
    onDelete?: (index: number) => void;
}

export const JkExperienceFields = memo(
    ({
        user,
        experience,
        onCreate,
        onSave,
        onDelete,
    }: JkExperienceFieldsProps) => {
        const [experienceNumber, setExperienceNumber] = useState(-1);
        const [isAddingNew, setIsAddingNew] = useState(false);
        const [isEditingExisting, setIsEditingExisting] = useState(false);
        const { styles } = useJobKompassTheme();
        const { sectionImCurrentlyEditingRef, setSectionImCurrentlyEditingRef } = useJobKompassResume();

        const handleStartUpdatingSelectedExperience = (index: number) => {
            setIsEditingExisting(true);
            setExperienceNumber(index);
            setTitle(experience[index].title);
            setCompany(experience[index].company);
            setLocation(experience[index].location);
            setDate(experience[index].date);
            setDescription(experience[index].description);
            const detailsArray = experience[index].details || [];
            setDetails([...detailsArray] as any);
        };

        const handleLooksGoodExperience = () => {
            setIsAddingNew(false);
            setIsEditingExisting(false);
            setExperienceNumber(-1);
        };

        const handleDeleteExperience = (index: number) => {
            onDelete && onDelete(index);
            setExperienceNumber(-1);
            setIsAddingNew(false);
        };

        const [title, setTitle] = useState("");
        const [company, setCompany] = useState("");
        const [location, setLocation] = useState("");
        const [date, setDate] = useState("");
        const [description, setDescription] = useState("");
        const [details, setDetails] = useState([]);

        const handleSave = () => {
            const updatedExperience = {
                title,
                company,
                location,
                date,
                description,
                details
            };
            onSave && onSave(experienceNumber, updatedExperience);
            handleLooksGoodExperience();
        };

        const ExperienceForm = ({ index }: { index: number }) => {
            const [localTitle, setLocalTitle] = useState(title);
            const [localCompany, setLocalCompany] = useState(company);
            const [localLocation, setLocalLocation] = useState(location);
            const [localDate, setLocalDate] = useState(date);
            const [localDescription, setLocalDescription] = useState(description);
            const [localDetails, setLocalDetails] = useState(details);

            const handleFocus = (e: any) => {
                console.log("Focus event triggered for project:", index, e);
                setSectionImCurrentlyEditingRef(`experience-${index}`);
            };

            useEffect(() => {
                setLocalTitle(title);
                setLocalCompany(company);
                setLocalLocation(location);
                setLocalDate(date);
                setLocalDescription(description);
                setLocalDetails(details);
            }, [title, company, location, date, description, details]);

            return (
                <span className="flex flex-col h-max  gap-5">
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
                        <JkInput
                            key={detailIndex}
                            user={user}
                            label={`Achievement ${detailIndex + 1}`}
                            placeholderText="Add Achievement"
                            type="text"
                            className="w-full"
                            value={detail}
                            onChange={(e) => {
                                const newDetails = [...localDetails];
                                (newDetails as any)[detailIndex] = e.target.value;
                                setLocalDetails(newDetails);
                            }}
                            onMouseEnter={handleFocus}
                            fieldImIn="Experience"
                        />
                    ))}
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
                                                className="p-1 outline-none border-none rounded-full transition-all duration-300 hover:bg-white/10"
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
                    onClick={() => {
                        setIsAddingNew(true);
                        setExperienceNumber(experience.length);
                        setTitle("");
                        setCompany("");
                        setLocation("");
                        setDate("");
                        setDescription("");
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
                    <span>Add Experience</span>
                </button>

            </div>
        );
    }
);