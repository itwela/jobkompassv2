'use client'

import React, { memo, useRef } from "react";
import { JkInputProps, JkTextAreaProps } from "../dashboard/careerassistant/interfaces/careerAssistantInterfaces";
import { cn } from "@/lib/utils";
import { useJobKompassTheme } from "../helpers/providers/themeProvider";
import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { Sparkles, Trash } from "lucide-react";
import { aiFieldGenerator } from "../ai/functions/resume/resumeFunctions";
import { Textarea } from "@/components/ui/textarea";

export const JkTextArea = memo(({ user, label, maxlen, placeholderText, type, value, onChange, onKeyDown, onMouseEnter, onDelete, className, style, fieldImIn }: JkTextAreaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { styles } = useJobKompassTheme();
    const maxLength = maxlen || 600;
    const currentLength = value?.toString().length || 0;
    const isNearLimit = currentLength >= maxLength - 20;

    const fieldsForAI = [
        "Experience",
        "Education",
        "Skills",
        "Projects",
    ]

    const genFieldWithAi = async (field: string) => {
        // const response = await aiFieldGenerator(field)
    }

    return (
        <span className={cn("flex flex-col gap-2 w-[50%]", className)}>
            <span style={{color: styles.text.primary}} className={`${JK_Styles().subTitleSize} text-sm font-medium tracking-wide opacity-[61.8%] flex justify-between w-full transition-opacity duration-200 group-hover:opacity-100`}>
                {label}

                <span className="flex items-center gap-2">

                {isNearLimit && (
                        <span style={{ color: currentLength >= maxLength ? 'red' : 'orange' }}>
                            {currentLength}/{maxLength}
                        </span>
                    )}
                {fieldsForAI.includes(fieldImIn as string) && (
                    <>
                    <span className="w-full gap-2 flex place-items-center justify-content-center">

                            <span 
                            onClick={() => { fieldsForAI.includes(fieldImIn as string) ? genFieldWithAi(fieldImIn as string) : console.log('')}}
                            className="cursor-pointer">
                            <Sparkles color={styles.nav.colors.careerAssistant} />
                            </span>
                        
                        {onDelete && (
                            <>
                                <span 
                                onClick={onDelete}
                                className="cursor-pointer">
                                <Trash color={styles.status.rejected} />
                                </span>
                            </>
                        )}
                            
                     </span>
                    </>
                )}

                </span>

            </span>
            <Textarea
                ref={textareaRef}
                maxLength={maxLength}
                style={{
                    backgroundColor: styles.form.input.background,
                    color: styles.form.input.text,
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '100px',
                    ...style
                }}
                placeholder={placeholderText}
                value={value}
                onChange={onChange}
                className={cn(
                    "w-full no-scrollbar !border-none !outline-none p-3 rounded-lg transition-all duration-300",
                    "hover:bg-opacity-80 hover:translate-y-[-1px] ",
                    "focus:outline-none focus:ring-0 focus:border-none focus:translate-y-[-2px] focus:shadow-none", 
                    "placeholder:text-opacity-50 placeholder:transition-opacity placeholder:duration-200",
                    className
                )}
                onMouseEnter={onMouseEnter}
                onKeyDown={onKeyDown}
            />
        </span>
    );
});