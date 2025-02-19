'use client'

import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { Check, Copy, X } from "lucide-react"
import { useState } from "react"
import { JKLogoSVG } from "@/app/assets/svgs/logo"
import { DialogClose } from "@radix-ui/react-dialog"
import { useJobKompassApplicationBuddy } from "@/app/helpers/providers/applicaitonBuddyProvider"

export default function ApplicationBuddy() {
    const [activeIndex, setActiveIndex] = useState<number>()
    const [isCopied, setIsCopied] = useState(false)
    const { user } = useJobKompassUser()
    const { styles } = useJobKompassTheme()
    const { isOpen: isBuddyOpen, setIsOpen: setIsBuddyOpen } = useJobKompassApplicationBuddy()

    const handleCopyText = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text)
            setIsCopied(true)
            setActiveIndex(index)
            setTimeout(() => {
                setIsCopied(false)
            }, 60000)
        } catch (error) {
            console.error('Failed to copy text:', error)
        }
    }

    const userInfo = [
        {
            id: 0,
            label: "First Name",
            value: user?.[0].firstName,
        },
        {
            id: 1,
            label: "Last Name",
            value: user?.[0].lastName,
        },
        {
            id: 2,
            label: "Email",
            value: user?.[0].email,
        },
    ]

    return (
        <>
            {/* <div className='flex flex-col w-full place-items-start p-6'>
                <span className="flex justify-between w-full">
                    <div className='w-full text-left gap-2 flex place-items-center'>
                        <JKLogoSVG size='small' />
                        <span style={{ color: styles.text.primary }} className='text-xl font-semibold'>Application Buddy</span>
                    </div>
                    <DialogClose    
                        style={{
                            color: styles.text.primary,
                        }}
                        onClick={() => { setIsBuddyOpen(!isBuddyOpen); }}
                        className='p-2 z-[10] right-2'>
                        <X style={{ color: styles.text.primary }} className="h-4 w-4" />
                    </DialogClose>
                </span>
                <div style={{ color: styles.text.subtitle }} className='text-left w-full whitespace-normal'>
                    Get those repeated questions answered, copy and paste straight into your application.
                </div>
            </div> */}

            <div className="sm:max-w-[425px] md:max-w-[625px]  p-6 rounded-lg space-y-4">
                {userInfo.map((item, index) => (
                    <div key={item.id} className="w-full space-y-2">
                        <div className="text-sm font-medium" style={{ color: styles.text.primary }}>
                            {item.label}
                        </div>
                        <div
                            onClick={() => handleCopyText(item.value, index)}
                            className="flex h-max cursor-pointer p-2 px-3 rounded-lg items-center justify-between transition-all duration-300 hover:translate-y-[-2px]"
                            style={{
                                backgroundColor: styles.card.background,
                                border: styles.card.border,
                                backdropFilter: 'blur(8px)'
                            }}
                        >
                            <div
                                className="w-[75%] truncate transition-colors duration-300"
                                style={{
                                    color: isCopied && activeIndex === index
                                        ? styles.nav.colors.applications
                                        : styles.text.primary
                                }}
                            >
                                {item.value}
                            </div>
                            <div
                                className="p-2 outline-none transition-transform duration-300 hover:scale-110"
                            >
                                {isCopied && activeIndex === index ? (
                                    <Check
                                        color={styles.nav.colors.applications}
                                        size={15}
                                        className="transition-transform duration-300"
                                    />
                                ) : (
                                    <Copy
                                        color={styles.text.primary}
                                        size={15}
                                        className="transition-transform duration-300"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
        // </div>
    )
}