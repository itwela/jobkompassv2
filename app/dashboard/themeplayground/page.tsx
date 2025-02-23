'use client'

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import ConsoleHeader from "@/app/jkComponents/jkConsoleHeader"
import ResumeRenderPage from "../careerassistant/components/resume/page"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider"
import { LucideArrowLeft, LucideStepBack } from "lucide-react"
import Link from "next/link"
import debounce from 'lodash/debounce';
import TechBroResume from "@/app/jkComponents/TechBro/jkTechBroResume"
import '@/app/globals.css'

// Dummy resume dummyResumeData for testing
const dummyResumeData = {
    personalInfo: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
        location: "San Francisco, CA",
        website: "johndoe.dev",
        citizenship: "US Citizen",
        socials: [
            { type: "github", url: "github.com/johndoe" },
            { type: "linkedin", url: "linkedin.com/in/johndoe" }
        ]
    },
    summary: "Experienced software developer with a passion for creating elegant solutions.",
    skills: {
        technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python"],
        additional: ["Project Management", "Team Leadership", "Agile Development"]
    },
    education: [
        {
            name: "University of Science",
            school: "University of Technology",
            degree: "Bachelor of Science",
            field: "Computer Science",
            startDate: "2016",
            endDate: "2020",
            description: "Major in Software Engineering",
            technologies: ["Java", "Python", "Algorithms"],
            date: "2016-2020",
            details: ["Dean's List", "Senior Project Lead"]
        }
    ],
    experience: [
        {
            title: "Senior Software Engineer",
            company: "Tech Corp",
            location: "San Francisco, CA",
            date: "2020-Present",
            description: "Lead developer for core products",
            details: [
                "Architected and implemented scalable solutions",
                "Mentored junior developers",
                "Improved system performance by 40%"
            ]
        }
    ],
    projects: [
        {
            name: "TechBro",
            achievement: "Best Software Engineer",
            link: "",
            title: "E-commerce Platform",
            description: "Developed a scalable e-commerce platform",
            technologies: ["React", "Node.js", "GraphQL"],
            date: "2021-2022",
            details: [
                "Implemented payment gateway integration",
                "Optimized dummyResumeDatabase queries"
            ]
        }
    ],
    additionalInfo: {
        languages: ["English (Native)", "Spanish (Intermediate)", "Mandarin (Basic)"],
        certifications: [
            {
                name: "AWS Certified Solutions Architect",
                issuer: "Amazon Web Services",
                date: "2022"
            },
            {
                name: "Professional Scrum Master I",
                issuer: "Scrum.org",
                date: "2021"
            }
        ],
        interests: [
            "Open Source Development",
            "Machine Learning",
            "Cloud Architecture",
            "Tech Mentorship"
        ],
        achievements: [
            "Speaker at TechConf 2022",
            "Published 3 technical articles",
            "Open source contributor"
        ],
        volunteering: [
            {
                organization: "Code for Good",
                role: "Technical Mentor",
                date: "2021-Present",
                description: "Mentoring aspiring developers from underrepresented communities"
            }
        ],
        hobbies: [
            "Gaming",
            "Reading",
            "Traveling",
            "Cooking"
        ],
        references: [
            "Available upon request"
        ]
    }
}



export default function ThemePlayground() {
    const { styles } = useJobKompassTheme()
    const { setWantsToPrint, currentlyTestingNewTheme, registerContentRef, setCurrentlyTestingNewTheme } = useJobKompassResume()
    const [themeData] = useState(dummyResumeData)
    const [selectedElement, setSelectedElement] = useState<string>('')
    const [selectedElementClass, setSelectedElementClass] = useState<string>('')
    const currentTheme = {
        
        //ANCHOR -------------------------------------------
        name: `
        ~text-xl/5xl  

        font-bold leading-tight
        `,
        // -------------------------------------------

        //ANCHOR -------------------------------------------
        heading: `font-bold text-gray-800`,        
        sectionHeading: `
        ~jk-text-md/4xl 

        mb-2 underline font-semibold text-gray-800 uppercase tracking-wide`,
        // -------------------------------------------
        
        // ANCHOR -------------------------------------------
        subheading: `
        ~jk-text-md/4xl 
        
        `,
        // -------------------------------------------
        
        // ANCHOR -------------------------------------------
        // TODO
        body: `
        ~jk-text-sm/3xl 

        text-gray-600 mb-2
        `,
        // -------------------------------------------
        
        // ANCHOR -------------------------------------------
        bodySmall: `
        ~jk-text-sm/3xl 
        
        mb-2 w-max h-[10px] flex items-center text-gray-500
        `,
        // -------------------------------------------
        
        // ANCHOR -------------------------------------------
        spacing: {
            section: "mb-4 last:mb-0 border-b-[1px] border-black/10 pb-[2%]",
            item: "mb-0"
        },
        // -------------------------------------------
        
        // ANCHOR -------------------------------------------
        // Container
        container: "w-full bg-white h-max p-[3%] text-base",
        // -------------------------------------------
        
        // Header Section
        header: {
            wrapper: "flex h-max place-items-end justify-between w-full mb-[2%]",
            nameSection: "relative flex flex-col place-items-start h-max leading-none",
            contactSection: "flex leading-none gap-[15px]",
            contactColumn: "flex flex-col h-max leading-none place-items-end"
        },
        // -------------------------------------------

        // Content Sections
        section: {
            wrapper: "space-y-[2%]",
            title: "text-[1.2em] font-semibold mb-[1%]",
            content: "space-y-[2%]"
        },

        // Education Section
        education: {
            item: "mb-[2%] last:mb-0",
            details: "list-disc",
            detailItem: "list-disc text-[0.9em] leading-relaxed"
        },

        // Experience Section
        experience: {
            item: "mb-[2%] last:mb-0",
            details: "pl-[4%] list-disc",
            detailItem: "list-disc"
        },

        // Projects Section
        projects: {
            item: "mb-[2%] last:mb-0",
            details: "pl-[4%] list-disc",
            detailItem: "list-disc text-[0.9em] leading-relaxed"
        },

        // Skills Section
        skills: {
            wrapper: "flex flex-wrap gap-x-[4%] gap-y-[2%]",
            section: "flex-1 min-w-[45%]",
            list: "flex flex-wrap gap-x-[3] gap-y-[3] my-2",
            item: "text-[0.9em] after:content-[',']  py-2 pr-2 last:after:content-none after:mr-[0.5%]"
        }
    }
    useEffect(() => {
        setWantsToPrint(true)
        setCurrentlyTestingNewTheme(true)
        return () => setCurrentlyTestingNewTheme(false)
    }, [])


    return (
        <div
            className="w-full h-full p-5"
            style={{ backgroundColor: styles.background }}
        >
            <div className="w-full h-full relative no-scrollbar overflow-x-hidden">
                {/* Header */}
                <div className="flex justify-between mb-2 items-start">
                    <ConsoleHeader
                        showLogo
                        headingText="Theme Playground"
                        subTitleText="Test and preview theme variations in real-time"
                    />
                    <Link
                        href='/dashboard/careerassistant'
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-y-[-1px]"
                        style={{ color: styles.text.primary }}
                    >
                        <LucideArrowLeft size={16} />
                        Back
                    </Link>
                </div>

                {/* Split Layout: Test Area and Preview */}
                <div className="flex flex-wrap md:flex-nowrap no-scrollbar justify-between h-[calc(100vh-120px)] w-full gap-4">
                    {/* Test Area */}
                    <div
                        className="w-full md:w-[40%] flex items-center place-content-center h-full overflow-y-auto rounded-xl"
                        style={{ backgroundColor: styles.form.input.background }}
                    >

                        <div>
                            <h2 className="text-xl font-bold mb-2" style={{ color: styles.text.title }}>
                                Theme Testing Area
                            </h2>
                            <p className="mb-6" style={{ color: styles.text.subtitle }}>
                                Click any text element in the preview to edit its classes
                            </p>
                        </div>

                    </div>

                    {/* Resume Preview */}
                    <div
                        className="w-full h-full overflow-y-auto rounded-xl"
                        style={{ backgroundColor: "#fff" }}
                    >
                        <div className="relative">
                            <TechBroResume
                                data={dummyResumeData}
                                theme={currentTheme}
                                registerContentRef={registerContentRef}
                            />
                            {/* <div className="w-full h-full" ref={registerContentRef}>
                                <div>
                                    <div>
                                        <div className="flex h-max place-items-end justify-between w-full">
                                            <span className="relative place-items-start h-max pb-1 leading-none">
                                                <p
                                                    className={currentTheme.name}
                                                    onClick={() => {
                                                        setSelectedElement('name')
                                                        setSelectedElementClass(currentTheme?.name || '')
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                >{themeData.personalInfo.firstName} {themeData.personalInfo.lastName}</p>
                                                {themeData.personalInfo.website && <p className="" key="website">{themeData.personalInfo.website}</p>}
                                            </span>

                                            <span className="flex leading-none gap-5">
                                                <span className="flex flex-col h-max leading-none place-items-end">
                                                    <p className={currentTheme?.body}>{themeData.personalInfo.citizenship}</p>
                                                    <p className={currentTheme?.body} key="location">{themeData.personalInfo.location}</p>
                                                </span>

                                                <span className="flex flex-col h-max leading-none place-items-end">
                                                    <p className={currentTheme?.body} key="phone">{themeData.personalInfo.phone}</p>
                                                    <p className={currentTheme?.body} key="email">{themeData.personalInfo.email}</p>
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    <span className="block h-[10px]"></span>

                                    <div className={currentTheme?.spacing?.section}>
                                        <h2
                                            className={currentTheme?.sectionHeading}
                                            onClick={() => {
                                                setSelectedElement('sectionHeading')
                                                setSelectedElementClass(currentTheme?.sectionHeading || '')
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >Education</h2>
                                        {themeData.education.map((edu: any, index: number) => (
                                            <div key={`edu-${index}`} className={currentTheme?.spacing?.item}>
                                                <h3
                                                    className={currentTheme?.subheading}
                                                    onClick={() => {
                                                        setSelectedElement('subheading')
                                                        setSelectedElementClass(currentTheme?.subheading || '')
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                >{edu.name}</h3>
                                                <p
                                                    className={currentTheme?.body}
                                                    onClick={() => {
                                                        setSelectedElement('body')
                                                        setSelectedElementClass(currentTheme?.body || '')
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                >{edu.degree}</p>
                                                <p
                                                    className={currentTheme?.bodySmall}
                                                    onClick={() => {
                                                        setSelectedElement('bodySmall')
                                                        setSelectedElementClass(currentTheme?.bodySmall || '')
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                >{edu.date}</p>
                                                <ul className="pl-4">
                                                    {edu.details.map((detail: string, detailIndex: number) => (
                                                        <li key={`edu-detail-${index}-${detailIndex}`} className={`${currentTheme?.body} list-disc`}>{detail}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={currentTheme?.spacing?.section}>
                                        <h2 className={currentTheme?.sectionHeading}>Experience</h2>
                                        {themeData.experience.map((exp: any, index: number) => (
                                            <div key={`exp-${index}`} className={currentTheme?.spacing?.item}>
                                                <h3 className={currentTheme?.subheading}>{exp.title}</h3>
                                                <p className={currentTheme?.bodySmall}>{exp.company} - {exp.location}</p>
                                                <p className={currentTheme?.bodySmall}>{exp.date}</p>
                                                <p className={currentTheme?.body}>{exp.description}</p>
                                                <ul className="pl-4">
                                                    {exp.details.map((detail: string, detailIndex: number) => (
                                                        <li key={detailIndex} className={`${currentTheme?.body} list-disc`}>{detail}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={currentTheme?.spacing?.section}>
                                        <h2 className={currentTheme?.sectionHeading}>Projects</h2>
                                        {themeData.projects.map((project: any, index: number) => (
                                            <div key={index} className={currentTheme?.spacing?.item}>
                                                <h3 className={currentTheme?.subheading}>{project.name}</h3>
                                                {project.achievement && (
                                                    <p className={`${currentTheme?.body} list-disc`}> {project.achievement}</p>
                                                )}
                                                <p className={currentTheme?.body}>{project.description}</p>
                                                {project.link && (
                                                    <p className={`${currentTheme?.bodySmall}`}>Link: {project.link}</p>
                                                )}
                                                {project.technologies && project.technologies.length > 0 && (
                                                    <p className={currentTheme?.bodySmall}>
                                                        Technologies: {project.technologies.join(', ')}
                                                    </p>
                                                )}
                                                <ul className="pl-4">
                                                    {project.details.map((detail: string, detailIndex: number) => (
                                                        <li key={detailIndex} className={`${currentTheme?.body} list-disc`}>{detail}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={currentTheme?.spacing?.section}>
                                        <h2 className={currentTheme?.sectionHeading}>Skills</h2>
                                        <div className="flex flex-wrap gap-x-8">
                                            <div className={`${currentTheme?.spacing?.item} flex-1 min-w-[200px]`}>
                                                <h3 className={currentTheme?.subheading}>Technical Skills</h3>
                                                <div className="flex flex-wrap">
                                                    {themeData.skills.technical.map((skill: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className={`${currentTheme?.body} after:content-[','] last:after:content-none after:mr-1`}
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className={`${currentTheme?.spacing?.item} flex-1 min-w-[200px]`}>
                                                <h3 className={currentTheme?.subheading}>Additional Skills</h3>
                                                <div className="flex flex-wrap">
                                                    {themeData.skills.additional.map((skill: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className={`${currentTheme?.body} after:content-[','] last:after:content-none after:mr-1`}
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}