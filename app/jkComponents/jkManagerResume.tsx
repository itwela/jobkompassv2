'use client';

import React from 'react';
import { TechBroProps } from '../dashboard/careerassistant/components/resume/resumeTemplates';

interface ManagerResumeProps {
    data: TechBroProps;
    currentTheme: {
        name: string;
        heading: string;
        subheading: string;
        body: string;
        bodySmall: string;
        spacing?: {
            section: string;
            item: string;
        };
    };
    registerContentRef?: (ref: HTMLDivElement | null) => void;
}

export const JkManagerResume: React.FC<ManagerResumeProps> = ({ data, currentTheme, registerContentRef }) => {
    return (
        <div className="resume-preview w-full h-full" ref={registerContentRef}>
            <div className="resume-content p-8">
                {/* Personal Info Section */}
                <div className="personal-info mb-8">
                    <h1 className={`${currentTheme.name} text-center`}>{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
                    <div className={`contact-info ${currentTheme.body} flex flex-wrap justify-center gap-4 mt-2`}>
                        <p>{data.personalInfo.email}</p>
                        <p>{data.personalInfo.phone}</p>
                        <p>{data.personalInfo.location}</p>
                        {data.personalInfo.website && <p>{data.personalInfo.website}</p>}
                    </div>
                </div>

                {/* Experience Section - Prioritized in Manager template */}
                <div className={`experience-section ${currentTheme.spacing?.section}`}>
                    <h2 className={`${currentTheme.heading} border-b-2 pb-2`}>Professional Experience</h2>
                    {data.experience.map((exp: any, index: number) => (
                        <div key={index} className={`${currentTheme.spacing?.item} mt-4`}>
                            <div className="flex justify-between items-baseline">
                                <h3 className={`${currentTheme.subheading} font-bold`}>{exp.title}</h3>
                                <p className={currentTheme.bodySmall}>{exp.date}</p>
                            </div>
                            <p className={`${currentTheme.bodySmall} font-semibold`}>{exp.company} - {exp.location}</p>
                            <p className={`${currentTheme.body} mt-2`}>{exp.description}</p>
                            <ul className={`${currentTheme.body} list-disc pl-4 space-y-2 mt-2`}>
                                {exp.details.map((detail: string, detailIndex: number) => (
                                    <li key={detailIndex}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Skills Section */}
                <div className={`skills-section ${currentTheme.spacing?.section} mt-6`}>
                    <h2 className={`${currentTheme.heading} border-b-2 pb-2`}>Core Competencies</h2>
                    <div className={`${currentTheme.spacing?.item} mt-4`}>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            <div>
                                <h3 className={`${currentTheme.subheading} font-semibold mb-2`}>Technical Expertise</h3>
                                <ul className={`${currentTheme.body} list-disc pl-4 space-y-1`}>
                                    {data.skills.technical.map((skill: string, index: number) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className={`${currentTheme.subheading} font-semibold mb-2`}>Management Skills</h3>
                                <ul className={`${currentTheme.body} list-disc pl-4 space-y-1`}>
                                    {data.skills.additional.map((skill: string, index: number) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Section */}
                <div className={`projects-section ${currentTheme.spacing?.section} mt-6`}>
                    <h2 className={`${currentTheme.heading} border-b-2 pb-2`}>Key Projects & Achievements</h2>
                    {data.projects.map((project: any, index: number) => (
                        <div key={index} className={`${currentTheme.spacing?.item} mt-4`}>
                            <div className="flex justify-between items-baseline">
                                <h3 className={`${currentTheme.subheading} font-bold`}>{project.name}</h3>
                                {project.achievement && (
                                    <p className={`${currentTheme.body} font-semibold`}>{project.achievement}</p>
                                )}
                            </div>
                            <p className={`${currentTheme.body} mt-2`}>{project.description}</p>
                            {project.technologies && project.technologies.length > 0 && (
                                <p className={`${currentTheme.bodySmall} mt-1 italic`}>
                                    Technologies: {project.technologies.join(', ')}
                                </p>
                            )}
                            <ul className={`${currentTheme.body} list-disc pl-4 space-y-1 mt-2`}>
                                {project.details.map((detail: string, detailIndex: number) => (
                                    <li key={detailIndex}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Education Section */}
                <div className={`education-section ${currentTheme.spacing?.section} mt-6`}>
                    <h2 className={`${currentTheme.heading} border-b-2 pb-2`}>Education</h2>
                    {data.education.map((edu: any, index: number) => (
                        <div key={index} className={`${currentTheme.spacing?.item} mt-4`}>
                            <div className="flex justify-between items-baseline">
                                <h3 className={`${currentTheme.subheading} font-bold`}>{edu.name}</h3>
                                <p className={currentTheme.bodySmall}>{edu.date}</p>
                            </div>
                            <p className={`${currentTheme.body} font-semibold`}>{edu.degree}</p>
                            <ul className={`${currentTheme.body} list-disc pl-4 space-y-1 mt-2`}>
                                {edu.details.map((detail: string, detailIndex: number) => (
                                    <li key={detailIndex}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};