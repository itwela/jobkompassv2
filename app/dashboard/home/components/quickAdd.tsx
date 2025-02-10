'use client'

import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import JkGap from "@/app/jkUtilities_and_Tokens/components/jkGap";
import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { ThemeKeys } from "@/app/types";
import { Card } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { LucideArrowRight, LucideLoader } from "lucide-react";
import { useState } from "react";

export default function QuickAdd({
    user,
    handleGetJobWithStageHand
}: {
    user: any,
    handleGetJobWithStageHand: (url: string, userId: any) => Promise<any>
}) {
    const [loading, setLoading] = useState(false);
    const quickAddDescription = `Add a job link below, we will save it in your applications for you!`
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState('');
    const {open} = useSidebar()


    const quickAdd = async (url: string, userId: any) => {
       
        if (!url || url.length < 10) {
            setError('Please enter a URL');
            return;
        }

        if (!userId) {
            setError('Please login');
            return;
        } else {
            console.log("user id: ", userId);
        }
        
        try {
            setLoading(true);
            setError('');
            const jobData = await handleGetJobWithStageHand(url, userId);
            if (jobData) {
                console.log("success")
            } else {
                setError('No job information found');
            }
        } catch (err) {
            console.error('Error fetching job:', err);
            setError('Failed to fetch job information');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div className="w-full h-[200px] flex flex-col gap-2">
            <div>
                <h2 className="text-2xl font-bold">Quick Add</h2>
                <h3 style={{opacity: 0.618}}>in a rush?</h3>
            </div>
            <JkGap/>
            <Card className={`w-full mt-3 flex place-content-center flex-col gap-2 h-full rounded-lg ${JK_Styles(open).componentPadding}`}
            style={{
                backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
                // box-shadow: X-offset Y-offset Blur Spread Color;
                boxShadow: `6.18px 6.18px 0px ${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.boxShadow}`    }}
            >
                <p className={`${JK_Styles(open).superSubtitleSize} !text-sm line-clamp-2`}
                    style={{opacity: 0.618}}>
                        {error ? error : quickAddDescription}
                </p>
                <div className="flex gap-2 w-full h-[36.18px]  justify-between">
                    <div 
                        style={{
                            color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,    
                            backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.boxShadow,
                        }}
                        className="w-full h-full relative rounded-lg">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder=""
                            className="p-[6.618px] h-full outline-none w-[81.618%]  bg-transparent"
                        />
                        <button
                            onClick={() => {error ? setError(null) : quickAdd(url, user?.[0]?.user_id)}}
                            disabled={loading}
                            className="absolute opacity-[61.8%] flex place-self-center top-0 right-0 w-[40px] h-full flex place-items-center place-content-center text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            {loading ? <LucideLoader color={'#fff'} size={20}/> : error ? <LucideArrowRight color={'red'} size={20}/> : <LucideArrowRight color={JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor} size={20}/>}
                        </button>
                    </div>
                </div>
                {error && (
                    <>
                    <p className="text-red-500 mt-2 place-self-center">{error}</p>
                    <button onClick={() => {setError(null); setUrl('')}}>ok</button>
                    </>
                )}
            </Card>
        </div>
        </>
    )
}