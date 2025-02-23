'use client'

import Header from "../jkComponents/jkLandingHeader";
import { useJobKompassLanding } from "../helpers/providers/landingProvider";
import React, { useEffect, useRef, useState } from "react";
import { Briefcase, Building2, Sparkles } from "lucide-react";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import JkGradientImage from "../jkComponents/jkGradientImage";
import Image from "next/image";
import Link from "next/link";
import TechBroResume from "../jkComponents/TechBro/jkTechBroResume";
import { techBroStyles } from "../jkComponents/TechBro/styles";
import { TechBroThemeTypes } from "../jkComponents/TechBro/types";
import { themes } from "../dashboard/careerassistant/components/resume/resumeTemplates";

export default function LandingPage() {
    const { styles } = useJobKompassTheme();
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    
    
    const features = [
        {
            title: "AI Resume Builder",
            description: "Create professional resumes with our AI-powered platform",
            icon: Briefcase,
            color: styles.nav.colors.applications
        },
        {
            title: "Intelligent Job Tracking",
            description: "Track applications and get real-time insights",
            icon: Building2,
            color: styles.nav.colors.companyHub
        },
        {
            title: "Smart Career Assistant",
            description: "Get personalized career guidance powered by AI",
            icon: Sparkles,
            color: styles.nav.colors.careerAssistant
        }
    ];

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
            hobbies : [
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



    return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor:"" }}>
            <Header/>
            
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-full h-full object-cover"
                style={{ filter: 'brightness(0.7) contrast(1.2)' }}
                onLoadedMetadata={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.playbackRate = 1.5;
                }}
            >
                <source src='/assets/vids/amazingRetro.mp4' type="video/mp4" />
            </video>

            <main className="relative z-10">
                {/* Hero Section */}
                <div className="max-w-5xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Transform Your <span style={{ color: styles.nav.colors.careerAssistant }}>Career Journey</span>
                            </h1>
                            <p className="text-lg md:text-xl max-w-[500px]" style={{ color: styles.text.subtitle }}>
                                AI-powered platform that revolutionizes how you manage your job search and career development.
                            </p>
                            <div className="flex gap-4">
                                <Link 
                                    href="/dashboard/home"
                                    className="px-6 py-2 rounded-lg text-sm transition-all duration-300 hover:translate-y-[-2px]"
                                    style={{ 
                                        backgroundColor: styles.nav.colors.careerAssistant,
                                        color: '#ffffff'
                                    }}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>

                        <div ref={containerRef} className="relative h-[600px] rounded-lg p-4 w-full bg-white overflow-y-scroll no-scrollbar">
                           
                            <TechBroResume
                                scale={1}
                                zoom={0.5}
                                data={dummyResumeData as any}
                                theme={themes['Tech Bro']}
                                registerContentRef={React.createRef}
                            />

                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="max-w-6xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                                className="p-5 rounded-lg transition-all duration-300 hover:translate-y-[-2px]"
                                style={{
                                    backgroundColor: hoverIndex === index ? `${feature.color}10` : 'transparent',
                                    border: `1px solid ${feature.color}20`
                                }}
                            >
                                <feature.icon 
                                    size={20} 
                                    style={{ color: feature.color }}
                                />
                                <h3 
                                    className="text-lg font-semibold mt-3 mb-2"
                                    style={{ color: styles.text.primary }}
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-sm" style={{ color: styles.text.subtitle }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}