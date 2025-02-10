'use client'

import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import JkGap from "@/app/jkUtilities_and_Tokens/components/jkGap";
import { ThemeKeys } from "@/app/types";

export default function ShortCuts () {
     
    const {user, userDataIsLoading} = useJobKompassUser();

    return (
        <>
        <div className="md:h-[45%] h-[200px] flex flex-col gap-2">

            <div>
                <h2 className="text-2xl font-bold">Shortcuts</h2>
                <h3 style={{opacity: 0.618}}>Get to where you need to go, fast!</h3>
            </div>
            
            <JkGap/>
            <div 
            className=" h-full  w-full rounded-lg"
            style={{
                backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_shadow,
            }}
            >

            </div>
        </div>
        </>
    )
}