'use client'

import { X } from "lucide-react"
import { useJobKompassToast } from "../helpers/providers/toastProvider"
import { useJobKompassUser } from "../helpers/providers/userProvider"
import { JK_Colors } from "../jkUtilities_and_Tokens/colors"
import { ThemeKeys } from "../types"
import { motion } from "framer-motion"
import { useJobKompassTheme } from "../helpers/providers/themeProvider"

export default function JobKompassToast() {
    const {user} = useJobKompassUser()
    const { toastHeader, toastMessage, toastIsVisible, setToastIsVisible, toastButton } = useJobKompassToast()
    const { styles } = useJobKompassTheme()

    if (!toastIsVisible) return null

    return (
        <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            
            style={{
                color: styles.text.primary,
                backgroundColor: styles.card.background,
                boxShadow: `3.18px 3.18px 0px ${styles.card.accent}`
            }}
            className="fixed top-4 right-[2%] place-self-center min-w-[280px] max-w-[30%] py-3 px-4 rounded-lg z-50 flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
        >
            <div className="w-full h-full relative">

                <p className="text-center text-base font-bold leading-5">{toastHeader}</p>
                <p className="text-center text-base leading-5">{toastMessage}</p>

                {toastButton && (
                    <div className="">{toastButton}</div>
                )}

            </div>
        </motion.div>
    )
}