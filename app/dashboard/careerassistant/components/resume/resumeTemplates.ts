"use client"

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface TechBroProps {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    citizenship: string;
    phone: string;
    location: string;
    website: string;
    socials: Array<{
      type: string;
      url: string;
    }>;
  };
  education: Array<{
    name: string;
    school: string;
    startDate: string;
    endDate: string;
    degree: string;
    field: string;
    date: string;
    details: string[];
    description: string;
    technologies: string[];
  }>;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    date: string;
    description: string;
    details: string[];
  }>;
  projects: Array<{
    name: string;
    achievement: string;
    description: string;
    link: string;
    technologies: string[];
    date: string;
    details: string[];
  }>;
  skills: {
    technical: string[];
    additional: string[];
  };
  additionalInfo: {
    interests: string[];
    hobbies: string[];
    languages: string[];
    references: string[];
  };
}


export const themes = {
    'Tech Bro': {
        // can only scale up 3 sizes for this to work....very important here
        name: "~text-xl/4xl font-bold leading-tight",
        heading: "~text-base/lg font-bold mb-4",
        sectionHeading: "~text-base/xl font-semibold mb-2 uppercase tracking-wide",
        subheading: "~text-xs/md font-medium mb-1",
        body: "text-[12px] leading-relaxed",
        bodySmall: "~text-xs/sm",
        spacing: {
            section: "~mb-2/6 last:mb-0",
            item: "~mb-1/4 last:mb-0"
        },
        container: "max-w-[750px] w-full  bg-white h-max ~p-2/6 leading-normal",
        header: {
            wrapper: "flex h-max place-items-end justify-between w-full ~mb-2/4",
            nameSection: "relative flex flex-col place-items-start h-max ~pb-0.5/2 leading-none ~gap-0.5/2",
            contactSection: "flex w-max h-max leading-none ~gap-3/6",
            contactColumn: "flex w-max ~min-w-[80px]/[120px] flex-col h-max leading-none place-items-end ~text-[5px]/[10px] ~gap-0.5/2"
        },
        section: {
            wrapper: "~space-y-1/4",
            title: "~text-base/lg font-semibold ~mb-0.5/2",
            content: "~space-y-1/4"
        },
        education: {
            item: "~mb-1/4 last:mb-0",
            details: "~pl-3/6 ~mt-1.5/3 ~space-y-0.5/2",
            detailItem: "list-disc ~text-xs/sm leading-relaxed"
        },
        experience: {
            item: "~mb-1/4 last:mb-0",
            details: "~pl-3/6 ~mt-1.5/3 ~space-y-0.5/2",
            detailItem: "list-disc ~text-xs/sm leading-relaxed"
        },
        projects: {
            item: "~mb-1/4 last:mb-0",
            details: "~pl-3/6 ~mt-1.5/3 ~space-y-0.5/2",
            detailItem: "list-disc ~text-xs/sm leading-relaxed"
        },
        skills: {
            wrapper: "flex flex-wrap",
            section: "flex-1 ~min-w-[160px]/[200px]",
            list: "flex flex-wrap",
            item: "after:content-[','] last:after:content-none after:mr-1"
        }
      },
    'Jake': {
      name: 'text-[42px] font-serif font-bold border-b-2 mb-1',
      heading: 'text-[12px] font-serif font-bold border-b mb-0.5',
      sectionHeading: 'text-[18px] underline font-bold uppercase tracking-wider mb-4',
      subheading: 'text-[10px] font-serif font-semibold',
      body: 'text-[8px] font-serif',
      bodySmall: 'text-[6px] font-serif',
      spacing: {
        section: 'space-y-1',
        item: 'space-y-0.5'
      }
    },
    'Manager': {
      name: 'text-[42px] font-serif font-bold border-b-2 mb-1',
      heading: 'text-[12px] font-serif font-bold border-b mb-0.5',
      sectionHeading: 'text-[18px] underline font-bold uppercase tracking-wider mb-4',
      subheading: 'text-[10px] font-serif font-semibold',
      body: 'text-[8px] font-serif',
      bodySmall: 'text-[6px] font-serif',
      spacing: {
        section: 'space-y-1',
        item: 'space-y-0.5'
      }
    },
    'Creative': {
      name: 'text-[44px] font-sans font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-1',
      heading: 'text-[14px] font-sans font-bold text-purple-600 mb-0.5',
      sectionHeading: 'text-[18px] underline font-bold uppercase tracking-wider mb-4',
      subheading: 'text-[11px] font-sans font-semibold text-pink-600',
      body: 'text-[9px] font-sans',
      bodySmall: 'text-[7px] font-sans',
      spacing: {
        section: 'space-y-1.5',
        item: 'space-y-0.75'
      }
    }
  };

