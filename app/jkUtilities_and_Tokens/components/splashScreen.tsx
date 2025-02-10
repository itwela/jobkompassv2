'use client'

import { JKLogoSVG } from "@/app/assets/svgs/logo";
import { JK_Styles } from "../styles";
import { useQuery } from "@tanstack/react-query";
import { ThemeKeys } from "@/app/types";
import { JK_Colors } from "../colors";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
export default function SplashScreen () {
    

    return (
        <div className={`flex place-items-center place-content-center w-screen h-screen`}
        style={{backgroundColor: JK_Colors?.black}}
        >
        <span className="animate-pulse scale-[200%]">
            <JKLogoSVG/>
        </span>
        </div>
    );
};