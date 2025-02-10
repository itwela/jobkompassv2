import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { fastComponentDelayTime, mediumComponentDelayTime, slowComponentDelayTime } from "@/app/jkUtilities_and_Tokens/tokens";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function FeatuureBoxes() {
    const { user, userDataIsLoading } = useJobKompassUser();
    const feaatureData = [
        {
            title: 'Applications',
            subTitle: 'View your applications and track your progress',
            vid: ""
        },
        {
            title: 'Company Hub',
            subTitle: 'View your applications and track your progress',
            vid: ""
        },
        {
            title: 'Career Assistant',
            subTitle: 'View your applications and track your progress',
            vid: ""
        },
    ]
    const [featureIndexHovered, setFeatureIndexHovered] = useState<any>(null);

    const handleFeatureMouseEnter = (index: number) => {
        setFeatureIndexHovered(index);
    };

    const handleFeatureMouseLeave = () => {
        setFeatureIndexHovered(null);
    };

    return (
        <>
        <div className="flex justify-between w-full">
            <div className="w-max my-5 flex flex-col gap-5">
                
                <Link  href={'/dashboard/applications'} className="w-full h-[40px]">
                    <BlurFade onMouseEnter={() => handleFeatureMouseEnter(0)} onMouseLeave={() => handleFeatureMouseLeave()} className="h-full flex place-items-center justify-between px-3 w-full rounded-lg" delay={fastComponentDelayTime} inView
                        style={{
                            backgroundColor: featureIndexHovered === 0 ? JK_Colors.lightBlue : JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
                            color: featureIndexHovered === 0 ? JK_Colors.blue : JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                            boxShadow: `3.18px 3.18px 0px ${JK_Colors.lightBlueAccent}`
                            }}>
                            <>
                            <p className="font-bold">{feaatureData[0].title}</p>
                            <ChevronRight color={JK_Colors.lightBlueAccent} size={15}/>
                            </>
                    </BlurFade>
                </Link>
            
                <Link href={'/dashboard/applications'} className="w-full h-[40px]">
                    <BlurFade onMouseEnter={() => handleFeatureMouseEnter(1)} onMouseLeave={() => handleFeatureMouseLeave()} className="h-full flex place-items-center justify-between px-3 w-full rounded-lg" delay={fastComponentDelayTime} inView
                        style={{
                            backgroundColor: featureIndexHovered === 1 ? JK_Colors.blue : JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
                            color: featureIndexHovered === 1 ? JK_Colors.white : JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                            boxShadow: `3.18px 3.18px 0px ${JK_Colors.blue_accent}`
                        }}>
                            <>
                            <p className="font-bold">{feaatureData[1].title}</p>
                            <ChevronRight color={JK_Colors.blue_accent} size={15}/>
                            </>
                    </BlurFade>
                </Link>


                <Link href={'/dashboard/careerassistant'} className="w-max h-[40px]">
                    <BlurFade onMouseEnter={() => handleFeatureMouseEnter(2)} onMouseLeave={() => handleFeatureMouseLeave()} className="h-full flex gap-3 place-items-center justify-between px-3 w-full rounded-lg" delay={slowComponentDelayTime} inView
                        style={{
                            backgroundColor: featureIndexHovered === 2 ? JK_Colors.indigo : JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
                            color: featureIndexHovered === 2 ? JK_Colors.white : JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                            boxShadow: `3.18px 3.18px 0px ${JK_Colors.indigo_accent}`
                        }}>
                            <>
                            <p className="font-bold">{feaatureData[2].title}</p>
                            <ChevronRight color={JK_Colors.indigo_accent} size={15}/>
                            </>
                    </BlurFade>
                </Link>
            </div>

            <div className="w-[70%] flex place-items-center place-content-center">
                <p className="font-bold">Cool edited video will go here</p>
            </div>
        </div>
        </>
    )
}