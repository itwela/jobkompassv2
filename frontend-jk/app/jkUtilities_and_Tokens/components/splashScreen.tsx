'use client'

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JKLogoSVG } from "@/public/assets/svgs/logo";
export default function SplashScreen () {
    
    const { styles } = useJobKompassTheme()

    return (
        <div className={`fixed z-[500] flex place-items-center place-content-center w-full h-screen`}
        style={{backgroundColor: styles.background}}
        >
        <span className="animate-pulse place-self-center">
            <JKLogoSVG/>
        </span>
        </div>
    );
};