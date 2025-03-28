'use client'

import { useDialog } from '@/app/helpers/providers/dialogProvider'
import { JobKompassJobsType, useJobKompassJobs } from '@/app/helpers/providers/jobsProvider'
import { useJobKompassTheme } from '@/app/helpers/providers/themeProvider'
import { Card } from '@/components/ui/card'
import { JKLogoSVG } from '@/public/assets/svgs/logo'
import { ArrowDown, Eye, EyeOff, FileText, FileUser, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { deleteJobFromDb, updateJobStatusFromDb } from '../actions/databaseActions'
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
    const { refetchUserJobs } = useJobKompassJobs()
    const [showMore, setShowMore] = useState(false)
    const statusOptions = [
        { status: "Interested", color: styles.status.interested },
        { status: "Applied", color: styles.status.applied },
        { status: "Interviewing", color: styles.status.interviewing },
        { status: "Offer", color: styles.status.offer },
        { status: "Rejected", color: styles.status.rejected },
        { status: "Ghosted", color: styles.status.ghosted }
    ]
    const [wantsToEdit, setWantsToEdit] = useState(false)
    const [newStatus, setNewStatus] = useState<string | null>(null)

    const handleUpdatingJob = async (status: string) => {
        if (newStatus) {
            await updateJobStatusFromDb(job?.id, status)
            setWantsToEdit(false)
            setNewStatus(null)
            await refetchUserJobs();
        } else if (!newStatus && wantsToEdit) {
            setWantsToEdit(false)
        } else {
            setWantsToEdit(true)
        }
    }
    
    const handleDeleteJob = async () => {
        await deleteJobFromDb(job?.id)
        await refetchUserJobs();
    }

    return (
        <>
        {/* On top of this, im going to have a sort of console to delete and edit each job basically */}
        <Card className="overflow-hidden border-0 bg-transparent transition-all duration-300 hover:translate-y-[-2px]">
            <div className="flex w-full justify-between">
                
                <div
                className='w-max h-[19.5px] top-0 flex gap-1 pl-3 rounded-t-lg mr-[0%]'>
                  {statusOptions.map((option, i) => (
                    <div 
                        onClick={() => setNewStatus(option.status)}
                        key={i} 
                        style={{
                            backgroundColor: newStatus === option.status ? option.color : styles.card.background,
                            display: wantsToEdit ? 'flex' : 'none'
                        }} 
                        className='cursor-pointer hover:translate-y-[-1px] text-[10px] px-2 font-bold w-max h-[19.5px] flex place-items-center place-content-center rounded-t-lg'
                    >
                        <p 
                            className='w-[16px] h-[8px] rounded-full'
                            style={{ backgroundColor: newStatus === option.status ? '#fff' : option.color }}
                        ></p>
                    </div>
                ))}
                </div>

                <div className='w-max h-[19.5px] top-0 flex gap-1 pr-3 rounded-t-lg mr-[0%]'>
                    <div onClick={() => handleUpdatingJob(newStatus || job.Status )} style={{backgroundColor: wantsToEdit ? `${styles.nav.colors.applications}` : styles.card.background, color: wantsToEdit ? '#fff' : styles.text.primary}} className='cursor-pointer text-[10px] px-2 font-bold w-[50px] h-[19.5px] flex place-items-center place-content-center rounded-t-lg'>
                        <p>{wantsToEdit ? 'Save' : 'Edit'}</p>
                    </div>
                    <div onClick={() => handleDeleteJob()} style={{backgroundColor: styles.card.background}} className='cursor-pointer text-[10px] px-2 font-bold w-[50px] h-[19.5px] flex place-items-center  place-content-center rounded-t-lg'>
                        <p>X</p>
                    </div>
                </div>
            </div>
            <div style={{
            backgroundColor: styles.card.background,
            // border: styles.card.border,
            // borderTopWidth: 0
            }} className="relative transition-all duration-300  rounded-xl rounded-tl-none">
                <div className="absolute inset-y-0 left-0 w-1 rounded-tl-full"
                    style={{
                        backgroundColor: filterColors[job.Status as keyof typeof filterColors]
                    }}
                />
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
                           className={`${styles.text.primary} hover:${styles.text.secondary} transition-colors line-clamp-1`}>
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
                            {newStatus || job.Status}
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
        </>
    )
}