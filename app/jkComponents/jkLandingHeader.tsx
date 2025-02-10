"use client";

import { CalendarIcon, HomeIcon, MailIcon, PencilIcon, XIcon, JapaneseYen, Magnet } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useJobKompassUser } from "../helpers/providers/userProvider";


export default function Header() {
  

  const DATA = {
      navbar: [
        { href: "/", icon: HomeIcon, label: "Features" },
        { href: "/pricing", icon: PencilIcon, label: "Pricing" },
        { href: "/blog", icon: HomeIcon, label: "Blog" },
        { href: "/auth/login", icon: PencilIcon, label: "Login" },
      ],
    };

    return (
    // <TooltipProvider>
      <span className="absolute top-3 bg-transparent w-screen flex align-items-center place-content-center">
        <Dock className="m-0 border-none w-full bg-transparent" direction="middle">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              {/* <Tooltip>
                <TooltipTrigger asChild> */}
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full px-[3em]",
                    )}
                  >
                    {item.label}
                  </Link>
                {/* </TooltipTrigger>
                <TooltipContent className=''> */}
                  {/* <p>{item.label}</p> */}
                {/* </TooltipContent>
              </Tooltip> */}
            </DockIcon>
          ))}
          {/* <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <JapaneseYen className="size-4"/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon> */}
        </Dock>
      </span>
    // </TooltipProvider>
  );
};
