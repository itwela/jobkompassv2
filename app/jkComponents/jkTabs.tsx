// need to make a component that i can put other components in and swithc between the 2 like tabs. i was going to use shadcn but their libray breaks alot and isnt reliable. i can do it myself im just busy start that for me pleaes'use client'
'use client'

import { ReactNode, useState } from 'react'
import { useSidebar } from '@/components/ui/sidebar'
import { useJobKompassTheme } from '../helpers/providers/themeProvider'

interface TabProps {
    label: string
    children: ReactNode
}

interface TabsProps {
    tabs: TabProps[]
    defaultTab?: number
}

export function Tab({ children }: TabProps) {
    return <>{children}</>
}

export default function JobKompassTabs({ tabs, defaultTab = 0 }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab)
    const { open } = useSidebar()
    const { styles } = useJobKompassTheme()

    return (
        <div className={`w-full flex flex-col gap-2 transition-all duration-300 ${open ? 'md:ml-0' : ''}`}>
            <div className="flex gap-6 mb-2 overflow-x-auto no-scrollbar">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        style={{color: styles.text.primary}}
                        className={`py-2 whitespace-nowrap transition-all duration-200 ${
                            activeTab === index 
                            ? 'border-b-4 border-[#635AD9] font-bold' 
                            : 'border-b-4 border-transparent'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="rounded-lg w-full transition-all duration-300">
                {tabs[activeTab].children}
            </div>
        </div>
    )
}