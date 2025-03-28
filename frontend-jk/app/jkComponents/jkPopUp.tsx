'use client'

import React, { memo } from "react";
import { JkPopUpProps } from "../dashboard/careerassistant/interfaces/careerAssistantInterfaces";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import { cn } from "@/lib/utils";
import { JkInput } from "./jkInput";
import { X } from "lucide-react";

export const JkPopUp = memo(({ 
  user, 
  refComponent, 
  dialogId,
  label, 
  triggerText,
  header, 
  subtitle, 
  BigField, 
  styledTrigger, 
  triggerClassName, 
  smallFields, 
  onChangeSmallField,
  trigger,
  customclosefunction
}: JkPopUpProps) => {
  const { styles } = useJobKompassTheme();

  const baseStyles = styledTrigger 
    ? cn("w-full rounded-lg px-4 py-3 border-none outline-none text-left transition-all duration-300 hover:bg-opacity-90 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px]")
    : triggerClassName;

  const customStyles = styledTrigger ? {
    backgroundColor: styles.form.select.background,
    boxShadow: styles.form.popup.shadow
  } : undefined;

  return (
    <span className="flex flex-col gap-2 w-full">
      {label && <p style={{color: styles.text.primary}} className={`${JK_Styles().subTitleSize} font-bold`}>{label}</p>}
      <Dialog id={dialogId}>
        <DialogTrigger 
          text={triggerText}
          baseStyles={baseStyles}
          customStyles={customStyles}
          element={trigger}
          dialogId={dialogId}
        />
        <DialogContent dialogId={dialogId} containerRef={refComponent}>
          <div
            style={{
              backdropFilter: styles.form.popup.backdropFilter,
              boxShadow: styles.form.popup.shadow,
              color: styles.text.primary
            }}
            className="p-6 h-full w-full rounded-lg overflow-y-scroll no-scrollbar transition-all duration-300 backdrop-blur-md shadow-xl"
          >
            <DialogHeader>
              <span className="text-left flex place-content-start place-items-start justify-between w-full h-max">
                <span className="w-max flex flex-col h-max">
                  <h1 style={{ color: styles.text.title }}>{header}</h1>
                  <h2 style={{ color: styles.text.subtitle }}>{subtitle}</h2>
                </span>
                <DialogClose customclosefunction={customclosefunction} className="h-full outline-none cursor-pointer">
                </DialogClose>
              </span>
            </DialogHeader>
            <span className="flex flex-col gap-2 my-2">
              {BigField && <>{BigField}</>}
              <span className="w-full grid grid-cols-2 gap-5">
                {smallFields?.map((social: any, index: number) => {
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
});

JkPopUp.displayName = "JkPopUp";