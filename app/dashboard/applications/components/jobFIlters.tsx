'use client'

import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";

export default function JobFilters({filterColors}: {filterColors?: any}) {
    return (
        <>
                    <div className="flex gap-2  px-[2.5%]">
                        {filterColors && Object.entries(filterColors).map(([status, color]) => (
                            <div key={status} className="flex px-2 p-1 rounded-lg items-center gap-2">
                                <span className="text-sm">{status}</span>
                                <div 
                                    className="w-4 h-4 rounded-full" 
                                    style={{ backgroundColor: 
                                        status === 'Interested' ? 'white' : 
                                        status === 'Ghosted' ? 'black' :
                                        color as string, 
                                    }}
                                />
                            </div>
                        ))}
                    </div>
        </>
    )
}