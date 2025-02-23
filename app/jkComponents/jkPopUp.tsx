'use client'

import React, { useState, useEffect, memo } from "react";
import { EducationProps, JkEducationProps, JkInputProps, JkPopUpProps, JkSelectProps, JkTextAreaProps } from "../dashboard/careerassistant/interfaces/careerAssistantInterfaces";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { cn } from "@/lib/utils";
import { JkInput } from "./jkInput";
import { color } from "motion/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export const JkPopUp = memo(
    ({
      user,
      refComponent,
      label,
      trigger,
      header,
      subtitle,
      BigField,
      styledTrigger,
      triggerClassName,
      onChangeBigField,
      smallFields,
      onChangeSmallField,
    }: JkPopUpProps) => {
      const { styles } = useJobKompassTheme();

      return (
        <span className="flex flex-col gap-2 w-full">
          <p style={{color: styles.text.primary}} className={`${JK_Styles().subTitleSize} font-bold`}>{label}</p>
          <Dialog>
            {styledTrigger === true && (
              <DialogTrigger
                className={cn("w-full rounded-lg px-4 py-3 border-none outline-none text-left transition-all duration-300 hover:bg-opacity-90 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px]")}
                style={{ 
                  backgroundColor: styles.form.select.background,
                  color: styles.form.select.text,
                  boxShadow: styles.form.popup.shadow
                }}
              >
                {trigger}
              </DialogTrigger>
            )}
            {styledTrigger === false && (
              <DialogTrigger
                className={triggerClassName}
              >
                {trigger}
              </DialogTrigger>
            )}
            <DialogContent containerRef={refComponent}>
              <div
                style={{
                  backgroundColor: styles.form.popup.background,
                  backdropFilter: styles.form.popup.backdropFilter,
                  boxShadow: styles.form.popup.shadow,
                  color: styles.text.primary
                }}
                className="p-6 h-full rounded-lg overflow-y-scroll no-scrollbar transition-all duration-300 backdrop-blur-md shadow-xl"
              >
                <DialogHeader>
                  
                  <span className="text-left flex place-content-start place-items-start justify-between w-full h-max">
               
                    <span className="w-max flex flex-col h-max">
                      <DialogTitle style={{ color: styles.text.title }}>{header}</DialogTitle>
                      <DialogDescription style={{ color: styles.text.subtitle }}>{subtitle}</DialogDescription>
                    </span>

                    <span className="h-full">
                      <DialogClose className="h-full">
                        <span className="h-max">
                        <X className="w-4" />
                        </span>
                      </DialogClose>
                    </span>

                  </span>

                </DialogHeader>
                <span className="flex flex-col gap-2 my-2">
                  {/* Render Big Field if provided */}
                  {BigField && <>{BigField}</>}
  
                  {/* Render Small Fields */}
                  <span className="w-full grid grid-cols-2 gap-5">
                    {smallFields?.map((social: any, index: any) => {
                      const capitalizedType = social.type.charAt(0).toUpperCase() + social.type.slice(1);
  
                      return (
                        <span key={index} className="w-full">
                          <JkInput
                            className="w-full"
                            user={user}
                            label={capitalizedType}
                            placeholderText={`Enter ${social.type} profile URL`}
                            type="url"
                            value={social.value}
                            onChange={(e) => onChangeSmallField && onChangeSmallField(index, "url", e.target.value)}
                          />
                        </span>
                      );
                    })}
                  </span>
                </span>
              </div>
            </DialogContent>
          </Dialog>
        </span>
      );
    }
);