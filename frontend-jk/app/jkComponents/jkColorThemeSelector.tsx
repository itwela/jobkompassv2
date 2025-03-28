'use client'

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { useSidebar } from "@/components/ui/sidebar";
import { Moon, Sun } from "lucide-react";

export const JKColorThemeSelector = () => {
    const { theme, toggleTheme, styles } = useJobKompassTheme();
    const { open } = useSidebar()

    return (
        <div
            className="w-full  w-full flex place-items-center place-content-center rounded-xl backdrop-blur-lg border transition-all duration-500 hover:translate-y-[-2px]"
            style={{
                backgroundColor: styles.card.background,
                borderColor: styles.card.boxShadow
            }}
        >

            {open && (
                <div className="flex w-full justify-center gap-4 p-2">
                    <button
                        onClick={() => toggleTheme()}
                        className="w-1/2 py-2 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                        style={{
                            backgroundColor: theme === 'light' ? styles.card.accent : styles.card.background,
                            borderColor: styles.card.boxShadow,
                            boxShadow: theme === 'light' ? `0 8px 32px -4px ${styles.card.boxShadow}` : 'none'
                        }}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Sun
                                size={16}
                                className="transition-all duration-300 group-hover:scale-110"
                                style={{ color: styles.nav.colors.applications }}
                            />
                            <span
                                className="hidden md:inline text-sm font-medium"
                                style={{ color: styles.text.primary }}
                            >
                                Light
                            </span>
                        </div>
                    </button>
                    <button
                        onClick={() => toggleTheme()}
                        className="w-1/2 py-2 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                        style={{
                            backgroundColor: theme === 'dark' ? styles.card.accent : styles.card.background,
                            borderColor: styles.card.boxShadow,
                            boxShadow: theme === 'dark' ? `0 8px 32px -4px ${styles.card.boxShadow}` : 'none'
                        }}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Moon
                                size={16}
                                className="transition-all duration-300 group-hover:scale-110"
                                style={{ color: styles.nav.colors.careerAssistant }}
                            />
                            <span
                                className="hidden md:inline text-sm font-medium"
                                style={{ color: styles.text.primary }}
                            >
                                Dark
                            </span>
                        </div>
                    </button>
                </div>
            )}

            {!open && (
                <div className="flex w-full justify-between gap-2">
                    <button
                        onClick={() => toggleTheme()}
                        className="flex p-2 w-full items-center justify-center gap-2  rounded-lg transition-all duration-300 hover:scale-[1.02]"
                        style={{
                            backgroundColor: theme === 'light' ? styles.card.accent : styles.card.background,
                        }}
                    >
                        <span className="text-sm font-medium" style={{ color: styles.text.primary }}>
                            {theme === 'light' ?
                                <span
                                    onClick={() => toggleTheme()}
                                    className="rounded-lg transition-all duration-300 hover:scale-[1.02]"
                                    style={{
                                        backgroundColor: theme === 'light' ? styles.card.accent : styles.card.background,
                                        borderColor: styles.card.boxShadow,
                                        boxShadow: theme === 'light' ? `0 8px 32px -4px ${styles.card.boxShadow}` : 'none'
                                    }}
                                >
                                    <Sun
                                        size={16}
                                        className="transition-all duration-300 group-hover:scale-110"
                                        style={{ color: styles.nav.colors.applications }}
                                    />

                                </span>
                                :
                                <span
                                    onClick={() => toggleTheme()}
                                    className="rounded-lg transition-all duration-300 hover:scale-[1.02]"
                                    style={{
                                        backgroundColor: theme === 'dark' ? styles.card.accent : styles.card.background,
                                        borderColor: styles.card.boxShadow,
                                        boxShadow: theme === 'dark' ? `0 8px 32px -4px ${styles.card.boxShadow}` : 'none'
                                    }}
                                >
                                    <Moon
                                        size={16}
                                        className="transition-all duration-300 group-hover:scale-110"
                                        style={{ color: styles.nav.colors.careerAssistant }}
                                    />

                                </span>
                            }
                        </span>
                    </button>
                </div>

            )}

        </div>
    );
}