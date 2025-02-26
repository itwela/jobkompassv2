'use client'

import { useEffect, useRef, useState } from "react"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { ThemeKeys } from "@/app/types"

interface DateScrollerProps {
    dates: any;
    scrollContainerRef: any;
}

export default function DateScroller({ dates, scrollContainerRef }: DateScrollerProps) {
    const [activeTickIndex, setActiveTickIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const { user } = useJobKompassUser()
    const { styles } = useJobKompassTheme()
    
    // Number of ticks to display
    const TICK_COUNT = 10

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current
        if (!scrollContainer) return

        const handleScroll = () => {
            const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight
            const currentScroll = scrollContainer.scrollTop
            const percentage = (currentScroll / maxScroll)
            
            // Calculate which tick should be active based on scroll position
            const activeIndex = Math.round(percentage * (TICK_COUNT - 1))
            setActiveTickIndex(activeIndex)
        }

        scrollContainer.addEventListener('scroll', handleScroll)
        return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }, [scrollContainerRef])

    const handleTickClick = (index: number) => {
        if (!scrollContainerRef.current) return
        
        const scrollContainer = scrollContainerRef.current
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight
        const percentage = index / (TICK_COUNT - 1)
        scrollContainer.scrollTop = percentage * maxScroll
    }

    return (
        <div ref={containerRef} className="flex select-none gap-1 h-full w-[31.8px] md:w-[61.8px] flex-col justify-between place-items-center relative">
            {Array.from({ length: TICK_COUNT }).map((_, index) => (
                <div
                    key={index}
                    className="w-full py-1 flex items-center justify-center cursor-pointer"
                    onMouseEnter={() => handleTickClick(index)}
                >
                    <div 
                        className={`h-[2px] hover:scale-125 hover:w-[28px] transition-all duration-200 rounded-full ${
                            index === activeTickIndex ? 'w-[24px]' : 'w-[12px]'
                        }`}
                        style={{
                            backgroundColor: index === activeTickIndex 
                                ? styles.nav.colors.applications
                                : styles.card.accent,
                            boxShadow: index === activeTickIndex 
                                ? `0 0 10px ${styles.card.boxShadow}` 
                                : 'none',
                            transform: `rotate(${index % 2 === 0 ? '0deg' : '0deg'})`,
                        }}
                    />
                </div>
            ))}
        </div>
    )
}