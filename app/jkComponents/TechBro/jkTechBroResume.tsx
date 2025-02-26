'use client'

import React, { useEffect, useRef, useState } from 'react';
import { TechBroProps } from './types';
import { useJobKompassResume } from '@/app/helpers/providers/JobKompassResumeProvider';
import { Margin, Resolution, usePDF } from 'react-to-pdf';

// Download Ready Styles. This makes sure the resume is actually the width of the pdf
const PdfStyles = () => (
    <style>{`
        @page {
            size: letter;
            margin: 0.75in;
        }
        
        .pdf-container {
            width: 8.5in;
            display: flex;
            flex-direction: column;
            background: white;
            margin: 0 auto;
        }
        
        .pdf-page {
            width: 8.5in;
            padding: 0.25in;
            margin: 0;
            background-color: white;
            position: relative;
            box-sizing: border-box;
            page-break-inside: avoid;
        }
        
        .pdf-page h1 { font-size: 20pt; }
        .pdf-page h2 { font-size: 14pt; margin-bottom: 12pt; }
        .pdf-page h3 { font-size: 12pt; }
        .pdf-page p, 
        .pdf-page span, 
        .pdf-page li { 
            font-size: 10pt;
            line-height: 1.2;
            margin-bottom: 4pt;
        }
        
        .pdf-page ul {
            margin-top: 4pt;
            margin-bottom: 8pt;
            padding-left: 16pt;
        }
        
        .pdf-page .page-break {
            page-break-after: always;
            break-after: page;
            height: 0;
            margin: 0;
            border: 0;
        }
    `}</style>
);
const pdfDocStyles = `w-[8.5in] bg-white h-max text-base`

const WebStyles = () => (
    <style>{`
        @page {
            size: letter;
            margin: 0;
        }
        
        .pdf-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: white;
        }
        
       .pdf-page {
            aspect-ratio: 8.5 / 11;
            width: min(100%, 1200px);
            padding: 24px;
            margin: 0;
            background-color: white;
            position: relative;
            box-sizing: border-box;
            font-size: calc(6px + 0.25vw);
        }
        
        .pdf-page h1 {
            font-size: calc(12px + 0.5vw);
        }
        
        .pdf-page h2 {
            font-size: calc(10px + 0.4vw);
        }
        
        .pdf-page h3 {
            font-size: calc(8px + 0.35vw);
        }
        
        .pdf-page p, 
        .pdf-page span, 
        .pdf-page li {
            font-size: calc(6px + 0.25vw);
            line-height: 1.4;
        }
    `}</style>
);
const webContainerStyles = `w-full bg-white h-max text-base`

export default function TechBroResume({ data, theme, registerContentRef, scale, zoom }: TechBroProps) {
    const { sectionImCurrentlyEditingRef, setSectionImCurrentlyEditingRef, customSymbol } = useJobKompassResume()
    const { toPDF, targetRef } = usePDF({
        filename: 'resume.pdf',
        resolution: Resolution.HIGH,
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.SMALL,
            // default is 'A4'
            format: 'letter',
            // default is 'portrait'
            orientation: 'portrait',
        },
    });
    const [activeRef, setActiveRef] = useState<React.RefObject<any>>(registerContentRef as any);
    const [isPdfMode, setIsPdfMode] = useState(false);

    const handlePrintPDF = async () => {

        // Switch to PDF mode
        setIsPdfMode(true);

        // Switch to PDF ref
        setActiveRef(targetRef);
        // Wait for ref to update
        await new Promise(resolve => setTimeout(resolve, 100));
        // Generate PDF
        await toPDF();
        // Switch back to original ref
        setActiveRef(registerContentRef as any);

        // Switch back to web mode
        setIsPdfMode(false);

    };

    // Keep editing ref synchronized
    useEffect(() => {
        setSectionImCurrentlyEditingRef(registerContentRef);
    }, [registerContentRef, setSectionImCurrentlyEditingRef]);


    const getElementHeightInInches = (element: HTMLElement | null): number => {
        if (!element) return 0;
        const heightInPixels = element.getBoundingClientRect().height;
        const PIXELS_PER_INCH = 96;
        return heightInPixels / PIXELS_PER_INCH;
    };

     // Add state to store heights
     const [sectionHeights, setSectionHeights] = useState<{
        education: number[];
        experience: number[];
        projects: number[];
    }>({ education: [], experience: [], projects: [] });

    // Add useEffect to measure heights
    useEffect(() => {
        if (isPdfMode) {
            const educationHeights = Array.from(document.querySelectorAll('[id^="education-"]'))
                .map((el, index) => ({
                    index,
                    height: getElementHeightInInches(el as HTMLElement),
                    content: (el as HTMLElement).textContent
                }));
            
            const experienceHeights = Array.from(document.querySelectorAll('[id^="experience-"]'))
                .map((el, index) => ({
                    index,
                    height: getElementHeightInInches(el as HTMLElement),
                    content: (el as HTMLElement).textContent
                }));
            
            const projectHeights = Array.from(document.querySelectorAll('[id^="project-"]'))
                .map((el, index) => ({
                    index,
                    height: getElementHeightInInches(el as HTMLElement),
                    content: (el as HTMLElement).textContent
                }));

            setSectionHeights({
                education: educationHeights.map(e => e.height),
                experience: experienceHeights.map(e => e.height),
                projects: projectHeights.map(e => e.height)
            });

            console.log('Education Items:', educationHeights);
            console.log('Experience Items:', experienceHeights);
            console.log('Project Items:', projectHeights);
            console.log('Total Heights:', {
                education: educationHeights.reduce((acc, curr) => acc + curr.height, 0),
                experience: experienceHeights.reduce((acc, curr) => acc + curr.height, 0),
                projects: projectHeights.reduce((acc, curr) => acc + curr.height, 0)
            });
        }
    }, [isPdfMode, data]);

    return (
        <div
            onDoubleClick={handlePrintPDF} style={{
                zoom: 1,
                transform: `scale(${scale || 1})`,
                transformOrigin: 'top center',
            }}
            className={`${isPdfMode ? pdfDocStyles : webContainerStyles} !leading-none flex place-items-start place-content-start w-full !bg-orange-300 text-black [&_*]:text-black [&_li]:marker:text-black`} ref={activeRef}>

            {isPdfMode ? <PdfStyles /> : <WebStyles />}

            <div
                ref={activeRef}
                className={`${isPdfMode ? pdfDocStyles : webContainerStyles} !leading-none text-black [&_*]:text-black [&_li]:marker:text-black pdf-container`}

            >
                <div className="pdf-page">
                    <div className={theme.header?.wrapper}>
                        <span id="name-resume" className={theme.header?.nameSection}>
                            <h1 className={theme.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
                            {data.personalInfo.website && <p className={theme.bodySmall}>{data.personalInfo.website}</p>}
                        </span>

                        <span id='citizenship-resume' className={theme.header?.contactSection}>
                            <span className={theme.header?.contactColumn}>
                                <p className={theme.bodySmall}>{data.personalInfo.citizenship}</p>
                                <p className={theme.bodySmall}>{data.personalInfo.location}</p>
                            </span>
                            <span className={theme.header?.contactColumn}>
                                <p className={theme.bodySmall}>{data.personalInfo.phone}</p>
                                <p className={theme.bodySmall}>{data.personalInfo.email}</p>
                            </span>
                        </span>
                    </div>

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
                                            <span className="font-bold">{customSymbol}</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

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
                                <p className={theme.body}>{exp.description}</p>
                                <ul id={`experience-${index}`} className={theme.experience?.details}>
                                    {exp.details.map((detail, detailIndex) => (
                                        <li key={detailIndex} className={`${theme.bodySmall} ${theme.experience?.detailItem} flex gap-2 place-items-start`}>
                                            <span className="font-bold">{customSymbol}</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                   
                    <div className={theme.spacing?.section}>
                        <h2 className={theme.sectionHeading}>Projects</h2>
                        {data.projects.map((project, index) => (
                            <div key={index} id={`project-${index}`} className={theme.spacing?.item}>
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
                                        <li key={detailIndex} className={`${theme.bodySmall} ${theme.projects?.detailItem} flex gap-2 place-items-start`}>
                                            <span className="font-bold">{customSymbol}</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <span className='h-[10px]'></span>
                        <div className={theme.spacing?.section}>
                            <h2 className={theme.sectionHeading}>Skills</h2>
                            <div className={theme.skills?.wrapper}>
                                <div className={`${theme.spacing?.item} ${theme.skills?.section}`}>
                                    <h3 id='skills-resume' className={theme.subheading}>Technical Skills</h3>
                                    <span className="block h-[10px]"></span>
                                    <div className={theme.skills?.list}>
                                        {data.skills.technical.map((skill, index) => (
                                            <span key={index} className={`${theme.bodySmall} ${theme.skills?.item}`}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className={`${theme.spacing?.item} ${theme.skills?.section}`}>
                                    <h3 id='skills-resume' className={theme.subheading}>Additional Skills</h3>
                                    <span className="block h-[10px]"></span>
                                    <div className={theme.skills?.list}>
                                        {data.skills.additional.map((skill, index) => (
                                            <span key={index} id={`additional-skills-${index}`} className={`${theme.bodySmall} ${theme.skills?.item}`}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
{/* <div>
<div>
    <div className={theme.header?.wrapper}>
        <span id="name-resume" className={theme.header?.nameSection}>
            <p className={theme.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</p>
            {data.personalInfo.website && <p className={theme.bodySmall} key="website">{data.personalInfo.website}</p>}
        </span>

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

<div className={theme.spacing?.section}>
    <h2 className={theme.sectionHeading}>Skills</h2>
    <div className={theme.skills?.wrapper}>
        <div className={`${theme.spacing?.item} ${theme.skills?.section}`}>
            <h3 id='skills-resume' className={theme.subheading}>Technical Skills</h3>
            <span className="block h-[10px]"></span>
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
            <span className="block h-[10px]"></span>
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
</div> */}