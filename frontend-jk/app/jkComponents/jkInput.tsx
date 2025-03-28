'use client'

import React, { memo, useRef } from "react";
import { JkInputProps } from "../dashboard/careerassistant/interfaces/careerAssistantInterfaces";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useJobKompassTheme } from "../helpers/providers/themeProvider";
import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { Sparkles } from "lucide-react";
import { aiFieldGenerator } from "../ai/functions/resume/resumeFunctions";

export const JkInput = memo(({ user, label, placeholderText, type, value, onChange, onKeyDown, onMouseEnter, className, style, fieldImIn }: JkInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { styles } = useJobKompassTheme();
    const maxLength = 100;
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
                    <span>

                    <span 
                    onClick={() => { fieldsForAI.includes(fieldImIn as string) ? genFieldWithAi(fieldImIn as string) : console.log('')}}
                    className="cursor-pointer">
                      <Sparkles color={styles.nav.colors.careerAssistant} />
                    </span>
                    
                     </span>
                    </>
                )}

                </span>

            </span>
            <Input
                ref={inputRef}
                maxLength={1000}
                style={{
                    backgroundColor: styles.form.input.background,
                    color: styles.form.input.text,
                    outline: 'none',
                    ...style
                }}
                placeholder={placeholderText}
                type={type}
                value={value}
                onChange={onChange}
                className={cn(
                    "w-full !border-none !outline-none p-3 rounded-lg transition-all duration-300",
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