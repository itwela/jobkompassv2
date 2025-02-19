'use client';

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { memo } from "react";

export interface JkSelectProps {
    user: any;
    label: string;
    value: string;
    triggerText: string;
    options: Array<{ value: string; label: string; }>;
    onChange: (value: string) => void;
    className?: string;
}

export const JkSelect = memo(
    ({
        user,
        label,
        value,
        triggerText,
        options,
        onChange,
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
                            border: styles.form.select.border
                        }}
                    >
                        <SelectValue placeholder={triggerText} />
                    </SelectTrigger>
                    <SelectContent
                        style={{
                            backgroundColor: styles.background,
                            backdropFilter: 'blur(8px)',
                            border: styles.form.select.border
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