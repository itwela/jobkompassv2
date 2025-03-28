'use client'

import { grillages } from "@/app/fonts"
import { JK_Design_System } from "@/app/jkUtilities_and_Tokens/styles"
import { Briefcase, Building2, Sparkles } from "lucide-react"
import Link from "next/link"

export default function JkHeroSection_Landing () {
  return (
   <>
    <div className="px-4 py-24 max-w-7xl mx-auto">
                    <div className="flex flex-col w-full gap-12 items-center text-center">
                        <div className="flex flex-col gap-6 max-w-4xl">
                            <h1 style={{color: '#fff'}} className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] font-grillages font-[600]`}>
                                Land Your Dream Job With an AI-Powered Resume
                            </h1>
                            <p style={{color: '#fff9'}} className={`text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed`}>
                                Stop spending hours crafting resumes. Our AI creates tailored, ATS-friendly resumes that get you more interviews, guaranteed.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                                <Link 
                                    href="/dashboard/home"
                                    className="px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                                    style={{ 
                                        backgroundColor: JK_Design_System.colors.primary.blue,
                                        color: '#fff'
                                    }}
                                >
                                    Create Your Resume Now
                                </Link>
                                <Link 
                                    href="#features"
                                    className="px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:translate-y-[-2px]"
                                    style={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: '#fff',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    See How It Works
                                </Link>
                            </div>
                            <div className="flex flex-wrap justify-center gap-8 mt-8" style={{color: '#fff9'}}>
                                <div className="flex items-center gap-2">
                                    <Sparkles size={20} />
                                    <span>AI-Powered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Building2 size={20} />
                                    <span>ATS-Optimized</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase size={20} />
                                    <span>Industry-Specific</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
   </>
  )
}