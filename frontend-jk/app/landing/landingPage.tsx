'use client'

import Header from "../jkComponents/jkLandingHeader";
import { useJobKompassLanding } from "../helpers/providers/landingProvider";
import React, { useEffect, useRef, useState } from "react";
import { Briefcase, Building2, Sparkles } from "lucide-react";
import { useJobKompassTheme } from "../../../frontend-jk/app/helpers/providers/themeProvider";
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
import { JK_Design_System } from "../jkUtilities_and_Tokens/styles";
import { grillages } from "../fonts";
import JkHeroSection_Landing from "./components/heroComponent";

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
               <JkHeroSection_Landing/>
            </main>
        </div>
    )
}
