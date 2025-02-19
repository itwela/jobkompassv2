'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { fastComponentDelayTime, mediumComponentDelayTime, slowComponentDelayTime } from "@/app/jkUtilities_and_Tokens/tokens";
import { ChevronRight, Briefcase, Building2, Sparkles, Bot } from "lucide-react";
import { useState, useEffect } from "react";
import { title } from "process";

export default function FeatureBoxes() {
    const { styles } = useJobKompassTheme();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    useEffect(() => {
        const handleSidebarChange = (event: CustomEvent) => {
            setSidebarOpen(event.detail.open);
        };

        window.addEventListener('sidebarStateChange', handleSidebarChange as EventListener);
        return () => {
            window.removeEventListener('sidebarStateChange', handleSidebarChange as EventListener);
        };
    }, []);

    const featureData = [{
        title: 'Applications',
        subTitle: 'Track your job applications',
        icon: Briefcase,
        url: '/dashboard/applications',
        color: styles.nav.colors.applications,
        delay: fastComponentDelayTime
    }, {
        title: 'Career Assistant',
        subTitle: 'Get personalized career guidance',
        icon: Sparkles,
        url: '/dashboard/careerassistant',
        color: styles.nav.colors.careerAssistant,
        delay: mediumComponentDelayTime
    }, {
        title: 'Workers',
        subTitle: 'Automate your job search',
        icon: Bot,
        url: '/dashboard/workers',
        color: styles.nav.colors.workers,
        delay: slowComponentDelayTime
    },
];

    const [featureIndexHovered, setFeatureIndexHovered] = useState<number | null>(null);

    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 w-full transition-all duration-300 ${sidebarOpen ? 'md:pl-0' : 'md:pl-0'}`}>
            {featureData.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <Link key={index} href={feature.url}>
                        <div
                            onMouseEnter={() => setFeatureIndexHovered(index)}
                            onMouseLeave={() => setFeatureIndexHovered(null)}
                            className="group relative overflow-hidden rounded-lg transition-all duration-300 h-full hover:translate-y-[-2px]"
                            style={{
                                backgroundColor: styles.card.background,
                                border: styles.card.border
                            }}
                        >
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 w-1"
                                    style={{
                                        backgroundColor: featureIndexHovered === index ? feature.color : 'transparent'
                                    }}
                                />
                                <div className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-md transition-all duration-300"
                                            style={{
                                                backgroundColor: featureIndexHovered === index ? `${feature.color}10` : 'transparent'
                                            }}>
                                            <Icon 
                                                size={20}
                                                className={`${styles.icon.default} transition-colors duration-300`}
                                                style={{
                                                    color: featureIndexHovered === index ? feature.color : styles.text.primary
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h3 style={{color: styles.text.primary}} className={`text-sm font-medium`}>{feature.title}</h3>
                                            <p style={{color: styles.text.secondary}} className={`text-xs mt-0.5`}>{feature.subTitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}