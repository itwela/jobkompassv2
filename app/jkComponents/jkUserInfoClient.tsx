'use client'

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { useSidebar } from "@/components/ui/sidebar"
import { useState } from "react"

export default function JkUserInfoClient() {
    const { user } = useJobKompassUser()
    const { styles } = useJobKompassTheme()
    const [isHovered, setIsHovered] = useState(false)
    const { open } = useSidebar()

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
            style={{
                backgroundColor: styles.nav.background,
                border: styles.nav.border,
            }}
        >
            <div className="relative w-full p-2 flex place-items-center place-content-center">
                {/* <div 
                    className="absolute inset-y-0 left-0 w-1"
                    style={{
                        backgroundColor: isHovered ? styles.nav.colors.home : 'transparent',
                        transition: 'background-color 0.3s ease'
                    }}
                /> */}
                <div className="relative z-10 flex items-center gap-3">
                    <span 
                        className="font-medium tracking-wide transition-all duration-300"
                        style={{
                            color: isHovered ? styles.nav.activeColor : styles.nav.inactiveColor,
                        }}
                    >

                        {open && (
                        <span className="">
                            {user?.[0]?.username || 'User'}
                        </span>                            
                        )}


                        {!open && (
                            <span className="">
                                {user?.[0]?.username?
                                    user[0].username.split(' ').map((name: any) => name[0]).join('').toUpperCase() :
                                    'U'
                                }
                            </span>
                        )}
                    
                    </span>
                </div>
            </div>
        </div>
    );
}