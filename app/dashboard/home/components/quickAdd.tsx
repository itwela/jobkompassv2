'use client'

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { Card } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { LucideArrowRight, LucideLoader, Link as LinkIcon } from "lucide-react";
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
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState('');
    const {open} = useSidebar()
    const [isHovered, setIsHovered] = useState(false);
    const { styles } = useJobKompassTheme();
    const quickAdd = async (url: string) => {
        if (!url || url.length < 10) {
            setError('Please enter a URL');
            return;
        }
        
        try {
            setLoading(true);
            setError('');
            const jobData = await handleGetJobWithStageHand(url, user?.[0]?.user_id);
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
        <div className="transform transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 style={{color: styles.text.title}} className="">Quick Add</h2>
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
                        {error ? error : quickAddDescription}
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
                            placeholder="Paste job URL here..."
                            className="w-full p-4 bg-transparent outline-none"
                            style={{
                                color: styles.text.primary,
                            }}
                        />
                            <button
                                onClick={() => {error ? setError(null) : quickAdd(url)}}
                                disabled={loading}
                                className="absolute right-0 top-0 h-full px-4 flex items-center justify-center transition-all duration-300 hover:bg-white/10"
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