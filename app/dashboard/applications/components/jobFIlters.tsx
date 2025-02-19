'use client'

import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors"
import { ThemeKeys } from "@/app/types"

export default function JobFilters({searchQuery, setSearchQuery, filterColors, ref}: {searchQuery?: any, setSearchQuery?: any, filterColors?: any, ref?: any}) {
    const { user } = useJobKompassUser()
    const { styles } = useJobKompassTheme()

    const handleSearch = (e: any) => {

        console.log("e is",e)

        // if (e.target.value != '') {
        //     setSearchQuery('')
        //     return
        // }

        // setSearchQuery(e.target.value)
    }


    return (
        <div className="flex gap-2 h-max overflow-x-auto no-scrollbar">
            {filterColors && Object.entries(filterColors).map(([status, color]) => (
                <div 
                    key={status} 
                    onClick={(e) => {handleSearch(e)}}
                    className="flex z-[10] cursor-pointer px-3 py-2 my-2 rounded-lg items-center gap-2 transition-all duration-300 hover:translate-y-[-2px] hover:scale-[1.02]"
                    style={{
                        backgroundColor: `${styles.card.background}90`,
                        border: styles.card.border,
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                    }}
                >
                    <span 
                        className="text-sm font-medium"
                        style={{
                            color: styles.text.primary
                        }}
                    >
                        {status}
                    </span>
                    <div 
                        className="w-4 h-4 rounded-full transition-transform duration-300 hover:scale-110" 
                        style={{ 
                            backgroundColor: status === 'Interested' ? styles.status.interested : 
                                        status === 'Ghosted' ? styles.status.ghosted :
                                        color as string,
                            boxShadow: `0 0 10px ${color}`
                        }}
                    />
                </div>
            ))}
        </div>
    )
}