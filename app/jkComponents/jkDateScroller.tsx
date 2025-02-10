'use client'

import { useEffect, useRef, useState, RefObject } from "react"

interface DateScrollerProps {
    dates: any;
    scrollContainerRef: any;
}

export default function DateScroller({ dates, scrollContainerRef }: DateScrollerProps) {
    const [scrollPosition, setScrollPosition] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const indicatorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const scrollContainer = scrollContainerRef.current
        if (!container || !scrollContainer) return

        const handleScroll = () => {
            // const maxScroll = scrollContainer.scrollHeight 
            const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight
            const currentScroll = scrollContainer.scrollTop
            const percentage = (currentScroll / maxScroll) * 100

            if (indicatorRef.current) {
                const blackLineHeight = container.clientHeight - 20
                const newPosition = (percentage / 100) * blackLineHeight
                indicatorRef.current.style.transform = `translateY(${newPosition}px)`
            }
        }

        scrollContainer.addEventListener('scroll', handleScroll)
        return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }, [scrollContainerRef])

    return (
        <div ref={containerRef} className="flex gap-5 h-full w-[66.8px] flex-col place-items-center relative">
            <div 
                ref={indicatorRef}
                className="w-[16.8px] h-[16.8px] bg-red-300 rounded-full absolute top-0"
                style={{ transition: 'transform 0.1s ease-out' }}
            />
            <div className="h-full w-[6.18px] bg-black rounded-full" />
        </div>
    )
}