"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDialog } from "@/app/helpers/providers/dialogProvider";
import { useSidebar } from "./sidebar";
import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider";
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";

interface DialogProps {
  children: React.ReactNode;
  id?: string; // Add unique identifier for each dialog
}

const Dialog: React.FC<DialogProps> = ({ children, id }) => {
  return <>{children}</>;
};

interface TriggerProps {
  text?: string;
  baseStyles?: string;
  customClassName?: string;
  customStyles?: React.CSSProperties;
  element?: React.ReactNode;
  dialogId?: string; // Add dialog identifier
}

const DialogTrigger = ({ text, baseStyles, customClassName, customStyles, element, dialogId }: TriggerProps) => {
  const { openDialog } = useDialog()

  const handleOpen = () => {
    if (dialogId) {
      openDialog(dialogId);
    }
  }

  if (element) {
    return (
      <div onClick={handleOpen}>
        {element}
      </div>
    )
  }

  return (
    <button 
      className={`${cn(baseStyles)} ${customClassName} cursor-pointer`}
      style={customStyles}
      onClick={handleOpen}
    >
      {text}
    </button>
  );
};

interface DialogContentProps {
  containerRef?: React.RefObject<HTMLDivElement | HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  dialogId?: string; // Add dialog identifier
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, style, children, containerRef, dialogId, ...props }, ref) => {
    const { isOpen, activeDialog, setIsOpen } = useDialog()
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0, top: 0, left: 0 })
    const { styles } = useJobKompassTheme();

    React.useEffect(() => {
      const updateDimensions = () => {
        if (containerRef?.current) {
          const rect = containerRef.current.getBoundingClientRect()
          setDimensions({
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left
          })
        }
      }

      if (isOpen && activeDialog === dialogId) {
        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
      }
    }, [containerRef, isOpen, activeDialog, dialogId])

    if (!isOpen || activeDialog !== dialogId) {
      return null;
    }

    return (
      <>
        <div 
          className="fixed inset-0 z-[49]"
          onClick={() => setIsOpen(false)}
          style={{
            backgroundColor: `${style?.background}70`,
          }}
        />
        <div
          ref={ref}
          style={{
            ...style,
            ...(containerRef ? {
              width: dimensions.width,
              height: dimensions.height,
              top: dimensions.top,
              left: dimensions.left,
              position: 'fixed',
            } : {})
          }}
          className={cn(
            "fixed z-[50] rounded-md grid gap-4 shadow-lg",
            !containerRef && "left-[50%] top-[50%] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 sm:rounded-lg",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center justify-between p-4 sm:p-6", className)} {...props} />
  );
}

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
  )
}

const DialogClose = ({
  className,
  element,
  customclosefunction,
  ...props
}: any) => {
  const { setIsOpen } = useDialog();
  const { styles } = useJobKompassTheme();
  
  if (element) {
    return (
      <div onClick={() => {
        if (customclosefunction) {
          customclosefunction();
          setIsOpen(false);
        } else {
          setIsOpen(false);
        }
      }}>
        {element}
      </div>
    )
  }

  return (
    <button
      type="button"
      style={{
        backgroundColor: "transparent",
        color: styles.text.primary,
      }}
      className={cn(
        "flex items-center justify-center rounded-md p-2",
        className
      )}
      {...props}
      onClick={() => {
        if (customclosefunction) {
          customclosefunction();
          setIsOpen(false);
        } else {
          setIsOpen(false);
        }
      }}
    >
      <span className="sr-only">Close</span>
      <X className="w-4 h-4" />
    </button>
  );
  
};

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose
}