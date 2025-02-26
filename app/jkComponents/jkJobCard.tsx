'use client'

import { JKLogoSVG } from '@/public/assets/svgs/logo'
import { JobKompassJobsType } from '@/app/helpers/providers/jobsProvider'
import { useJobKompassTheme } from '@/app/helpers/providers/themeProvider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogClose, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { useDialog } from '@/app/helpers/providers/dialogProvider'
import { ArrowDown, Eye, EyeOff, FileText, FileUser, MoreHorizontal, NotebookPen, X } from 'lucide-react'
import { useState } from 'react'
import ApplicationBuddy from '../dashboard/applications/components/applicationBuddy'

interface JKJobCardProps {
    job: JobKompassJobsType
    onBuddyOpen?: () => void
    filterColors: {
        Interested: string
        Applied: string
        Interviewing: string
        Offer: string
        Rejected: string
        Ghosted: string
    }
}

export default function JKJobCard({ job, onBuddyOpen, filterColors }: JKJobCardProps) {
    const [showDescription, setShowDescription] = useState(false)
    const { styles } = useJobKompassTheme()
    const { setIsOpen } = useDialog()
    const [showMore, setShowMore] = useState(false)

    return (
        <Card className="overflow-hidden  transition-all duration-300 hover:translate-y-[-2px] rounded-xl"
            style={{
                backgroundColor: styles.card.background,
                border: styles.card.border
            }}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 w-1"
                    style={{
                        backgroundColor: filterColors[job.Status as keyof typeof filterColors]
                    }}/>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <p className={styles.text.secondary}>{job.Company}</p>
                        <div className="flex items-center space-x-3">
                            <FileText className={`w-4 h-4 ${styles.icon.default} hover:${styles.icon.hover} transition-colors cursor-pointer`} />
                            <FileUser className={`w-4 h-4 ${styles.icon.default} hover:${styles.icon.hover} transition-colors cursor-pointer`} />
                            <MoreHorizontal onClick={() => setShowMore(!showMore)} className={`w-4 h-4 ${styles.icon.default} hover:${styles.icon.hover} transition-colors cursor-pointer`} />
                        </div>
                    </div>
                    <h3 className="text-xl font-medium mb-4">
                        <a href={job.Link} target="_blank" rel="noopener noreferrer" 
                           className={`${styles.text.primary} hover:${styles.text.secondary} transition-colors`}>
                            {job.Title}
                        </a>
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                        <p className={`${styles.text.secondary} opacity-[0.7]`}>{job['Date Applied']}</p>
                        <div
                            className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-300"
                            style={{
                                backgroundColor: filterColors[job.Status as keyof typeof filterColors],
                                color: '#ffffff'
                            }}
                        >
                            {job.Status}
                        </div>
                    </div>

                    {showMore === true && (
                        <>
                            <div className="space-y-4">
                                <div onClick={() => setShowDescription(!showDescription)} className='flex cursor-pointer gap-3 w-full justify-between place-items-center'>
                                    <div className='flex gap-1 place-items-start'>
                                        <JKLogoSVG size='small' />
                                        <p className='pl-[1px] font-bold' style={{ color: styles.text.primary }}>Description</p>
                                    </div>
                                    <div style={{ backgroundColor: styles.text.primary }} className='h-[0.5px] opacity-[61.8%] w-full'/>
                                    {showDescription ? 
                                        <Eye size={25} className='place-self-center' style={{ color: styles.text.primary }} /> : 
                                        <EyeOff size={25} className='place-self-center' style={{ color: styles.text.primary }} />
                                    }
                                </div>

                                {showDescription && job.Description && (
                                    <p className={`text-sm leading-relaxed`} style={{ color: styles.text.secondary }}>
                                        {job.Description}
                                    </p>
                                )}

                                <div className='flex gap-3 w-full justify-between place-items-center'>
                                    <div className='flex gap-1 place-items-start'>
                                        <JKLogoSVG size='small'/>
                                        <p className='pl-[1px] font-bold' style={{ color: styles.text.primary }}>Keywords</p>
                                    </div>
                                    <div style={{ backgroundColor: styles.text.primary }} className='h-[0.5px] opacity-[61.8%] w-full'/>
                                    <ArrowDown size={25} className='place-self-center' style={{ color: styles.text.primary }}/>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {job?.Keywords?.map((keyword: string, i: number) => (
                                        <span key={i} 
                                            className="px-3 py-1 text-xs rounded-full transition-colors hover:bg-white/10"
                                            style={{
                                                backgroundColor: styles.card.accent,
                                                border: styles.card.border,
                                                color: styles.text.secondary
                                            }}>
                                            {keyword}
                                        </span>
                                    ))}
                                </div>

                                <div className='flex gap-3 w-full justify-between place-items-center'>
                                    <div className='flex gap-1 place-items-start'>
                                        <JKLogoSVG size='small'/>
                                        <p className='pl-[1px] font-bold' style={{ color: styles.text.primary }}>Resume</p>
                                    </div>
                                    <div style={{ backgroundColor: styles.text.primary }} className='h-[0.5px] opacity-[61.8%] w-full'/>
                                    <ArrowDown size={25} className='place-self-center' style={{ color: styles.text.primary }}/>
                                </div>

                                <div className='w-full p-0 flex flex-wrap gap-2'>
                                    <div className='px-3 py-1 text-xs rounded-full transition-colors hover:bg-white/10'
                                        style={{
                                            backgroundColor: styles.card.accent,
                                            border: styles.card.border,
                                            color: styles.text.secondary
                                        }}
                                    >
                                        {job['Resume used'] || 'No Resume Selected'}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </Card>
    )
}