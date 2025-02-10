'use client'

import { JobKompassJobsType, useJobKompassJobs } from "@/app/helpers/providers/jobsProvider";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import JkGap from "@/app/jkUtilities_and_Tokens/components/jkGap";
import { ThemeKeys } from "@/app/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Terminal } from "@/src/components/magicui/terminal";
import { ArrowDown, FileText, FileUser, NotebookPen } from "lucide-react";
import ApplicationBuddy from "../../applications/components/applicationBuddy";
import { JKLogoSVG } from "@/app/assets/svgs/logo";
import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { useSidebar } from "@/components/ui/sidebar";
export default function RecentJobs () {

    const {user, userDataIsLoading} = useJobKompassUser();
    const { userJobs } = useJobKompassJobs()
    const {open} = useSidebar()
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
        <div className="md:w-[45%] h-max min-h-[300px] flex flex-col gap-2">
               
                <div className="">
                    <h2 className="text-2xl font-bold">Recent Jobs</h2>
                    <h3 style={{opacity: 0.618}}>Some of your most recent applications:</h3>
                </div>
                <JkGap/>
                <div className="w-full h-full rounded-lg"
                style={{
                }}
                >
                     {userJobs?.slice(0, 5)?.map((job: JobKompassJobsType, i: number) => (
                        <div key={i} className='h-max w-full w-full'>

                                <Card key={i} className='w-full pt-3  relative h-[200px] overflow-hidden flex flex-col gap-2 px-5 rounded-lg mb-3'
                                    style={{
                                        color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                                        backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,
                                        boxShadow: `6.18px 6.18px 0px ${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.boxShadow}`
                                    }}>
                                        <div className='pt-2 pb-8 w-full h-[90%] no-scrollbar overflow-y-scroll'>

                                            <div className='w-[6.18px] left-0 top-0 absolute  rounded-l-lg rounded-bl-lg absolute h-full'
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
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <NotebookPen size={15} />
                                                            </DialogTrigger>

                                                            <DialogContent className='py-[10%] w-max outline-none' style={{  color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor, }}>

                                                                <Terminal  style={{ color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor, backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg_accent,}} className="sm:max-w-[425px]">

                                                                    <DialogHeader className='flex flex-col w-full place-items-start'>
                                                                        <DialogTitle className='w-full text-left flex place-items-end'><JKLogoSVG size='small'/> Application Buddy</DialogTitle>
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
                                                {/* <div className="flex gap-1">
                                                </div> */}
                                                <div className='h-[5px]'></div>
                                                <div className='flex gap-3 w-full justify-between place-items-center'>

                                                    <div className='flex gap-1 place-items-start'>
                                                        <JKLogoSVG size='small' />
                                                        <p className='pl-[1px] font-bold'>Description</p>
                                                    </div>

                                                    <div style={{ backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor }} className='h-[0.5px] opacity-[61.8%] w-full'></div>

                                                    <ArrowDown size={25} className='place-self-center' />

                                                </div>
                                                <CardDescription style={{ color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor }}
                                                    className={`${JK_Styles(open).superSubtitleSize} opacity-[81.618%]`}>
                                                        {job.Description}
                                                </CardDescription>
                                            </CardHeader>

                                            <div className='h-[15px]'></div>
                                            <CardContent className='w-full h-max p-0 flex flex-col gap-2'>
                                               
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

                                            </CardContent>


                                            <div></div>
                                            
                                        </div>
                                </Card>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}