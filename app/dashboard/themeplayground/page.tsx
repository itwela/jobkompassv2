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
import { themes } from "../careerassistant/components/resume/resumeTemplates"
import { UserFieldData } from "@/app/jkComponents/TechBro/types"

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
    
    const [userFieldData, setUserFieldData] = useState<UserFieldData>({
        personalInfo: {
          firstName: "Itwela",
          lastName: "Ibomu",
          email: "citwela@gmail.com",
          citizenship: "US Citizen",
          phone: "(404) 555-0123",
          location: "Atlanta, GA",
          website: "itwela.dev",
          socials: [
            { type: 'github', url: 'Github.com/itwela' },
          ]
        },
        education: [
          {
            name: "Western Governors University (WGU)",
            school: "WGU",
            startDate: "",
            endDate: "December 2025",
            degree: "Bachelor of Science in Software Engineering",
            field: "Software Engineering",
            date: "Expected Graduation: December 2025",
            details: ["Studies focus on Math, Programming, Data Management, Application Design and Development, Cloud Foundations"],
            description: "",
            technologies: [],
          },
        ],
        experience: [
          {
            title: "Software Engineering Fellow",
            company: "Headstarter",
            location: "Long Island City, NY",
            date: "July 2024 - September 2024",
            description: "Built and deployed five AI projects focused on user-centered development and optimization",
            details: [
              "Built and deployed five AI projects focused on user-centered development and optimization, using React TS, Next.js, Tailwind, Firebase, Supabase, Clerk, LangChain, Pinecone, Docker, and Vercel",
              "Scaled web applications to over 200 users through collaboration with UI/UX designers, optimizing user interfaces based on feedback and quality testing across deployment stages",
              "Enhanced SDLC processes, including code reviews and QA testing, to ensure high performance and reliability",
              "Impact: Achieved funding and support for \"CitySwipe\" by winning multiple hackathons, leading to its launch with 100+ users"
            ],
          },
          {
            title: "AI Software Engineer",
            company: "Dataforce",
            location: "Atlanta, GA",
            date: "April 2024 - June 2024",
            description: "Meet and exceed client captioning targets on a daily and weekly basis",
            details: [
              "Meet and exceed client captioning targets on a daily and weekly basis, resulting in improved client satisfaction and increased project efficiency",
              "Documented and notified development team of technical errors, bugs, contributing to the timely resolution of issues",
              "Created a spreadsheet to track personal productivity, resulting in 50% increase in captions per day"
            ],
          },
          {
            title: "Software Engineering Virtual Experience",
            company: "Forage (J.P Morgan)",
            location: "",
            date: "December 2023 - January 2024",
            description: "Developed live graph generation functionality using JPMorgan's open-source library",
            details: [
              "Developed live graph generation functionality using JPMorgan's open-source library, Perspective, and gained exposure to financial data visualization and agile methodologies"
            ],
          },
          {
            title: "Software Engineer",
            company: "Freelance",
            location: "Atlanta, GA",
            date: "December 2023 - Present",
            description: "Develop and build dynamic UI to support multiple businesses",
            details: [
              "Develop and build dynamic UI to support multiple businesses in an Agile environment using web frameworks like React and Nextjs and mobile frameworks such as React Native and Expo Go",
              "Design, develop, and code web and mobile components for multiple clients, including debugging, diagnosing root causes, & identifying solutions",
              "Develop blockchain-based crypto games utilizing Solana, Web3.js, Rust and Anchor"
            ],
          }
        ],
        projects: [
          {
            name: "AI Travel & Vacation Planning Application",
            achievement: "Published App 50+ Users",
            description: "Led a team of developers, designers, and marketers to create an AI-powered platform for vacation planning",
            link: "cityswipe.app",
            technologies: ["Next.js", "React", "Vercel", "Supabase", "Gemini", "Framer Motion", "Pexels API"],
            date: "July 2024 - Present",
            details: [
              "Led a team of developers, designers, and marketers to create an AI-powered platform for vacation planning, leveraging machine learning for personalized recommendations",
              "Integrated natural language processing (NLP) to improve user interaction with travel suggestions based on preferences",
              "Impact: Garnered thousands of social media impressions, secured investment from the CEO of Lunchbox, and grew user engagement by 150%"
            ],
          },
          {
            name: "Job Tracker & Data Analysis Application",
            achievement: "Published App 10+ Users",
            description: "Developed a job application tracking tool that automated the data entry and analysis",
            link: "myjobkompass.com",
            technologies: ["Next.js", "TypeScript", "React", "Supabase", "Tailwind CSS", "Vercel", "Chart.js", "React Query", "Prisma", "PostgreSQL"],
            date: "January 2024 - April 2024",
            details: [
              "Developed a job application tracking tool that automated the data entry and analysis of job applications, reducing job search time by 50%",
              "Collaborated with users to refine features based on feedback, conducting iterative testing to improve UI and functionality",
              "I landed my first contract role in tech (Dataforce), and the Software engineering fellowship (Headstarter) role using this tool"
            ],
          },
          {
            name: "RAG AI Rate My Professor Chat Application",
            achievement: "Published App 5+ Users",
            description: "Designed and implemented an AI-powered web application for professor reviews using vector search and real-time data processing",
            link: "ratemyprofessor.vercel.app",
            technologies: ["Nextjs", "TypeScript", "React", "Vercel", "Pinecone", "OpenAI", "Langchain", "Framer Motion"],
            date: "August 2024",
            details: [
              "Designed a web app utilizing real-time data and vector search, delivering accurate and up-to-date responses",
              "Emphasized ML model fine-tuning to maintain high levels of data relevance"
            ],
          },
          {
            name: "Instant Video Caption Generator (Jelly Up!)",
            achievement: "2nd Place Hackathon Winner",
            description: "Built a backend AI system for video captioning using OpenAI Whisper",
            link: "jellyup.vercel.app",
            technologies: ["Nextjs", "TypeScript", "React", "Vercel", "Docker", "OpenCV", "OpenAI (Whisper)", "Supabase"],
            date: "August 2024",
            details: [
              "Built a backend AI system for video captioning, achieving high transcription accuracy using OpenAI Whisper",
              "Impact: Won 2nd place at the Headstarter Hiring Hackathon among hundreds of teams, demonstrating excellence in real-time caption generation for diverse media"
            ],
          },
          {
            name: "Voice Activated AI Travel Assistant (Globetrotter AI)",
            achievement: "Published App 20+ Users",
            description: "Developed an AI-powered voice assistant for personalized travel recommendations",
            link: "globetrotterai.vercel.app",
            technologies: ["Nextjs", "React", "Vercel", "Gemini", "Google TTS", "React Three Fiber", "Framer Motion"],
            date: "August 2024",
            details: [
              "Designed a conversational AI travel assistant using Flask, integrating multiple travel APIs for seamless itinerary planning",
              "Impact: Won 1st place at the Headstarter Hiring Hackathon, recognized for innovation and utility in travel assistance"
            ],
          }
        ],
        skills: {
          technical: ["Python", "React", "React Native", "SQL", "Python", "React", "React Native", "SQL", "Python", "React", "React Native", "SQL", "Python", "React", "React Native", "SQL"],
          additional: ["UI/UX Design", "Leadership", "Teamwork", "Agile", "Artist", "Musician (Piano, Guitar)", "Python", "React", "React Native", "SQL", "Python", "React", "React Native", "SQL"]
        },
        additionalInfo: {
          interests: ["Mentoring", "Investing", "Crypto", "Basketball", "Gaming", "Traveling", "Teaching", "Machine Learning"],
          hobbies: ["Photography", "Music Production", "Rock Climbing", "Chess"],
          languages: ["English (Native)", "Spanish (Conversational)", "Mandarin (Basic)"],
          references: ["Available upon request"],
        },
      });


    // ✨ Tech Bro 
    // const currentTheme = {
        
    //     //ANCHOR -------------------------------------------
    //     name: `
    //     ~text-xl/5xl  

    //     font-bold leading-tight
    //     `,
    //     // -------------------------------------------

    //     //ANCHOR -------------------------------------------
    //     heading: `font-bold text-gray-800`,        
    //     sectionHeading: `
    //     ~jk-text-md/4xl 

    //     mb-2 underline font-semibold text-gray-800 uppercase tracking-wide`,
    //     // -------------------------------------------
        
    //     // ANCHOR -------------------------------------------
    //     subheading: `
    //     ~jk-text-md/4xl 
        
    //     `,
    //     // -------------------------------------------
        
    //     // ANCHOR -------------------------------------------
    //     // TODO
    //     body: `
    //     ~jk-text-sm/3xl 

    //     text-gray-600 mb-2
    //     `,
    //     // -------------------------------------------
        
    //     // ANCHOR -------------------------------------------
    //     bodySmall: `
    //     ~jk-text-sm/3xl 
        
    //     mb-2 w-max h-[10px] flex items-center text-gray-500
    //     `,
    //     // -------------------------------------------
        
    //     // ANCHOR -------------------------------------------
    //     spacing: {
    //         section: "mb-4 last:mb-0 border-b-[1px] border-black/10 pb-[2%]",
    //         item: "mb-0"
    //     },
    //     // -------------------------------------------
        
    //     // ANCHOR -------------------------------------------
    //     // Container
    //     container: "w-full bg-white h-max p-[3%] text-base",
    //     // -------------------------------------------
        
    //     // Header Section
    //     header: {
    //         wrapper: "flex h-max place-items-end justify-between w-full mb-[2%]",
    //         nameSection: "relative flex flex-col place-items-start h-max leading-none",
    //         contactSection: "flex leading-none gap-[15px]",
    //         contactColumn: "flex flex-col h-max leading-none place-items-end"
    //     },
    //     // -------------------------------------------

    //     // Content Sections
    //     section: {
    //         wrapper: "space-y-[2%]",
    //         title: "text-[1.2em] font-semibold mb-[1%]",
    //         content: "space-y-[2%]"
    //     },

    //     // Education Section
    //     education: {
    //         item: "mb-[2%] last:mb-0",
    //         details: "list-disc",
    //         detailItem: "list-disc text-[0.9em] leading-relaxed"
    //     },

    //     // Experience Section
    //     experience: {
    //         item: "mb-[2%] last:mb-0",
    //         details: "pl-[4%] list-disc",
    //         detailItem: "list-disc"
    //     },

    //     // Projects Section
    //     projects: {
    //         item: "mb-[2%] last:mb-0",
    //         details: "pl-[4%] list-disc",
    //         detailItem: "list-disc text-[0.9em] leading-relaxed"
    //     },

    //     // Skills Section
    //     skills: {
    //         wrapper: "flex flex-wrap gap-x-[4%] gap-y-[2%]",
    //         section: "flex-1 min-w-[45%]",
    //         list: "flex flex-wrap gap-x-[3] gap-y-[3] my-2",
    //         item: "text-[0.9em] after:content-[',']  py-2 pr-2 last:after:content-none after:mr-[0.5%]"
    //     }
    // }

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
                        className="w-max h-full overflow-y-auto rounded-xl"
                        style={{ backgroundColor: "#fff" }}
                    >
                        <div className="relative">
                            <TechBroResume
                                data={userFieldData}
                                theme={themes['Tech Bro']}
                                registerContentRef={registerContentRef}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}