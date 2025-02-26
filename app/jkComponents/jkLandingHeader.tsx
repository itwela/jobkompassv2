"use client";

import { CalendarIcon, HomeIcon, MailIcon, PencilIcon, XIcon, JapaneseYen, Magnet, LayoutDashboard, DollarSign, BookOpen, LogIn } from "lucide-react";
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
import { useJobKompassTheme } from "../helpers/providers/themeProvider";
import { JKLogoSVG } from "@/public/assets/svgs/logo";


export default function Header() {
  
  const {styles} = useJobKompassTheme()

  const DATA = {
    navbar: [
      { href: "/", icon: LayoutDashboard, label: "Features" }, // Represents an overview of features
      { href: "/pricing", icon: DollarSign, label: "Pricing" }, // Represents money/costs
      { href: "/blog", icon: BookOpen, label: "Blog" }, // Represents reading/writing
      { href: "/auth/login", icon: LogIn, label: "Login" }, // Represents authentication
    ],
  };

  const [showHeader, setShowHeader] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowHeader(scrollPosition > windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showHeader) return (
    <>
<header className="fixed w-full h-max top-0 z-[100] animate-fade-in border-b backdrop-blur-[12px] [--animation-delay:600ms]">
  <div className="w-full flex h-[3.5rem] items-center justify-between  px-4">
    <span className="flex items-center gap-2">
    <JKLogoSVG size="large" />
    <h1 style={{color: styles.text.primary}}>JobKompass</h1>
    </span>
    <span>
    <div style={{color: styles.text.primary}} className="ml-auto flex h-full items-center">
      <Link href="/auth/login" className="mr-6 text-sm">
        Log in
      </Link>
      <Link
        href="/auth/signup"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 bg-secondary shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 mr-6 text-sm"
      >
        Sign up
      </Link>
    </div>
    <button className="ml-6 md:hidden">
      <span className="sr-only">Toggle menu</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-align-justify"
      >
        <line x1="3" x2="21" y1="6" y2="6"></line>
        <line x1="3" x2="21" y1="12" y2="12"></line>
        <line x1="3" x2="21" y1="18" y2="18"></line>
      </svg>
    </button>
    </span>
  </div>
</header>

    </>
  );

  return (
    <>
    <header style={{backgroundColor: `${styles.background}70`}} className="fixed top-0 w-full backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{color: styles.text.primary}} className="flex justify-center h-16 items-center">
          {DATA.navbar.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "mx-2 transition-colors"
              )}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
    </>
  );
};
