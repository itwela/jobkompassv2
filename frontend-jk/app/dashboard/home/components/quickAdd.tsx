'use client'

import { GenFullJkJob_DeepSeekJk } from "../../../../../frontend-jk/app/actions/deepseekActions";
import { useJobKompassJobs } from "../../../../../frontend-jk/app/helpers/providers/jobsProvider";
import { useJobKompassTheme } from "../../../../../frontend-jk/app/helpers/providers/themeProvider";
import { Card } from "../../../../../frontend-jk/components/ui/card";
import { useSidebar } from "../../../../../frontend-jk/components/ui/sidebar";
import { Link as LinkIcon, LucideArrowRight, LucideLoader } from "lucide-react";
import { useState } from "react";

export default function QuickAdd({
    user,
    handleGetJobWithStageHand
}: {
    user: any
    handleGetJobWithStageHand: (url: string, userId: any) => Promise<any>
}) {
    const [loading, setLoading] = useState(false);
    const quickAddDescription = `Add a job link below, we will save it in your applications for you!`
    const advancedModeDescription = `If simple mode fails, just paste the entire page's content below to add to your applications!`
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState('');
    const [pageContent, setPageContent] = useState<string | null>(null);
    const {open} = useSidebar()
    const [isHovered, setIsHovered] = useState(false);
    const { styles } = useJobKompassTheme();
    const [selectedMode, setSelectedMode] = useState<'simple' | 'advanced'>('simple');
    const { refetchUserJobs } = useJobKompassJobs()
    const quickAdd = async (url: string, text?: string) => {
        
        console.log("quick add \n\nURL ---", url)
        console.log("quick add \n\nTEXT ---", text)

        if (!url || url.length < 10) {
            setError('Please enter a URL');
            return;
        }
        
        try {
            setLoading(true);
            setError('');
            const jobData = 
                selectedMode === 'simple' ? await handleGetJobWithStageHand(url, user?.[0]?.user_id) :
                selectedMode === 'advanced' ? await GenFullJkJob_DeepSeekJk(url, user?.[0]?.user_id, text as string,) : 
                {};
            if (jobData) {
                console.log("success")
            } else {
                setError('No job information found');
            }
        } catch (err) {
            console.error('Error fetching job:', err);
            setError('Failed to fetch job information');
        } finally {
            refetchUserJobs();
            setLoading(false);
        }
    }



    return (
        <div className="transform transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex gap-4 place-items-end justify-content-center">
                        <h2 style={{color: styles.text.title}} className="">Quick Add</h2>
                        <div className="flex gap-1 rounded-lg p-1" style={{ backgroundColor: styles.card.accent }}>
                            <button
                                onClick={() => setSelectedMode('simple')}
                                className="px-3 py-1 rounded-md text-sm font-medium transition-all duration-300"
                                style={{
                                    backgroundColor: selectedMode === 'simple' ? styles.nav.colors.applications : 'transparent',
                                    color: selectedMode === 'simple' ? '#fff' : styles.text.secondary,
                                }}
                            >
                                Simple
                            </button>
                            <button
                                onClick={() => setSelectedMode('advanced')}
                                className="px-3 py-1 rounded-md text-sm font-medium transition-all duration-300"
                                style={{
                                    backgroundColor: selectedMode === 'advanced' ? styles.nav.colors.applications : 'transparent',
                                    color: selectedMode === 'advanced' ? '#fff' : styles.text.secondary,
                                }}
                            >
                                Advanced
                            </button>
                        </div>
                    </div>
                    <p style={{color: styles.text.subtitle}} className="">Add a job to your applications</p>
                </div>
                <LinkIcon 
                    className={styles.icon.default}
                    size={24} 
                    style={{
                        color: isHovered ? styles.nav.colors.applications : undefined
                    }}
                />
            </div>
            
            <Card 
                className="relative overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
                style={{
                    backgroundColor: styles.card.background,
                    border: styles.card.border
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute inset-y-0 left-0 w-1"
                    style={{
                        backgroundColor: isHovered ? styles.nav.colors.applications : 'transparent'
                    }}
                />
                <div className="relative z-10 space-y-6 p-8">
                    <p className={styles.text.secondary}>
                        {
                            error ? error : 
                            selectedMode === 'simple' ? quickAddDescription :
                            advancedModeDescription
                        }
                    </p>

                    <div className="relative">
                        <div 
                            className="relative overflow-hidden rounded-lg border transition-all duration-300 focus-within:border-white/30"
                            style={{
                                backgroundColor: isHovered ? `${styles.nav.colors.applications}10` : styles.card.accent,
                                borderColor: styles.card.boxShadow
                            }}
                        >
                           
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder={'Paste job URL here...'} 
                                className="w-[90%] p-4 bg-transparent outline-none"
                                style={{
                                    color: styles.text.primary,
                                }}
                            />
                            {selectedMode === 'advanced' && (
                                <>
                                <input
                                    type="text"
                                    value={pageContent || ''}
                                    onChange={(e) => {
                                        setPageContent(e.target.value);
                                    }}
                                    placeholder={'Paste entire job page here...'} 
                                    className="w-[90%] p-4 bg-transparent outline-none"
                                    style={{
                                        color: styles.text.primary,
                                    }}
                                />
                                </>
                            )}
                            <button
                                onClick={() => {error ? setError(null) : quickAdd(url, pageContent || '')}}
                                disabled={loading}
                                className="absolute right-0 bottom-0 h-full py-4 px-4 flex items-center justify-end transition-all duration-300 bg-white/10"
                            >
                                {loading ? 
                                    <LucideLoader className={`animate-spin ${styles.text.secondary}`} size={20}/> : 
                                    error ? 
                                        <LucideArrowRight style={{ color: styles.status.rejected }} size={20}/> : 
                                        <LucideArrowRight 
                                            className="transition-transform duration-300 hover:translate-x-1" 
                                            size={20}
                                            style={{
                                                color: isHovered ? styles.nav.colors.applications : styles.text.secondary
                                            }}
                                        />
                                }
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center justify-between">
                            <p style={{ color: styles.status.rejected }} className="text-sm">{error}</p>
                            <button 
                                onClick={() => {setError(null); setUrl('')}}
                                className={`text-sm ${styles.text.tertiary} hover:${styles.text.primary} transition-colors`}
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}