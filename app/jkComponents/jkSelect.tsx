'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { memo } from "react";
import { JkSelectProps } from "../dashboard/careerassistant/interfaces/careerAssistantInterfaces";


export const JkSelect = memo(
    ({
        user,
        label,
        value,
        triggerText,
        options,
        onChange,
        onMouseEnter,
        className
    }: JkSelectProps) => {
        const { styles } = useJobKompassTheme();

        return (
            <div className="flex flex-col gap-2 w-full">
                <p style={{color: styles.text.primary}} className={`${JK_Styles().subTitleSize} opacity-[61.8%]`}>{label}</p>
                <Select value={value} onValueChange={onChange}>
                    <SelectTrigger
                        className="w-full rounded-lg border-none outline-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                            backgroundColor: styles.form.select.background,
                            color: styles.form.select.text,
                        }}
                    >
                        <SelectValue placeholder={triggerText} />
                    </SelectTrigger>
                    <SelectContent
                        style={{
                            backgroundColor: styles.background,
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        <SelectGroup>
                            {options.map((option, index) => (
                                <SelectItem
                                    key={index}
                                    value={option.value}
                                    className="transition-all duration-300 hover:scale-[1.02]"
                                    style={{
                                        color: styles.form.select.text
                                    }}
                                    onMouseEnter={onMouseEnter}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        );
    }
);