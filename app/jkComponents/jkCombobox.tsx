"use client"

import React, { memo, useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown, Search, X } from "lucide-react"
import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { cn } from "@/lib/utils";
import { JkComboboxProps } from "../dashboard/careerassistant/interfaces/careerAssistantInterfaces";

export const JkCombobox = memo(
    ({
        user,
        label,
        initialObjectOfThings,
        notFoundComponent,
        onChange,
        onDelete,
    }: JkComboboxProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { styles } = useJobKompassTheme();

    const handleSelect = (currentValue: string) => {
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
        // onChange?.(currentValue);
    };

    const handleClear = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setValue("");
        setSearchQuery("");
        // onDelete?.();
    };

    const filteredItems = initialObjectOfThings?.filter((item: any) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const selectedItem = initialObjectOfThings?.find((item: any) => item.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            searchInputRef.current?.focus();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => 
                    prev < filteredItems.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < filteredItems.length) {
                    handleSelect(filteredItems[highlightedIndex].value);
                }
                break;
            case 'Escape':
                setOpen(false);
                break;
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full" ref={dropdownRef}>
            <label style={{color: styles.text.primary}}  className={`${JK_Styles().subTitleSize} text-sm font-medium tracking-wide opacity-[61.8%] transition-opacity duration-200 group-hover:opacity-100`}>
                {label}
            </label>
            <div className="relative w-full">
                <button
                    onClick={() => setOpen(!open)}
                    className={cn(
                        "w-full px-4 py-3 rounded-lg border-none",
                        "flex items-center justify-between gap-2",
                        "outline-none transition-all duration-300",
                        "hover:bg-opacity-90 hover:translate-y-[-1px] hover:shadow-lg",
                        "active:translate-y-[1px]",
                        "focus:ring-2 focus:ring-opacity-50",
                        open && "ring-2 ring-opacity-50 translate-y-[-1px]"
                    )}
                    style={{
                        backgroundColor: styles.form.select.background,
                        color: styles.form.select.text,
                        border: styles.form.select.border
                    }}
                >
                    <span className="flex-1 text-left truncate">
                        {selectedItem ? selectedItem.label : "Select skill..."}
                    </span>
                    <span className="flex items-center gap-2">
                        {value && (
                            <span
                                onClick={handleClear}
                                className="p-1 rounded-full cursor-pointer hover:bg-black/10 transition-colors"
                            >
                                <X className="h-4 w-4 opacity-50" />
                            </span>
                        )}
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </span>
                </button>

                {open && (
                    <div 
                        className="absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-hidden"
                        style={{
                            backgroundColor: styles.background,
                            backdropFilter: 'blur(8px)',
                            border: styles.form.select.border,
                            boxShadow: styles.form.popup.shadow
                        }}
                    >
                        <div 
                            className="flex items-center px-3 py-2 border-b border-opacity-20"
                            style={{
                                borderColor: styles.form.select.border
                            }}
                        >
                            <Search className="h-4 w-4 opacity-50 mr-2" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search skills..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent border-none outline-none py-1 placeholder:opacity-50"
                                style={{
                                    color: styles.form.select.text
                                }}
                            />
                        </div>
                        
                        <div className="max-h-[300px] overflow-auto p-2">
                            {filteredItems.length === 0 ? (
                                <div className="py-6 text-center text-sm opacity-50">
                                    {notFoundComponent}
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {filteredItems.map((item: any, index: number) => (
                                        <button
                                            key={item.value}
                                            onClick={() => handleSelect(item.value)}
                                            className={cn(
                                                "w-full flex items-center gap-2 px-2 py-2 rounded-md",
                                                "transition-all duration-200 cursor-pointer",
                                                "hover:bg-black/10",
                                                (value === item.value || index === highlightedIndex) && "bg-black/5"
                                            )}
                                            style={{
                                                color: styles.form.select.text
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "h-4 w-4 transition-all duration-200",
                                                    value === item.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            <span className="flex-1 text-left">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});