'use client';

import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import React from "react";
import { useEffect, useState } from "react";

interface ResumeHTMLProps {
    currentTheme: any;
    styles: any
    data: any;
}

export default function ResumeHTML({ currentTheme, styles, data }: ResumeHTMLProps) {
    const { user } = useJobKompassUser();
    const { registerContentRef } = useJobKompassResume();
    const [isReady, setIsReady] = useState(false);

    if (!isReady) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p>Loading resume content...</p>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="resume-preview w-full h-full" ref={registerContentRef}>
                <div className="resume-content p-8">
                    {/* Personal Info Section */}
                    <div className="personal-info mb-6">
                        <h1 className={currentTheme.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
                        <div className={`contact-info ${currentTheme.body} grid grid-cols-2 gap-2`}>
                            <p>{data.personalInfo.email}</p>
                            <p>{data.personalInfo.phone}</p>
                            <p>{data.personalInfo.location}</p>
                            {data.personalInfo.website && <p>{data.personalInfo.website}</p>}
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className={`skills-section ${currentTheme.spacing?.section}`}>
                        <h2 className={currentTheme.heading}>Skills</h2>
                        <div className={currentTheme.spacing?.item}>
                            <h3 className={currentTheme.subheading}>Technical Skills</h3>
                            <ul className={`${currentTheme.body} grid grid-cols-3 gap-2`}>
                                {data.skills.technical.map((skill: string, index: number) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={currentTheme.spacing?.item}>
                            <h3 className={currentTheme.subheading}>Additional Skills</h3>
                            <ul className={`${currentTheme.body} grid grid-cols-3 gap-2`}>
                                {data.skills.additional.map((skill: string, index: number) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className={`experience-section ${currentTheme.spacing?.section}`}>
                        <h2 className={currentTheme.heading}>Experience</h2>
                        {data.experience.map((exp: any, index: number) => (
                            <div key={index} className={currentTheme.spacing?.item}>
                                <h3 className={currentTheme.subheading}>{exp.title}</h3>
                                <p className={currentTheme.bodySmall}>{exp.company} - {exp.location}</p>
                                <p className={currentTheme.bodySmall}>{exp.date}</p>
                                <p className={currentTheme.body}>{exp.description}</p>
                                <ul className={`${currentTheme.body} list-disc pl-4 space-y-1`}>
                                    {exp.details.map((detail: string, detailIndex: number) => (
                                        <li key={detailIndex}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Projects Section */}
                    <div className={`projects-section ${currentTheme.spacing?.section}`}>
                        <h2 className={currentTheme.heading}>Projects</h2>
                        {data.projects.map((project: any, index: number) => (
                            <div key={index} className={currentTheme.spacing?.item}>
                                <h3 className={currentTheme.subheading}>{project.name}</h3>
                                {project.achievement && (
                                    <p className={`${currentTheme.body} font-semibold`}>{project.achievement}</p>
                                )}
                                <p className={currentTheme.body}>{project.description}</p>
                                {project.link && (
                                    <p className={currentTheme.bodySmall}>Link: {project.link}</p>
                                )}
                                {project.technologies && project.technologies.length > 0 && (
                                    <p className={currentTheme.bodySmall}>
                                        Technologies: {project.technologies.join(', ')}
                                    </p>
                                )}
                                <ul className={`${currentTheme.body} list-disc pl-4 space-y-1`}>
                                    {project.details.map((detail: string, detailIndex: number) => (
                                        <li key={detailIndex}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Education Section */}
                    <div className={`education-section ${currentTheme.spacing?.section}`}>
                        <h2 className={currentTheme.heading}>Education</h2>
                        {data.education.map((edu: any, index: number) => (
                            <div key={index} className={currentTheme.spacing?.item}>
                                <h3 className={currentTheme.subheading}>{edu.name}</h3>
                                <p className={currentTheme.body}>{edu.degree}</p>
                                <p className={currentTheme.bodySmall}>{edu.date}</p>
                                <ul className={`${currentTheme.body} list-disc pl-4 space-y-1`}>
                                    {edu.details.map((detail: string, detailIndex: number) => (
                                        <li key={detailIndex}>{detail}</li>
                                    ))} 
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}