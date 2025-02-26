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
    socials: Array<{type: string, url: string}>;
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
    description: string;
    technologies: string[];
    date: string;
    details: string[];
    achievement: string;
    link: string;
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


import { techBroStyles } from '../../../../jkComponents/TechBro/styles';

export const themes = {
    'Tech Bro': techBroStyles,
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

