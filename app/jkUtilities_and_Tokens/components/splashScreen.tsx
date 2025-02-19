'use client'

import { JKLogoSVG } from "@/app/assets/svgs/logo";
import { JK_Styles } from "../styles";
import { useQuery } from "@tanstack/react-query";
import { ThemeKeys } from "@/app/types";
import { JK_Colors } from "../colors";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
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