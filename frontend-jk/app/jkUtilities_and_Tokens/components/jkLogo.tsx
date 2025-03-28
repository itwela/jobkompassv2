'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { useSidebar } from "@/components/ui/sidebar";
import { JKLogoSVG } from "@/public/assets/svgs/logo";
import { useState } from "react";
import { JK_Styles } from "../styles";

export const JKLogo = () => {
    const [isHovered, setIsHovered] = useState(false)
    const { open, state } = useSidebar();
    const { user } = useJobKompassUser();
    const { styles } = useJobKompassTheme();

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative my-2 overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-2px]`}
            style={{
            }}
        >
            <div
                className="relative w-full flex justify-center"
                style={{
                    justifyContent: open ? "flex-start" : "center",
                }}
            >
                <div 
                    className="absolute inset-y-0 left-0 w-1"
                />

                <div 
                    className={`relative z-10 flex items-center gap-3 ${
                        open ? "px-4 py-3" : "p-2"
                    }`}
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
                            className={`${JK_Styles(open).logo} text-lg font-bold`}
                        >
                            JobKompass
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}