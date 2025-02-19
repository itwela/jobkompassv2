'use client'

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import ConsoleHeader from "@/app/jkComponents/jkConsoleHeader"
import ResumeRenderPage from "../careerassistant/components/resume/page"
import { useEffect, useState } from "react"
import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider"

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
        socials: ["github.com/johndoe", "linkedin.com/in/johndoe"]
    },
    summary: "Experienced software developer with a passion for creating elegant solutions.",
    skills: {
        technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python"],
        additional: ["Project Management", "Team Leadership", "Agile Development"]
    },
    education: [
        {
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
            title: "E-commerce Platform",
            description: "Developed a scalable e-commerce platform",
            technologies: ["React", "Node.js", "GraphQL"],
            date: "2021-2022",
            details: [
                "Implemented payment gateway integration",
                "Optimized dummyResumeDatabase queries"
            ]
        }
    ]
}

export default function ThemePlayground() {
    const { styles } = useJobKompassTheme()
    const { setWantsToPrint, currentlyTestingNewTheme, registerContentRef,  setCurrentlyTestingNewTheme, setCurrentTheme } = useJobKompassResume()
    const [themeData, setThemeData] = useState(dummyResumeData)

    const handleWantingToPrint = () => {
        setWantsToPrint(true);
    }

    // note -----
    // list-disc class gives you the bullet points

    // Define default theme
    const defaultTheme = {
        name: 'text-[28px] font-bold tracking-tight border-b-2 border-gray-800 pb-2 mb-6',
        heading: 'text-[16px] font-bold text-gray-800 uppercase tracking-wider',
        subheading: 'text-[15px] font-medium text-gray-700',
        body: 'text-[14px] leading-snug text-gray-600',
        bodySmall: 'text-[12px] text-gray-500',
        spacing: {
            section: 'py-3',
            item: ''
        }
    }
    // Initialize theme testing state and theme in a single useEffect
    useEffect(() => {
        setWantsToPrint(true)
        setCurrentlyTestingNewTheme(true)
    }, [])


    return (
        <div
            className="w-full h-full"
            style={{ backgroundColor: styles.background }}
        >
            <div className="w-full h-full relative no-scrollbar overflow-x-hidden">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <ConsoleHeader
                        showLogo
                        headingText="Theme Playground"
                        subTitleText="Test and preview theme variations in real-time"
                    />
                </div>

                {/* Split Layout: Test Area and Preview */}
                <div className="flex flex-wrap md:flex-nowrap no-scrollbar justify-between h-[calc(100vh-120px)] w-full">
                    {/* Test Area */}
                    <div
                        className="w-full lg:w-[40%] md:w-[60%] h-full overflow-y-auto rounded-xl"
                        style={{ backgroundColor: '#ff000020' }} // Semi-transparent red background
                    >
                        <div>
                            <h2 className="text-xl font-bold" style={{ color: styles.text.title }}>
                                Theme Testing Area
                            </h2>
                            <p style={{ color: styles.text.subtitle }}>
                                Modify theme values here to see immediate changes
                            </p>
                            {/* Add your theme testing controls here */}
                        </div>
                    </div>

                    {/* Resume Preview */}
                    <div className="w-full h-full p-4 bg-white overflow-x-hidden overflow-y-scroll">
                        <div className="relative">
                            <span onClick={() => handleWantingToPrint()} className="bg-orange-400 w-[40px] h-[50px]">
                                Print
                            </span>

                            <div className="resume-preview w-full h-full" ref={registerContentRef}>
                                <div className="resume-content">
                                    {/* Personal Info Section */}
                                    <div className="personal-info">
                                        <h1 className={defaultTheme?.name}>{dummyResumeData.personalInfo.firstName} {dummyResumeData.personalInfo.lastName}</h1>
                                        <div className={`contact-info ${defaultTheme?.body} grid grid-cols-2`}>
                                            <p>{dummyResumeData.personalInfo.email}</p>
                                            <p>{dummyResumeData.personalInfo.phone}</p>
                                            <p>{dummyResumeData.personalInfo.location}</p>
                                            {dummyResumeData.personalInfo.website && <p>{dummyResumeData.personalInfo.website}</p>}
                                        </div>
                                    </div>

                                    {/* Education Section */}
                                    <div className={`education-section ${defaultTheme?.spacing?.section}`}>
                                        <h2 className={defaultTheme?.heading}>Education</h2>
                                        {dummyResumeData.education.map((edu: any, index: number) => (
                                            <div key={index} className={defaultTheme?.spacing?.item}>
                                                <h3 className={defaultTheme?.subheading}>{edu.name}</h3>
                                                <p className={defaultTheme?.body}>{edu.degree}</p>
                                                <p className={defaultTheme?.bodySmall}>{edu.date}</p>
                                                <ul className={`${defaultTheme?.body} `}>
                                                    {edu.details.map((detail: string, detailIndex: number) => (
                                                        <li key={detailIndex}>{detail}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Experience Section */}
                                    <div className={`experience-section ${defaultTheme?.spacing?.section}`}>
                                        <h2 className={defaultTheme?.heading}>Experience</h2>
                                        {dummyResumeData.experience.map((exp: any, index: number) => (
                                            <div key={index} className={defaultTheme?.spacing?.item}>
                                                <h3 className={defaultTheme?.subheading}>{exp.title}</h3>
                                                <p className={defaultTheme?.bodySmall}>{exp.company} - {exp.location}</p>
                                                <p className={defaultTheme?.bodySmall}>{exp.date}</p>
                                                <p className={defaultTheme?.body}>{exp.description}</p>
                                                <ul className={`${defaultTheme?.body}`}>
                                                    {exp.details.map((detail: string, detailIndex: number) => (
                                                        <></>
                                                        // <li key={detailIndex}>{detail}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Projects Section */}
                                    <div className={`projects-section ${defaultTheme?.spacing?.section}`}>
                                        <h2 className={defaultTheme?.heading}>Projects</h2>
                                        {dummyResumeData.projects.map((project: any, index: number) => (
                                            <div key={index} className={defaultTheme?.spacing?.item}>
                                                <h3 className={defaultTheme?.subheading}>{project.name}</h3>
                                                {project.achievement && (
                                                    <p className={`${defaultTheme?.body} font-semibold`}>{project.achievement}</p>
                                                )}
                                                <p className={defaultTheme?.body}>{project.description}</p>
                                                {project.link && (
                                                    <p className={defaultTheme?.bodySmall}>Link: {project.link}</p>
                                                )}
                                                {project.technologies && project.technologies.length > 0 && (
                                                    <p className={defaultTheme?.bodySmall}>
                                                        Technologies: {project.technologies.join(', ')}
                                                    </p>
                                                )}
                                                <ul className={`${defaultTheme?.body}`}>
                                                    {project.details.map((detail: string, detailIndex: number) => (
                                                        <li key={detailIndex}>{detail}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Skills Section */}
                                    <div className={`skills-section ${defaultTheme?.spacing?.section}`}>
                                        <h2 className={defaultTheme?.heading}>Skills</h2>
                                        <div className={defaultTheme?.spacing?.item}>
                                            <h3 className={defaultTheme?.subheading}>Technical Skills</h3>
                                            <ul className={`${defaultTheme?.body} grid grid-cols-3`}>
                                                {dummyResumeData.skills.technical.map((skill: string, index: number) => (
                                                    <li key={index}>{skill}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className={defaultTheme?.spacing?.item}>
                                            <h3 className={defaultTheme?.subheading}>Additional Skills</h3>
                                            <ul className={`${defaultTheme?.body} grid grid-cols-3`}>
                                                {dummyResumeData.skills.additional.map((skill: string, index: number) => (
                                                    <li key={index}>{skill}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}