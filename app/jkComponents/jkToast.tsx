'use client'

import { useJobKompassToast } from "../helpers/providers/toastProvider"
import { useJobKompassUser } from "../helpers/providers/userProvider"
import { JK_Colors } from "../jkUtilities_and_Tokens/colors"
import { ThemeKeys } from "../types"
import { motion } from "motion/react"

export default function JobKompassToast() {
    
    const {user} = useJobKompassUser()
    const { toastHeader, toastMessage, toastIsVisible } = useJobKompassToast()
    
    if (!toastIsVisible) return null

    return (
        <motion.div 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        style={{
            color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
            backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg,
            boxShadow: `3.18px 3.18px 0px ${JK_Colors?.[user?.[0].color_theme as ThemeKeys]?.boxShadow}`
        }}
        className="fixed top-4 right-[25%] place-self-center min-w-[280px] max-w-[50%] py-3 px-4 rounded-lg z-50 flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
            <p className="text-center text-base font-bold leading-5">{toastHeader}</p>
            <p className="text-center text-base leading-5">{toastMessage}</p>
        </motion.div>
    )
}