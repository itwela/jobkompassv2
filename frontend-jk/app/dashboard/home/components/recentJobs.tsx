'use client'

import { JobKompassJobsType, useJobKompassJobs } from "../../../../../frontend-jk/app/helpers/providers/jobsProvider";
import { useJobKompassTheme } from "../../../../../frontend-jk/app/helpers/providers/themeProvider";
import JKJobCard from "../../../../../frontend-jk/app/jkComponents/jkJobCard";
import { useJobKompassApplicationBuddy } from "../../../../../frontend-jk/app/helpers/providers/applicaitonBuddyProvider";

export default function RecentJobs () {
    const { userJobs } = useJobKompassJobs()
    const { styles } = useJobKompassTheme();
    const { isOpen: isBuddyOpen, setIsOpen: setIsBuddyOpen } = useJobKompassApplicationBuddy();
    
    const filterColors = {
        Interested: styles.status.interested,
        Applied: styles.status.applied,
        Interviewing: styles.status.interviewing,
        Offer: styles.status.offer,
        Rejected: styles.status.rejected,
        Ghosted: styles.status.ghosted,
    }

    return (
        <div className="w-full space-y-4">
            <div>
                <h2 style={{color: styles.text.title}}>Recent Jobs</h2>
                <p style={{color: styles.text.subtitle}}>Your most recent applications</p>
            </div>
            <div className="space-y-6">
                {userJobs
                    ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    ?.slice(0, 5)
                    ?.map((job: JobKompassJobsType, i: number) => (
                        <JKJobCard
                            key={i}
                            job={job}
                            filterColors={filterColors}
                            onBuddyOpen={() => setIsBuddyOpen(!isBuddyOpen)}
                        />
                    ))}
            </div>
        </div>
    )
}