'use client'

import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { JK_Colors } from "../jkUtilities_and_Tokens/colors";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { textComponentDelayTime } from "../jkUtilities_and_Tokens/tokens";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { JKLogoSVG } from "../../public/assets/svgs/logo";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { useJobKompassTheme } from "../helpers/providers/themeProvider";

export default function ConsoleHeader(
    {
    headingText,
    subTitleText,
    showLogo,
    } : 
    {
    headingText: any,
    subTitleText: any,
    showLogo?: boolean,
    }
) {
    const { open } = useSidebar()
    const { user } = useJobKompassUser()
    const {styles} = useJobKompassTheme()

    return (
        <div className="relative">
            <span
            style={{
                right: -20,
                transition: 'right 0.5s ease-in-out',
            }}
            className="absolute z-10 top-[-60px]">
                <SidebarTrigger 
                    className="bg-transparent w-10 h-10 flex items-center justify-center mx-6 my-4 rounded-lg transition-all duration-300 hover:bg-white/10" 
                />
            </span>
            <BlurFade 
                delay={textComponentDelayTime} 
                inView 
                direction="right"
                className="space-y-2"
            >
                <div className="flex  items-center gap-3">
                    {showLogo && (
                        <div 
                            className="transition-transform duration-300 hover:scale-105"
                            style={{
                                filter: `drop-shadow(0 0 8px ${styles.background})`
                            }}
                        >
                            <JKLogoSVG/>
                        </div>
                    )}
                    <h1 
                        className={`${JK_Styles(open).headingSize} font-light tracking-tight`}
                        style={{ 
                            color: styles.text.primary,
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            MozUserSelect: 'none',
                            msUserSelect: 'none'
                        }}
                    >
                        {headingText}
                    </h1>
                </div>
                <p 
                    className={`${JK_Styles(open).subTitleSize}`}
                    style={{ 
                        color: styles.text.secondary,
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none'
                    }}
                >
                    {subTitleText}
                </p>
            </BlurFade>
        </div>
    )
}