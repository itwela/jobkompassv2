'use client'

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { Card } from "@/components/ui/card";
import { Briefcase, Building2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Shortcuts() {
    const [activeShortcut, setActiveShortcut] = useState<number | null>(null);
    const { styles } = useJobKompassTheme();

    const shortcuts = [
        { title: 'Applications', url: '/dashboard/applications', icon: Briefcase, color: styles.nav.colors.applications },
        { title: 'Company Hub', url: '/dashboard/companyhub', icon: Building2, color: styles.nav.colors.companyHub },
        { title: 'Career Assistant', url: '/dashboard/careerassistant', icon: Sparkles, color: styles.nav.colors.careerAssistant },
    ];

    return (
        <div className="w-full space-y-4">
            <div>
                <h2 className="font-semibold" style={{color: styles.text.title}}>Shortcuts</h2>
                <p style={{color: styles.text.subtitle}}>Get to where you need to go, fast!</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {shortcuts.map((shortcut, index) => {
                    const Icon = shortcut.icon;
                    return (
                        <Card
                            key={index}
                            onMouseEnter={() => setActiveShortcut(index)}
                            onMouseLeave={() => setActiveShortcut(null)}
                            className="group relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] cursor-pointer"
                            style={{
                                backgroundColor: styles.card.background,
                                border: styles.card.border,
                                boxShadow: activeShortcut === index ? `0 0 10px ${shortcut.color}40` : 'none'
                            }}
                            onClick={() => window.location.href = shortcut.url}
                        >
                            <div className="relative h-full">
                                <div 
                                    className="absolute inset-y-0 left-0 w-1 transition-all duration-300"
                                    style={{
                                        backgroundColor: activeShortcut === index ? shortcut.color : 'transparent',
                                        opacity: activeShortcut === index ? 1 : 0
                                    }}
                                />
                                <div className="p-6 flex flex-col items-center gap-4">
                                    <div 
                                        className="p-3 rounded-xl transition-all duration-300"
                                        style={{
                                            backgroundColor: activeShortcut === index ? `${shortcut.color}10` : styles.card.accent,
                                            transform: activeShortcut === index ? 'scale(1.1)' : 'scale(1)'
                                        }}
                                    >
                                        <Icon 
                                            size={24}
                                            className="transition-colors duration-300"
                                            style={{
                                                color: activeShortcut === index ? shortcut.color : styles.text.secondary
                                            }}
                                        />
                                    </div>
                                    <span 
                                        className="font-medium transition-colors duration-300"
                                        style={{
                                            color: activeShortcut === index ? shortcut.color : styles.text.secondary
                                        }}
                                    >
                                        {shortcut.title}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}