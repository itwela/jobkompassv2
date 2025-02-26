'use client'

import React, { useEffect, useRef, useState } from 'react';
import { TechBroProps } from '../TechBro/types';
import { useJobKompassResume } from '@/app/helpers/providers/JobKompassResumeProvider';

export default function PromoResume({ theme, registerContentRef, scale, zoom }: any) {

    const dummyResumeData = {
        personalInfo: {
            firstName: "JobKompass",
            lastName: "",
            email: "support@jobkompass.ai",
            phone: "Available 24/7",
            location: "Your Career Journey",
            website: "myjobkompass.com",
            citizenship: "Global Platform",
            socials: [
                { type: "github", url: "github.com/jobkompass" },
                { type: "linkedin", url: "linkedin.com/company/jobkompass" }
            ]
        },
        summary: "Your intelligent career companion, revolutionizing how professionals manage their job search and career development journey.",
        skills: {
            technical: ["AI Resume Builder", "Smart Job Tracking", "Career Analytics", "Interview Prep", "Skill Assessment"],
            additional: ["24/7 Availability", "Personalized Guidance", "Real-time Updates", "Data-Driven Insights"]
        },
        education: [
            {
                name: "AI-Powered Resume Creation",
                school: "Resume Excellence",
                degree: "Professional Resume Builder",
                field: "Career Development",
                startDate: "Instant",
                endDate: "Ongoing",
                description: "Transform your experience into compelling resumes",
                technologies: ["AI Writing", "ATS Optimization", "Design Templates"],
                date: "Available Now",
                details: [
                    "10+ ATS-optimized resume templates",
                    "Real-time AI writing assistance",
                    "Automatic formatting and styling"
                ]
            }
        ],
        experience: [
            {
                title: "Smart Job Application Tracking",
                company: "Application Management",
                location: "All-in-One Platform",
                date: "24/7 Access",
                description: "Comprehensive job application management system",
                details: [
                    "Track all your job applications in one place",
                    "Automated status updates and reminders",
                    "Visual analytics and progress tracking",
                    "Custom pipeline management"
                ]
            }
        ],
        projects: [
            {
                name: "Career Development Suite",
                achievement: "All-in-One Solution",
                link: "features.jobkompass.ai",
                description: "Complete toolkit for career success",
                technologies: ["AI Technology", "Cloud Platform", "Real-time Analytics"],
                date: "Continuous Updates",
                details: [
                    "Interview preparation with AI feedback",
                    "Salary negotiation insights and tips",
                    "Industry-specific career roadmaps"
                ]
            }
        ],
        additionalInfo: {
            languages: ["Multiple Resume Versions", "Cover Letter Generator", "Thank You Note Templates"],
            certifications: [
                {
                    name: "Data Security Certified",
                    issuer: "Privacy Standards",
                    date: "Current"
                },
                {
                    name: "AI Ethics Compliance",
                    issuer: "Tech Standards",
                    date: "Current"
                }
            ],
            interests: [
                "Career Growth",
                "Professional Development",
                "Skill Enhancement",
                "Network Building"
            ],
            achievements: [
                "Thousands of Successful Job Placements",
                "Industry-Leading AI Technology",
                "Top-Rated User Experience"
            ],
            hobbies: [
                "Resume Optimization",
                "Career Planning",
                "Skills Development",
                "Job Market Analysis"
            ],
            references: [
                "Join thousands of satisfied users today!"
            ]
        }
    }

    const {sectionImCurrentlyEditingRef, setSectionImCurrentlyEditingRef} = useJobKompassResume()

    return (
        <div
            style={{
                zoom: 1,
                transform: `scale(${scale || 1})`,
                transformOrigin: 'top center',
            }}
            className={`${theme.container} !leading-none z-[2] relative text-black [&_*]:text-black [&_li]:marker:text-black`}ref={registerContentRef}>
            <div>
                <div>
                    <div className={theme.header?.wrapper}>
                        {/* NOTE NAME */}
                        <span id="name-resume" className={theme.header?.nameSection}>
                            <p className={theme.name}>{dummyResumeData.personalInfo.firstName} {dummyResumeData.personalInfo.lastName}</p>
                            {dummyResumeData.personalInfo.website && <p className={theme.bodySmall} key="website">{dummyResumeData.personalInfo.website}</p>}
                        </span>

                        {/* NOTE CONTACT */}
                        <span id='citizenship-resume' className={theme.header?.contactSection}>
                            <span className={theme.header?.contactColumn}>
                                <p className={theme.bodySmall}>{dummyResumeData.personalInfo.citizenship}</p>
                                <p className={theme.bodySmall} key="location">{dummyResumeData.personalInfo.location}</p>
                            </span>


                            <span className={theme.header?.contactColumn}>
                                <p className={theme.bodySmall} key="phone">{dummyResumeData.personalInfo.phone}</p>
                                <p className={theme.bodySmall} key="email">{dummyResumeData.personalInfo.email}</p>
                            </span>
                        </span>

                    </div>
                </div>

                <span className="block h-[10px]"></span>
                {/* NOTE EDUCATION */}
                <div className={theme.spacing?.section}>
                    <h2 className={theme.sectionHeading}>Core Features</h2>
                    {dummyResumeData.education.map((edu, index) => (
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
                    <h2 className={theme.sectionHeading}>Key Benefits</h2>
                    {dummyResumeData.experience.map((exp, index) => (
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
                                    <li key={detailIndex} className={`${theme.bodySmall} ${theme.experience?.detailItem} flex gap-2 place-items-start`}>
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

                {/* Projects Section */}
                <div className={theme.spacing?.section}>
                    <h2 className={theme.sectionHeading}>Product Solutions</h2>
                    {dummyResumeData.projects.map((project, index) => (
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
                                <p className={`${theme.bodySmall} ${theme.projects?.detailItem} `}>{project.achievement}</p>
                            )}
                            <p className={theme.body}>{project.description}</p>
                            {project.technologies && project.technologies.length > 0 && (
                                <p className={theme.bodySmall}>Technologies: {project.technologies.join(', ')}</p>
                            )}
                            <ul className={theme.projects?.details}>
                                {project.details.map((detail, detailIndex) => (
                                    <li key={detailIndex} className={`${theme.bodySmall} ${theme.projects?.detailItem} flex gap-2 place-items-start`}>
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

                {/* Skills Section */}
                <div className={theme.spacing?.section}>
                    <h2 className={theme.sectionHeading}>Platform Capabilities</h2>
                    <div className={theme.skills?.wrapper}>
                        <div className={`${theme.spacing?.item} ${theme.skills?.section}`}>
                            <h3 id='skills-resume' className={theme.subheading}>Core Capabilities</h3>
                            <span className="block h-[10px]"></span>
                            <div className={theme.skills?.list}>
                                {dummyResumeData.skills.technical.map((skill, index) => (
                                    <span
                                        key={index}
                                        className={`${theme.bodySmall} ${theme.skills?.item}`}
                                    >{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className={`${theme.spacing?.item} ${theme.skills?.section}`}>
                            <h3 id='skills-resume' className={theme.subheading}>Additional Features</h3>
                            <span className="block h-[10px]"></span>
                            <div className={theme.skills?.list}>
                                {dummyResumeData.skills.additional.map((skill, index) => (
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