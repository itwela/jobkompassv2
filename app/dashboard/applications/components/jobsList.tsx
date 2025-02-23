'use client'

import { JKLogoSVG } from '@/public/assets/svgs/logo'
import { useJobKompassApplicationBuddy } from '@/app/helpers/providers/applicaitonBuddyProvider'
import { JobKompassJobsType, useJobKompassJobs } from '@/app/helpers/providers/jobsProvider'
import { useJobKompassTheme } from '@/app/helpers/providers/themeProvider'
import { useJobKompassUser } from '@/app/helpers/providers/userProvider'
import DateScroller from '@/app/jkComponents/jkDateScroller'
import { JK_Colors } from '@/app/jkUtilities_and_Tokens/colors'
import { JK_Styles } from '@/app/jkUtilities_and_Tokens/styles'
import { ThemeKeys } from '@/app/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useSidebar } from '@/components/ui/sidebar'
import { ArrowDown, Eye, EyeOff, FileText, FileUser, NotebookPen } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ApplicationBuddy from './applicationBuddy'
import JobFilters from './jobFIlters'

export default function JobsList() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const { user } = useJobKompassUser()
    const { userJobs } = useJobKompassJobs()
    const { open } = useSidebar()
    const [searchQuery, setSearchQuery] = useState('')
    const [showDescription, setShowDescription] = useState(false)
    const { styles } = useJobKompassTheme()
    const { isOpen: isBuddyOpen, setIsOpen: setIsBuddyOpen } = useJobKompassApplicationBuddy()
    const [sidebarOpen, setSidebarOpen] = useState(true)

    useEffect(() => {
        const handleSidebarChange = (event: CustomEvent) => {
            setSidebarOpen(event.detail.open);
        };

        window.addEventListener('sidebarStateChange', handleSidebarChange as EventListener);
        return () => {
            window.removeEventListener('sidebarStateChange', handleSidebarChange as EventListener);
        };
    }, []);

    // Filter jobs based on search query
    const filteredJobs = userJobs?.filter(job => 
        job.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.Company.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filterColors = {
        Interested: styles.status.interested,
        Applied: styles.status.applied,
        Interviewing: styles.status.interviewing,
        Offer: styles.status.offer,
        Rejected: styles.status.rejected,
        Ghosted: styles.status.ghosted,
    }

    const jobListRef = useRef<HTMLDivElement>(null)
    const screenWxH = useRef<HTMLDivElement>(null)
    const [searchWidth, setSearchWidth] = useState<number>(0)
    const fullScreenRef = useRef<HTMLDivElement>(null)

    // Update search width when jobListRef changes or sidebar state changes
    useEffect(() => {
        if (jobListRef.current) {
            setSearchWidth(jobListRef.current.offsetWidth)
        }
    }, [jobListRef.current, sidebarOpen])

    // Update search width when window resizes
    useEffect(() => {
        const handleResize = () => {
            if (jobListRef.current) {
                setSearchWidth(jobListRef.current.offsetWidth)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
        {isBuddyOpen && (
            <div ref={fullScreenRef} className="fixed place-self-start inset-0 flex flex-col items-center justify-center w-screen backdrop-blur-sm left-0 z-[20]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        )}

        <div className='flex flex-col w-full h-full'>
            <div className="flex flex-col gap-2 w-full max-h-fit" style={{ overflow: 'clip' }}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="my-2 p-4 outline-none rounded-xl transition-all duration-300 backdrop-blur-sm border border-opacity-20 hover:border-opacity-40 focus:border-opacity-60"
                    style={{
                        width: `${searchWidth}px`,
                        backgroundColor: `${styles.card.background}40`,
                        borderColor: styles.card.boxShadow,
                        color: styles.text.primary.split(' ')[0],
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                    }}
                />
                <JobFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterColors={filterColors}/>
            </div>

            <div ref={jobListRef} className={`relative h-[328px] w-full justify-between flex gap-3 transition-all duration-300 ${sidebarOpen ? '' : 'md:ml-0'}`}>
                <div className="absolute top-0 left-0 right-0 h-[10px] w-full z-10 pointer-events-none"
                    style={{
                        background: `linear-gradient(to bottom, ${styles.background}, transparent)`
                }}/>
                <div ref={scrollContainerRef} className="h-full flex flex-wrap md:flex-nowrap md:grid md:grid-cols-2 no-scrollbar overflow-y-scroll w-full gap-5">
                    

                    {filteredJobs?.map((job: JobKompassJobsType, i: number) => (
                        <div key={i} className='h-max w-full pt-[5%] w-full'>

                                <Card key={i} className='w-full relative pt-3 relative h-[400px] overflow-hidden flex flex-col gap-2 px-5 rounded-lg mb-3 transform transition-all duration-700 hover:translate-y-[-2px]'
                                    style={{
                                        color: styles.text.primary,
                                        backgroundColor: styles.card.background,
                                        border: styles.card.border
                                    }}>
                                     
                                        <div className='pt-2 pb-8 w-full h-[90%] no-scrollbar overflow-y-scroll'>


                                            <CardHeader className='p-0'>
                                                <div className="flex pb-2 justify-between">
                                                    <CardDescription className={`${JK_Styles(open).superSubtitleSize} font-bold  w-[50%] opacity-[61.8%]`}>{job.Company}</CardDescription>
                                                    <div className="flex gap-1 w-max  h-max">
                                                        <FileText className='cursor-pointer' size={15} />
                                                        <FileUser className='cursor-pointer' size={15} />                            
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <NotebookPen onClick={() => {setIsBuddyOpen(!isBuddyOpen);}} className='cursor-pointer' size={15} />
                                                            </DialogTrigger>

                                                            <DialogContent ref={fullScreenRef} className='!w-max h-max !border-none !outline-none ' style={{ color: styles.text.primary }}>


                                                                <div style={{ 
                                                                    color: styles.text.primary,
                                                                    // backgroundColor: styles.card.background
                                                                }}>
                                                                    <DialogTitle> 
                                                                    </DialogTitle>

                                                                    <DialogContent ref={fullScreenRef} style={{backgroundColor: styles.background
                                                                    }} >
                                                                        <ApplicationBuddy/>
                                                                    </DialogContent>

                                                                    <DialogFooter>
                                                                    </DialogFooter>

                                                                </div>

                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </div>
                                                <CardTitle className='font-bold'>
                                                    <a href={job.Link} target='_blank' className="">
                                                        {job.Title}
                                                    </a>
                                                </CardTitle>
                                                <CardDescription className={`${JK_Styles(open).superSubtitleSize} font-bold  flex justify-between  w-full `}>
                                                   <p className="opacity-[61.8%]">
                                                    {job['Date Applied']}
                                                   </p>
                                                    <div className='w-max py-1 px-2 text-xs font-medium rounded-lg'
                                            style={{
                                                backgroundColor: filterColors[job.Status as keyof typeof filterColors],
                                                color: '#ffffff'
                                            }}
                                        >
                                            {job.Status}
                                        </div>
                                                </CardDescription>
                                                {/* <div className="flex gap-1">
                                                </div> */}
                                                <div className='h-[5px]'></div>

                                                <div onClick={() => setShowDescription(!showDescription)}  className='flex cursor-pointer gap-3 w-full justify-between place-items-center'>

                                                    <div className='flex gap-1 place-items-start'>
                                                        <JKLogoSVG size='small' />
                                                        <p className='pl-[1px] font-bold'>Description</p>
                                                    </div>

                                                    <div style={{ backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor }} className='h-[0.5px] opacity-[61.8%] w-full'></div>

                                                    {showDescription === false ? <EyeOff size={25} className='place-self-center' /> : <Eye size={25} className='place-self-center' />                                                }

                                                </div>

                                                {showDescription === true && (
                                                    <>
                                                    <CardDescription style={{ color: styles.text.primary }}
                                                        className={`${JK_Styles(open).superSubtitleSize} opacity-[81.618%]`}>
                                                            {job.Description}
                                                    </CardDescription>
                                                    </>
                                                )}

                                            </CardHeader>

                                            <div className='h-[15px]'></div>
                                            <div className='h-[15px]'></div>
                                            <CardContent className='w-full h-max p-0 flex flex-col gap-2'>
                                               
                                                    {/* Keywords */}
                                                    <div className='flex gap-3 w-full justify-between place-items-center'>
                                                    
                                                        <div className='flex gap-1 place-items-start'>
                                                            <JKLogoSVG size='small'/>
                                                            <p className='pl-[1px] font-bold'>Keywords</p>
                                                        </div>

                                                        <div style={{backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor}} className='h-[0.5px] opacity-[61.8%] w-full'></div>

                                                        <ArrowDown size={25} className='place-self-center'/>

                                                    </div>

                                                    <div className='w-full p-0 flex flex-wrap gap-2'>
                                                        {job?.Keywords?.map((keyword: string, i: number) => (
                                                            <span key={i} 
                                                                className="px-3 py-1 text-xs rounded-full transition-colors hover:bg-white/10"
                                                                style={{
                                                                    backgroundColor: styles.card.accent,
                                                                    border: styles.card.border,
                                                                    color: styles.text.secondary
                                                                }}
                                                            >
                                                                {keyword}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div className='h-[15px]'></div>

                                                    {/* Resume Used */}
                                                    <div className='flex gap-3 w-full justify-between place-items-center'>
                                                    
                                                        <div className='flex gap-1 place-items-start'>
                                                            <JKLogoSVG size='small'/>
                                                            <p className='pl-[1px] font-bold'>Resume</p>
                                                        </div>

                                                        <div style={{backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor}} className='h-[0.5px] opacity-[61.8%] w-full'></div>

                                                        <ArrowDown size={25} className='place-self-center'/>

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

                                                    <div className='h-[15px]'></div>


                                            </CardContent>


                                            <div></div>
                                            
                                        </div>
                                </Card>

                        </div>
                    ))}

                    {/* NOTE This div is here to allow for users to see all jobs. A placeholder that will not be touched. */}
                    <div className='w-full h-[60px] flex gap-2 p-5 rounded-lg place-items-center mb-3'
                        style={{
                            backgroundColor: "transparent"
                        }}>
                    </div>
                    {/* NOTE This div is here to allow for users to see all jobs. A placeholder that will not be touched. */}
                    <div className='w-full h-[10px] flex gap-2 p-5 rounded-lg place-items-center mb-3'
                        style={{
                            backgroundColor: "transparent"
                        }}>
                    </div>

                    </div>

                    <DateScroller
                        dates={filteredJobs}
                        scrollContainerRef={scrollContainerRef}
                    />

                {/* this is the shadow that fades the jobs into nothing :D */}
                <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                    style={{
                        background: `linear-gradient(to bottom, transparent, ${styles.background})`
                }}
                />
            </div>
        </div>
        </>
    )
}

// {userJobs?.map((job: JobKompassJobsType, i: number) => (
//     <div key={i} className='w-full h-[60px] flex gap-2 p-5 rounded-lg place-items-center mb-3'
//     style={{
//         backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
//         boxShadow: `6.18px 6.18px 0px ${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.boxShadow}`       
//     }}>
//         <h2>Title: {job.Title}</h2>
//         <h2>Company: {job.Company}</h2>
//         <h2>Date App.: {job["Date Applied"]}</h2>
//         <h2>Link: {job.Link}</h2>
//         <h2>Keywords: {job.Keywords}</h2>
//         <h2>Resume U.: {job["Resume used"]}</h2>
//         <h2>Status: {job.Status}</h2>
//     </div>
// ))}





