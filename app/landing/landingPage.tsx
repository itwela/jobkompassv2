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
import JkGradientVideo from "../jkComponents/jkGradientVideo";
import { Marquee3D } from "./components/resumeMarque";
import PromoResume from "../jkComponents/PromoResume/promoResume";
import { JKLogoSVG } from "@/public/assets/svgs/logo";
import { BorderBeam } from "@/src/components/magicui/border-beam";

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





    return (
        <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "transparent" }}>
            <Header/>
            
            {/* Background Video */}

            <div className="fixed w-screen h-[100vh] z-[-1]">
            <JkGradientVideo
                videoSrc="futureCIty1Compressed.mp4"
            />
            </div>
        
          

            <main className="relative z-10 my-[52px]">
                {/* Hero Section */}
                <div  className="px-4 py-16">
                    <div className="flex flex-col w-full h-full gap-8 items-center">
                        <div className="flex w-full flex-col gap-5 place-items-center place-content-center">
                            <h1 style={{color: '#fff'}} className="text-5xl  sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center tracking-tight">
                                Create 10 Resumes, in 10 minutes, guaranteed.
                            </h1>
                            <p style={{color: '#fff9'}} className="text-lg text-center md:text-2xl max-w-[500px]" >
                                Revolutionizing how you manage your job search and career development.
                            </p>
                            <div className="flex gap-4">
                                <Link 
                                    href="/dashboard/home"
                                    className="px-6 py-2 rounded-lg text-sm transition-all duration-300 hover:translate-y-[-2px]"
                                    style={{ 
                                        backgroundColor: styles.white,
                                        color: styles.black
                                    }}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>

                          
                          <div
                          style={{
                                    border: `1px solid ${styles.text.subtitle}20`
                          }}
                          className="w-[95%] bg-transparent p-1 relative max-w-[8in] max-h-[500px] overflow-y-scroll overflow-x-hidden no-scrollbar rounded-lg">

                            {/* @ medium this will just be an image to handle responsiveness */}
                            <PromoResume
                                scale={1}
                                zoom={0.5}
                                theme={themes['Tech Bro']}
                                registerContentRef={React.createRef}
                            />
                             <BorderBeam
                                    duration={4}
                                    size={300}
                                    reverse
                                    className="!absolute from-transparent z-[1] via-[#219BE4] to-transparent"
                                />

                        </div>

                    </div>
                </div>

                {/* Features Grid */}
                <div  className="px-4 py-16 w-full flex place-content-center">
                    <div className="grid grid-cols-1 w-[95%] md:grid-cols-3 gap-6">
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