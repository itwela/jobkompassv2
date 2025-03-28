'use client'

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { useEffect, useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { useJobKompassUser } from '../helpers/providers/userProvider';
import { useJobKompassJobs } from '../helpers/providers/jobsProvider';
import {
    themeQuartz,
  } from "ag-grid-community";
import { JK_Colors } from '../jkUtilities_and_Tokens/colors';
import { ThemeKeys } from '../types';
ModuleRegistry.registerModules([AllCommunityModule]);

export default function JobKompassGrid() {

    const {userJobs, setUserJobs, refetchUserJobs} = useJobKompassJobs()
    const {user} = useJobKompassUser()

    // const [rowData, setRowData] = useState([
    //     { 
    //         company: "Google",
    //         title: "Senior Software Engineer",
    //         link: "https://careers.google.com/jobs/123",
    //         "date applied": "2024-01-15",
    //         status: "Applied",
    //         "resume used": "SWE_2024_v2.pdf",
    //         keywords: ["React", "TypeScript", "Cloud"],
    //         interviewed: false
    //     },
    //     { 
    //         company: "Microsoft",
    //         title: "Full Stack Developer",
    //         link: "https://careers.microsoft.com/jobs/456",
    //         "date applied": "2024-01-14",
    //         status: "Phone Screen",
    //         "resume used": "FullStack_2024_v1.pdf",
    //         keywords: ["Node.js", "Azure", "React"],
    //         interviewed: true
    //     },
    //     { 
    //         company: "Amazon",
    //         title: "Frontend Engineer",
    //         link: "https://amazon.jobs/789",
    //         "date applied": "2024-01-13",
    //         status: "Rejected",
    //         "resume used": "Frontend_2024_v1.pdf",
    //         keywords: ["JavaScript", "AWS", "Vue"],
    //         interviewed: true
    //     }
    // ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs] = useState<ColDef[]>([
        { field: "Company" },
        { field: "Title" },
        { field: "Link" },
        { field: "Date Applied" },
        { field: "Status" },
        { field: "Resume used" },
        { field: "Keywords" },
        { field: "Interviewed" },
    ]);

    const theme = themeQuartz
        .withParams(
            {
                backgroundColor: "#ffffff",
                foregroundColor: "#212226",
                browserColorScheme: "light",
            },
            "light"
        )
        .withParams(
            {
                backgroundColor: "#393939",
                foregroundColor: "#F9F9F9",
                browserColorScheme: "dark",
            },
            "dark"
    );

    useEffect(() => {
        if (user?.[0]?.color_theme) {
            const isDarkMode = user[0].color_theme === 'dark';
            document.body.dataset.agThemeMode = isDarkMode ? "dark" : "light";
        }
    }, [user]);
    
    return (
        <>
            <div className='w-full flex gap-5'>
                <div>

                </div>
                <div>

                </div>
            </div>

            <div
            className='h-[261px] w-full'
            style={{
                boxShadow: `6.18px 6.18px 0px ${JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.boxShadow}` 
            }}
            >
                <AgGridReact
                        theme={theme}
                        rowData={userJobs}
                        columnDefs={colDefs}
                />
            </div>

        </>
    )

}
