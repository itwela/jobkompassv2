'use client';

import { useSidebar } from "@/components/ui/sidebar";
import { JK_Styles } from "../styles";
import { JKLogoSVG } from "@/app/assets/svgs/logo";
import { useState } from "react";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { JK_Colors } from "../colors";
import { ThemeKeys } from "@/app/types";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";

export const JKLogo = () => {
    const [isHovered, setIsHovered] = useState(false)
    const { open, state } = useSidebar();
    const { user } = useJobKompassUser();
    const { styles } = useJobKompassTheme();

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative my-2 overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
            style={{
                backgroundColor: styles.card.background,
                border: styles.card.border,
                // backdropFilter: 'blur(8px)'
            }}
        >
            <div className="relative">
                <div 
                    className="absolute inset-y-0 left-0 w-1"
                    style={{
                        // backgroundColor: isHovered ? styles.icon.accent : 'transparent',
                        // transition: 'background-color 0.3s ease',
                        // boxShadow: isHovered ? `0 0 10px ${styles.icon.accent}` : 'none'
                    }}
                />

                <div className={`${open ? "relative z-10 flex items-center gap-3 px-4 py-3" : "relative p-2 z-10 flex items-center gap-3"} `}
                    style={{
                        justifyContent: state === 'expanded' ? "flex-start" : "center"
                    }}
                >
                    <span className="transition-all duration-300 hover:scale-105">
                        <JKLogoSVG/>
                    </span>
                    <span className={`${state === 'expanded' ? "block" : "hidden"}`}>
                        <span 
                            style={{ 
                                color: isHovered ? styles.nav.activeColor : styles.nav.inactiveColor,
                                transition: 'color 0.3s ease'
                            }} 
                            className={`${JK_Styles(open).logo} text-2xl font-bold`}
                        >
                            JobKompass
                        </span>
                    </span>
                </div>

            </div>
        </div>
    )
}