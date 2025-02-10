'use client'

import { JobKompassJobsType, useJobKompassJobs } from '@/app/helpers/providers/jobsProvider'
import { useJobKompassUser } from '@/app/helpers/providers/userProvider'
import DateScroller from '@/app/jkComponents/jkDateScroller'
import { JK_Colors } from '@/app/jkUtilities_and_Tokens/colors'
import { JK_Styles } from '@/app/jkUtilities_and_Tokens/styles'
import { ThemeKeys } from '@/app/types'
import { useRef, useState } from 'react'
import JobFilters from './jobFIlters'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { JKLogoSVG } from '@/app/assets/svgs/logo'
import { ArrowDown, ArrowDown01, ArrowDown10, ArrowDownAz, ArrowDownCircle, ArrowDownCircleIcon, Eye, EyeOff, FileText, FileUser, NotebookPen, X } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ApplicationBuddy from './applicationBuddy'
import { 
    Terminal,
    AnimatedSpan,
    TypingAnimation,
 } from "@/src/components/magicui/terminal"
import { useSidebar } from '@/components/ui/sidebar'
import JkGap from '@/app/jkUtilities_and_Tokens/components/jkGap'

export default function JobsList() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const { user } = useJobKompassUser()
    const { userJobs } = useJobKompassJobs()
    const { open } = useSidebar()
    const [searchQuery, setSearchQuery] = useState('')
    const [showDescription, setShowDescription] = useState(false)
    // Dummy jobs data
    // const dummyJobs: JobKompassJobsType[] = [
    //     { Title: "Frontend Developer", Company: "TechCorp", "Date Applied": "2024-01-15", Link: "techcorp.com/jobs", Keywords: ["React", "TypeScript"], "Resume used": "frontend_v2.pdf", Status: "Applied", Interviewed: false },
    //     { Title: "Software Engineer", Company: "InnovateSoft", "Date Applied": "2024-01-14", Link: "innovatesoft.com/careers", Keywords: ["Node.js", "AWS"], "Resume used": "fullstack_v1.pdf", Status: "Interview", Interviewed: false },
    //     { Title: "UI/UX Designer", Company: "DesignHub", "Date Applied": "2024-01-13", Link: "designhub.io/jobs", Keywords: ["Figma", "Adobe XD"], "Resume used": "design_v3.pdf", Status: "Rejected", Interviewed: false },
    //     { Title: "Backend Developer", Company: "DataFlow", "Date Applied": "2024-01-12", Link: "dataflow.net/positions", Keywords: ["Python", "Django"], "Resume used": "backend_v2.pdf", Status: "Interested", Interviewed: false },
    //     { Title: "DevOps Engineer", Company: "CloudTech", "Date Applied": "2024-01-11", Link: "cloudtech.com/openings", Keywords: ["Docker", "Kubernetes"], "Resume used": "devops_v1.pdf", Status: "Interview", Interviewed: false },
    //     { Title: "Mobile Developer", Company: "AppWorks", "Date Applied": "2024-01-10", Link: "appworks.dev/jobs", Keywords: ["React Native", "iOS"], "Resume used": "mobile_v2.pdf", Status: "Applied", Interviewed: false },
    //     { Title: "Full Stack Developer", Company: "WebSolutions", "Date Applied": "2024-01-09", Link: "websolutions.com/careers", Keywords: ["MERN Stack"], "Resume used": "fullstack_v3.pdf", Status: "Pending", Interviewed: false },
    //     { Title: "System Architect", Company: "ArchSystems", "Date Applied": "2024-01-08", Link: "archsystems.org/jobs", Keywords: ["System Design", "AWS"], "Resume used": "architect_v1.pdf", Status: "Interview", Interviewed: false },
    //     { Title: "QA Engineer", Company: "QualityTech", "Date Applied": "2024-01-07", Link: "qualitytech.com/positions", Keywords: ["Selenium", "Jest"], "Resume used": "qa_v2.pdf", Status: "Applied", Interviewed: false },
    //     { Title: "Product Manager", Company: "ProductHub", "Date Applied": "2024-01-06", Link: "producthub.io/careers", Keywords: ["Agile", "Scrum"], "Resume used": "pm_v1.pdf", Status: "Rejected", Interviewed: false }
    // ]

    // Filter jobs based on search query
    const filteredJobs = userJobs?.filter(job => 
        job.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.Company.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filterColors = {
        Interested: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
        Applied: JK_Colors?.lightBlue,
        Interviewing: JK_Colors.blue,
        Offer: JK_Colors.indigo,
        Rejected: JK_Colors.purple,
        Ghosted: JK_Colors.darkGrey,
    }

    return (
        <>
        <div className='flex flex-col w-full h-full'>
            
        <div className="flex flex-col gap-2 w-full max-h-fit" style={{ overflow: 'clip' }}>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full my-2 p-2 outline-none"
                    style={{
                        backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
                        borderColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.boxShadow
                    }}
                />
                <JobFilters filterColors={filterColors}/>
            </div>

            <div className="relative h-[328px] w-full justify-between flex gap-3">
                
                {/* this is the shadow that fades the jobs into nothing :D */}
                <div className="absolute top-0 left-0 right-0 h-[10px] w-full z-10 pointer-events-none"
                    style={{
                        background: `linear-gradient(to bottom, ${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg}, transparent)`
                }}/>
                <div ref={scrollContainerRef} className="h-full grid grid-cols-2 no-scrollbar overflow-y-scroll w-full gap-5">
                    

                    {filteredJobs?.map((job: JobKompassJobsType, i: number) => (
                        <div key={i} className='h-max w-full pt-[5%] w-full'>

                                <Card key={i} className='w-full pt-3  relative h-[200px] overflow-hidden flex flex-col gap-2 px-5 rounded-lg mb-3'
                                    style={{
                                        color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                                        backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
                                        boxShadow: `6.18px 6.18px 0px ${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.boxShadow}`
                                    }}>
                                        <div className='pt-2 pb-8 w-full h-[90%] no-scrollbar overflow-y-scroll'>

                                            <div className='w-[6.18px] cursor-pointer outline outline-[1px] left-0 top-0 absolute  rounded-l-lg rounded-bl-lg absolute h-full'
                                                style={{
                                                    backgroundColor: filterColors[job.Status as keyof typeof filterColors]
                                                }}
                                            >
                                            </div>

                                            <CardHeader className='p-0'>
                                                <div className="flex pb-2 justify-between">
                                                    <CardDescription className={`${JK_Styles(open).superSubtitleSize} font-bold  w-[50%] opacity-[61.8%]`}>{job.Company}</CardDescription>
                                                    <div className="flex gap-1">
                                                        <FileText size={15} />
                                                        <FileUser size={15} />                            
                                                        <Dialog >
                                                            <DialogTrigger asChild>
                                                                <NotebookPen size={15} />
                                                            </DialogTrigger>

                                                            <DialogContent className='!w-max !h-[61.8%] !border-none !outline-none' style={{  color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor, }}>


                                                                <Terminal  style={{ color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor, backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,}} className="sm:max-w-[425px] relative">
                                                                    
                                                                    <DialogClose 
                                                                    style={{
                                                                        color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                                                                    }}
                                                                    className='absolute p-2  z-[10] top-[1%] right-2'>
                                                                        <X style={{ color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor }} className="h-4 w-4" />
                                                                        </DialogClose>

                                                                    <DialogHeader className='flex flex-col w-full place-items-start'>
                                                                        <DialogTitle className='w-full text-left flex place-items-center'><JKLogoSVG size='small'/> Application Buddy</DialogTitle>
                                                                        <DialogDescription className='text-left w-full whitespace-normal'>
                                                                            Get those repeated questions 
                                                                            answered, copy and paste 
                                                                            straight into your application.
                                                                        </DialogDescription>
                                                                    </DialogHeader>

                                                                    <ApplicationBuddy/>

                                                                    <DialogFooter>
                                                                    </DialogFooter>

                                                                </Terminal>

                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </div>
                                                <CardTitle className='font-bold'>
                                                    <a href={job.Link} target='_blank' className="">
                                                        {job.Title}
                                                    </a>
                                                </CardTitle>
                                                <CardDescription className={`${JK_Styles(open).superSubtitleSize} font-bold  w-[50%] opacity-[61.8%]`}>{job['Date Applied']}</CardDescription>
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
                                                    <CardDescription style={{ color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor }}
                                                        className={`${JK_Styles(open).superSubtitleSize} opacity-[81.618%]`}>
                                                            {job.Description}
                                                    </CardDescription>
                                                    </>
                                                )}

                                            </CardHeader>

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
                                                            <div key={i} className='p-2 w-max rounded-lg'
                                                            style={{
                                                                backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
                                                                boxShadow: `1.618px 1.618px 0px ${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.boxShadow}`
                                                            }}
                                                            >
                                                                {keyword}
                                                            </div>
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

                                                            <div className='p-2 w-max rounded-lg'
                                                            style={{
                                                                backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
                                                                boxShadow: `1.618px 1.618px 0px ${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.boxShadow}`
                                                            }}
                                                            >
                                                                {job['Resume used'] || 'No Resume Selected'}
                                                            </div>

                                                        </div>

                                                    <div className='h-[15px]'></div>

                                                    {/* Status */}
                                                    <div className='flex gap-3 w-full justify-between place-items-center'>
                                                    
                                                        <div className='flex gap-1 place-items-start'>
                                                            <JKLogoSVG size='small'/>
                                                            <p className='pl-[1px] font-bold'>Status</p>
                                                        </div>

                                                        <div style={{backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor}} className='h-[0.5px] opacity-[61.8%] w-full'></div>

                                                        <ArrowDown size={25} className='place-self-center'/>

                                                    </div>



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
                    <div className='w-full h-[60px] flex gap-2 p-5 rounded-lg place-items-center mb-3'
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
                        background: `linear-gradient(to bottom, transparent, ${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg})`
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





