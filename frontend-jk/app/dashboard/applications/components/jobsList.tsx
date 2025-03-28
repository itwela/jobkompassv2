'use client'

import { useJobKompassApplicationBuddy } from '@/app/helpers/providers/applicaitonBuddyProvider'
import { JobKompassJobsType, useJobKompassJobs } from '@/app/helpers/providers/jobsProvider'
import { useJobKompassTheme } from '@/app/helpers/providers/themeProvider'
import { useJobKompassUser } from '@/app/helpers/providers/userProvider'
import DateScroller from '@/app/jkComponents/jkDateScroller'
import JKJobCard from '@/app/jkComponents/jkJobCard'
import { useSidebar } from '@/components/ui/sidebar'
import { useEffect, useRef, useState } from 'react'
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
    const filteredJobs = userJobs?.filter(job => {
        const searchLower = searchQuery.toLowerCase();
  
        // If no search query, show all jobs
        if (!searchQuery) return true;
        
        // Check if search query matches status (case-insensitive)
        if (job.Status.toLowerCase() === searchLower) return true;
        
        // Check if search query matches title or company
        return job.Title.toLowerCase().includes(searchLower) ||
               job.Company.toLowerCase().includes(searchLower) ||
               job.Keywords?.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
               job.Description?.toLowerCase().includes(searchLower) ||
               job['Date Applied'].toLowerCase().includes(searchLower);
    });

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

                            <JKJobCard
                                key={i}
                                job={job}
                                filterColors={filterColors}
                                onBuddyOpen={() => setIsBuddyOpen(!isBuddyOpen)}
                            />

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





