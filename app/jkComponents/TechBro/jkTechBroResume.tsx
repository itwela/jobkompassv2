'use client'

import React, { useEffect, useRef, useState } from 'react';
import { TechBroProps } from './types';
import { useJobKompassResume } from '@/app/helpers/providers/JobKompassResumeProvider';

export default function TechBroResume({ data, theme, registerContentRef, scale, zoom }: TechBroProps) {

    const {sectionImCurrentlyEditingRef, setSectionImCurrentlyEditingRef} = useJobKompassResume()

    return (
        <div
            style={{
                zoom: 1,
                transform: `scale(${scale || 1})`,
                transformOrigin: 'top center',
            }}
            className={`${theme.container} !leading-none text-black [&_*]:text-black [&_li]:marker:text-black max-w-[1200px]`}ref={registerContentRef}>
            <div>
                <div>
                    <div className={theme.header?.wrapper}>
                        {/* NOTE NAME */}
                        <span id="name-resume" className={theme.header?.nameSection}>
                            <p className={theme.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</p>
                            {data.personalInfo.website && <p className={theme.bodySmall} key="website">{data.personalInfo.website}</p>}
                        </span>

                        {/* NOTE CONTACT */}
                        <span id='citizenship-resume' className={theme.header?.contactSection}>
                            <span className={theme.header?.contactColumn}>
                                <p className={theme.bodySmall}>{data.personalInfo.citizenship}</p>
                                <p className={theme.bodySmall} key="location">{data.personalInfo.location}</p>
                            </span>


                            <span className={theme.header?.contactColumn}>
                                <p className={theme.bodySmall} key="phone">{data.personalInfo.phone}</p>
                                <p className={theme.bodySmall} key="email">{data.personalInfo.email}</p>
                            </span>
                        </span>

                    </div>
                </div>

                <span className="block h-[10px]"></span>
                {/* NOTE EDUCATION */}
                <div className={theme.spacing?.section}>
                    <h2 className={theme.sectionHeading}>Education</h2>
                    {data.education.map((edu, index) => (
                        <div id={`education-${index}`} key={`edu-${index}`} className={theme.spacing?.item}>
                            <div className="flex justify-between items-baseline">
                                <div className="flex gap-1 w-[50%] flex-wrap items-baseline">
                                    <h3 className={theme.subheading}>{edu.name}</h3>
                                    <span className={theme.bodySmall}>– {edu.degree}</span>
                                </div>
                                <span className={`${theme.bodySmall} italic`}>{edu.date}</span>
                            </div>
                            <ul className={`${theme.education?.details} !list-disc`}>
                                {edu.details.map((detail, detailIndex) => (
                                    <li key={`edu-detail-${index}-${detailIndex}`} className={`${theme.bodySmall} ${theme.education?.detailItem} flex gap-2 place-items-start`}> 
                                        <span className="font-bold">
                                        ✨
                                        </span>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* NOTE EXPERIENCE */}
                <div className={theme.spacing?.section}>
                    <h2 className={theme.sectionHeading}>Experience</h2>
                    {data.experience.map((exp, index) => (
                        <div key={`exp-${index}`} className={theme.spacing?.item}>
                            <div className="flex justify-between items-baseline">
                                <div className="flex gap-1 w-[50%] flex-wrap items-baseline">
                                    <h3 className={theme.subheading}>{exp.title}</h3>
                                    <span className={`${theme.bodySmall} `}>– {exp.company}, {exp.location}</span>
                                </div>
                                <span className={`${theme.bodySmall} italic`}>{exp.date}</span>
                            </div>
                            {/* TODO */}
                            <p className={theme.body}>{exp.description}</p>
                            <ul id={`experience-${index}`} className={theme.experience?.details}>
                                {exp.details.map((detail, detailIndex) => (
                                    <li key={detailIndex} className={`${theme.bodySmall} ${theme.experience?.detailItem} !list-disc`}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Projects Section */}
                <div className={theme.spacing?.section}>
                    <h2 className={theme.sectionHeading}>Projects</h2>
                    {data.projects.map((project, index) => (
                        <div key={index}  
                            id={`project-${index}`}
                            className={theme.spacing?.item}>
                            <div className="flex justify-between items-baseline">
                                <div className="flex items-baseline">
                                    <h3 className={theme.subheading}>{project.name}</h3>
                                    {project.link && <span className={theme.bodySmall}>– {project.link}</span>}
                                </div>
                                {project.date && <span className={`${theme.bodySmall} italic`}>{project.date}</span>}
                            </div>
                            {project.achievement && (
                                <p className={`${theme.bodySmall} ${theme.projects?.detailItem}`}>{project.achievement}</p>
                            )}
                            <p className={theme.body}>{project.description}</p>
                            {project.technologies && project.technologies.length > 0 && (
                                <p className={theme.bodySmall}>Technologies: {project.technologies.join(', ')}</p>
                            )}
                            <ul className={theme.projects?.details}>
                                {project.details.map((detail, detailIndex) => (
                                    <li key={detailIndex} className={`${theme.bodySmall} ${theme.projects?.detailItem}`}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Skills Section */}
                <div className={theme.spacing?.section}>
                    <h2 className={theme.sectionHeading}>Skills</h2>
                    <div className={theme.skills?.wrapper}>
                        <div className={`${theme.spacing?.item} ${theme.skills?.section}`}>
                            <h3 id='skills-resume' className={theme.subheading}>Technical Skills</h3>
                            <div className={theme.skills?.list}>
                                {data.skills.technical.map((skill, index) => (
                                    <span
                                        key={index}
                                        className={`${theme.bodySmall} ${theme.skills?.item}`}
                                    >{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className={`${theme.spacing?.item} ${theme.skills?.section}`}>
                            <h3 id='skills-resume' className={theme.subheading}>Additional Skills</h3>
                            <div className={theme.skills?.list}>
                                {data.skills.additional.map((skill, index) => (
                                    <span
                                        key={index}
                                        id={`additional-skills-${index}`}
                                        className={`${theme.bodySmall} ${theme.skills?.item}`}
                                    >{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}