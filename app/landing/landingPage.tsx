'use client'

import Header from "../jkComponents/jkLandingHeader";
import { JK_Styles  } from "@/app/jkUtilities_and_Tokens/styles";
import { JK_Colors } from "../jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "../types";
import { useQuery } from "@tanstack/react-query";
import SplashScreen from "../jkUtilities_and_Tokens/components/splashScreen";
import { useJobKompassUser } from "../helpers/providers/userProvider";
import { useJobKompassLanding } from "../helpers/providers/landingProvider";
import { useState } from "react";
import { Briefcase, Building2, Sparkles } from "lucide-react";

export default function LandingPage() {
    const {colorPreference, setColorPreference} = useJobKompassLanding()
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    
    const features = [
        {
            title: "AI-Powered Job Tracking",
            description: "Automatically organize and track your job applications",
            icon: Briefcase,
            color: JK_Colors.lightBlue
        },
        {
            title: "Smart Company Research",
            description: "Get instant insights about potential employers",
            icon: Building2,
            color: JK_Colors.blue
        },
        {
            title: "Career Assistant",
            description: "Personalized career guidance and resume building",
            icon: Sparkles,
            color: JK_Colors.indigo
        }
    ];

    return (
        <div className="min-h-screen bg-[#0f0f0f]">
            <Header/>
            <main className="max-w-7xl mx-auto px-4 py-16 space-y-24">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white/90">
                        Job<span className="text-primary">Kompass</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 max-w-[600px] mx-auto">
                        Navigate Your Career Path with AI-Powered Precision
                    </p>
                    <div className="flex gap-4 justify-center mt-8">
                        <a 
                            href="/dashboard" 
                            className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-2px] px-8 py-3"
                            style={{
                                backgroundColor: '#1a1a1a',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <span className="text-white/90 font-medium">Get Started</span>
                        </a>
                    </div>
                </div>

                {/* Features Section */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-light tracking-tight text-white/90">Features</h2>
                        <p className="text-sm text-white/50 mt-1">Everything you need to succeed</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
                                style={{
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 w-1"
                                        style={{
                                            backgroundColor: hoverIndex === index ? feature.color : 'transparent'
                                        }}
                                    />
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg transition-all duration-300"
                                                style={{
                                                    backgroundColor: hoverIndex === index ? `${feature.color}10` : 'transparent'
                                                }}>
                                                <feature.icon 
                                                    size={24}
                                                    className="text-white/40 transition-colors duration-300"
                                                    style={{
                                                        color: hoverIndex === index ? feature.color : undefined
                                                    }}
                                                />
                                            </div>
                                            <h3 className="text-lg font-medium text-white/90">{feature.title}</h3>
                                        </div>
                                        <p className="text-sm text-white/70">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}