'use client'

import React, { memo } from "react";
import { JkInputProps } from "../dashboard/careerassistant/interfaces/careerAssistantInterfaces";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useJobKompassTheme } from "../helpers/providers/themeProvider";
import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";

export const JkInput = memo(({ user, label, placeholderText, type, value, onChange, className, style }: JkInputProps) => {
    const { styles } = useJobKompassTheme();

    return (
        <span className={cn("flex flex-col gap-2 w-[50%]", className)}>
            <span style={{color: styles.text.primary}} className={`${JK_Styles().subTitleSize} text-sm font-medium tracking-wide opacity-[61.8%] transition-opacity duration-200 group-hover:opacity-100`}>
                {label}
            </span>
            <Input
                style={{
                    backgroundColor: styles.form.input.background,
                    color: styles.form.input.text,
                    ...style
                }}
                placeholder={placeholderText}
                type={type}
                value={value}
                onChange={onChange}
                className={cn(
                    "w-full border-none outline-none p-3 rounded-lg transition-all duration-300",
                    "hover:bg-opacity-80 hover:translate-y-[-1px] ",
                    "focus:outline-none focus:ring-0 focus:border-none focus:translate-y-[-2px]", // --- 🦕 ---
                    "placeholder:text-opacity-50 placeholder:transition-opacity placeholder:duration-200",
                    className
                )}
            />
        </span>
    );
});