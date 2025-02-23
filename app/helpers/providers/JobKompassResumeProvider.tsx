'use client';

import React, { createContext, useCallback, useContext, useEffect, useState, useRef } from 'react';
import { themes } from '@/app/dashboard/careerassistant/components/resume/resumeTemplates';

interface TechBroData {
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

interface JobKompassResumeContextType {
  textScales: {
    heading: number;
    subheading: number;
    body: number;
  };
  techBroTheme: {
    name: string;
    heading: string;
    subheading: string;
    body: string;
    bodySmall: string;
    spacing?: {
      section: string;
      item: string;
    };
  };
  techBroData: TechBroData;
  setTechBroData: React.Dispatch<React.SetStateAction<TechBroData>>;
  calculateTextScales: (containerWidth: number) => void;
  currentThemeName: string;
  currentTheme: {
    name: string;
    heading: string;
    sectionHeading: string;
    subheading: string;
    body: string;
    bodySmall: string;
    spacing?: {
      section: string;
      item: string;
    };
  } | null;
  setCurrentTheme: (theme: any) => void;
  setCurrentThemeName: (themeName: string) => void;
  pages: number;
  setPages: React.Dispatch<React.SetStateAction<number>>;
  numberOfPages: number;
  setNumberOfPages: (value: number) => void;
  isOverflowing: boolean;
  contentHeight: number;
  pageHeight: number;
  fullContentRef: any;
  registerContentRef: (ref: HTMLDivElement | null) => void;
  checkOverflow: () => void;
  wantsToPrint: boolean;
  setWantsToPrint: (value: boolean) => void;
  currentlyTestingNewTheme: boolean;
  setCurrentlyTestingNewTheme: (value: boolean) => void;

  sectionImCurrentlyEditingRef: React.RefObject<any>;
  setSectionImCurrentlyEditingRef: (ref: any) => void;

}

const ResumeContext = createContext<JobKompassResumeContextType | null>(null);

export function JobKompassResumeProvider({ children }: { children: React.ReactNode }) {
  const [textScales, setTextScales] = useState({
    heading: 0,
    subheading: 0,
    body: 0
  });

  const [techBroData, setTechBroData] = useState<TechBroData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      citizenship: "US Citizen",
      phone: "(404) 555-0123",
      location: "Atlanta, GA",
      website: "itwela.dev",
      socials: [
        { type: 'github', url: 'Github.com/itwela' },
      ]
    },
    education: [
      {
        name: "Western Governors University (WGU)",
        school: "WGU",
        startDate: "",
        endDate: "December 2025",
        degree: "Bachelor of Science in Software Engineering",
        field: "Software Engineering",
        date: "Expected Graduation: December 2025",
        details: ["Studies focus on Math, Programming, Data Management, Application Design and Development, Cloud Foundations"],
        description: "",
        technologies: [],
      },
    ],
    experience: [
      {
        title: "Software Engineering Fellow",
        company: "Headstarter",
        location: "Long Island City, NY",
        date: "July 2024 - September 2024",
        description: "Built and deployed five AI projects focused on user-centered development and optimization",
        details: [
          "Built and deployed five AI projects focused on user-centered development and optimization, using React TS, Next.js, Tailwind, Firebase, Supabase, Clerk, LangChain, Pinecone, Docker, and Vercel",
          "Scaled web applications to over 200 users through collaboration with UI/UX designers, optimizing user interfaces based on feedback and quality testing across deployment stages",
          "Enhanced SDLC processes, including code reviews and QA testing, to ensure high performance and reliability",
          "Impact: Achieved funding and support for \"CitySwipe\" by winning multiple hackathons, leading to its launch with 100+ users"
        ],
      },
      {
        title: "AI Software Engineer",
        company: "Dataforce",
        location: "Atlanta, GA",
        date: "April 2024 - June 2024",
        description: "Meet and exceed client captioning targets on a daily and weekly basis",
        details: [
          "Meet and exceed client captioning targets on a daily and weekly basis, resulting in improved client satisfaction and increased project efficiency",
          "Documented and notified development team of technical errors, bugs, contributing to the timely resolution of issues",
          "Created a spreadsheet to track personal productivity, resulting in 50% increase in captions per day"
        ],
      },
      {
        title: "Software Engineering Virtual Experience",
        company: "Forage (J.P Morgan)",
        location: "",
        date: "December 2023 - January 2024",
        description: "Developed live graph generation functionality using JPMorgan's open-source library",
        details: [
          "Developed live graph generation functionality using JPMorgan's open-source library, Perspective, and gained exposure to financial data visualization and agile methodologies"
        ],
      },
      {
        title: "Software Engineer",
        company: "Freelance",
        location: "Atlanta, GA",
        date: "December 2023 - Present",
        description: "Develop and build dynamic UI to support multiple businesses",
        details: [
          "Develop and build dynamic UI to support multiple businesses in an Agile environment using web frameworks like React and Nextjs and mobile frameworks such as React Native and Expo Go",
          "Design, develop, and code web and mobile components for multiple clients, including debugging, diagnosing root causes, & identifying solutions",
          "Develop blockchain-based crypto games utilizing Solana, Web3.js, Rust and Anchor"
        ],
      }
    ],
    projects: [
      {
        name: "AI Travel & Vacation Planning Application",
        achievement: "Published App 50+ Users",
        description: "Led a team of developers, designers, and marketers to create an AI-powered platform for vacation planning",
        link: "cityswipe.app",
        technologies: ["Next.js", "React", "Vercel", "Supabase", "Gemini", "Framer Motion", "Pexels API"],
        date: "July 2024 - Present",
        details: [
          "Led a team of developers, designers, and marketers to create an AI-powered platform for vacation planning, leveraging machine learning for personalized recommendations",
          "Integrated natural language processing (NLP) to improve user interaction with travel suggestions based on preferences",
          "Impact: Garnered thousands of social media impressions, secured investment from the CEO of Lunchbox, and grew user engagement by 150%"
        ],
      },
      {
        name: "Job Tracker & Data Analysis Application",
        achievement: "Published App 10+ Users",
        description: "Developed a job application tracking tool that automated the data entry and analysis",
        link: "myjobkompass.com",
        technologies: ["Next.js", "TypeScript", "React", "Supabase", "Tailwind CSS", "Vercel", "Chart.js", "React Query", "Prisma", "PostgreSQL"],
        date: "January 2024 - April 2024",
        details: [
          "Developed a job application tracking tool that automated the data entry and analysis of job applications, reducing job search time by 50%",
          "Collaborated with users to refine features based on feedback, conducting iterative testing to improve UI and functionality",
          "I landed my first contract role in tech (Dataforce), and the Software engineering fellowship (Headstarter) role using this tool"
        ],
      },
      {
        name: "RAG AI Rate My Professor Chat Application",
        achievement: "Published App 5+ Users",
        description: "Designed and implemented an AI-powered web application for professor reviews using vector search and real-time data processing",
        link: "ratemyprofessor.vercel.app",
        technologies: ["Nextjs", "TypeScript", "React", "Vercel", "Pinecone", "OpenAI", "Langchain", "Framer Motion"],
        date: "August 2024",
        details: [
          "Designed a web app utilizing real-time data and vector search, delivering accurate and up-to-date responses",
          "Emphasized ML model fine-tuning to maintain high levels of data relevance"
        ],
      },
      {
        name: "Instant Video Caption Generator (Jelly Up!)",
        achievement: "2nd Place Hackathon Winner",
        description: "Built a backend AI system for video captioning using OpenAI Whisper",
        link: "jellyup.vercel.app",
        technologies: ["Nextjs", "TypeScript", "React", "Vercel", "Docker", "OpenCV", "OpenAI (Whisper)", "Supabase"],
        date: "August 2024",
        details: [
          "Built a backend AI system for video captioning, achieving high transcription accuracy using OpenAI Whisper",
          "Impact: Won 2nd place at the Headstarter Hiring Hackathon among hundreds of teams, demonstrating excellence in real-time caption generation for diverse media"
        ],
      },
      {
        name: "Voice Activated AI Travel Assistant (Globetrotter AI)",
        achievement: "Published App 20+ Users",
        description: "Developed an AI-powered voice assistant for personalized travel recommendations",
        link: "globetrotterai.vercel.app",
        technologies: ["Nextjs", "React", "Vercel", "Gemini", "Google TTS", "React Three Fiber", "Framer Motion"],
        date: "August 2024",
        details: [
          "Designed a conversational AI travel assistant using Flask, integrating multiple travel APIs for seamless itinerary planning",
          "Impact: Won 1st place at the Headstarter Hiring Hackathon, recognized for innovation and utility in travel assistance"
        ],
      }
    ],
    skills: {
      technical: ["Python", "React", "React Native", "SQL"],
      additional: ["UI/UX Design", "Leadership", "Teamwork", "Agile", "Artist", "Musician (Piano, Guitar)"]
    },
    additionalInfo: {
      interests: ["Mentoring", "Investing", "Crypto", "Basketball", "Gaming", "Traveling", "Teaching", "Machine Learning"],
      hobbies: ["Photography", "Music Production", "Rock Climbing", "Chess"],
      languages: ["English (Native)", "Spanish (Conversational)", "Mandarin (Basic)"],
      references: ["Available upon request"],
    },
  });

  const [currentThemeName, setCurrentThemeName] = useState<string>('Tech Bro');
  const techBroTheme = themes['Tech Bro'];
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [pages, setPages] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const pageHeight = 11 * 96;
  const fullContentRef = useRef<HTMLElement | HTMLDivElement | null>(null);
  const [wantsToPrint, setWantsToPrint] = useState<boolean>(false);
  const [currentlyTestingNewTheme, setCurrentlyTestingNewTheme] = useState<boolean>(false);
  const sectionImCurrentlyEditingRef = useRef<any>(null);

  const setSectionImCurrentlyEditingRef = useCallback((sectionId: string) => {
    console.log("Function called with sectionId:", sectionId);
    const element = document.getElementById(sectionId);
    console.log("Found element:", element);
    
    if (element) {
        console.log("Attempting to scroll to element");
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
        });
    }
}, []);

  useEffect(() => {
    if (wantsToPrint) {
      console.log('Print state updated in provider:', wantsToPrint);
    }
  }, [wantsToPrint]);
  const calculateTextScales = useCallback((containerWidth: number) => {
    setTextScales({
      heading: 24,
      subheading: 18,
      body: 16
    });
  }, []);

  const registerContentRef = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      fullContentRef.current = ref;
      checkOverflow();
    } else {
      fullContentRef.current = null;
    }
  }, []);

  const checkOverflow = useCallback(() => {
    if (!fullContentRef.current) return;
    
    setTimeout(() => {
      const height = fullContentRef.current?.scrollHeight || 0;
      const heightInInches = height / 96;
      const requiredPages = Math.ceil(heightInInches / 11);
      
      setPages(requiredPages);
      setNumberOfPages(requiredPages);
      setContentHeight(height);
    }, 100);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      checkOverflow();
    });

    if (fullContentRef.current) {
      observer.observe(fullContentRef.current);
    }

    return () => observer.disconnect();
  }, [checkOverflow]);

  useEffect(() => {
    if (fullContentRef.current) {
      registerContentRef(fullContentRef.current as HTMLDivElement);
    }
  }, [registerContentRef]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      checkOverflow();
    };

    window.addEventListener('resize', handleResize);
    calculateTextScales(screenWidth);

    return () => window.removeEventListener('resize', handleResize);
  }, [calculateTextScales, screenWidth, checkOverflow]);

  useEffect(() => {
  }, [])

  const [currentTheme, setCurrentTheme] = useState<typeof themes[keyof typeof themes]>(() => {
    
    // NOTE how to apply a theme
    return themes['Tech Bro'];
  });

  const value = {
    textScales,
    techBroTheme,
    techBroData,
    setTechBroData,
    currentTheme,
    currentThemeName,
    setCurrentThemeName,
    pages,
    setPages,
    numberOfPages,
    fullContentRef,
    setNumberOfPages,
    setCurrentTheme,
    calculateTextScales,
    isOverflowing,
    contentHeight,
    pageHeight,
    registerContentRef,
    checkOverflow,
    wantsToPrint,
    setWantsToPrint,
    currentlyTestingNewTheme,
    setCurrentlyTestingNewTheme,
    sectionImCurrentlyEditingRef,
    setSectionImCurrentlyEditingRef
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export default JobKompassResumeProvider;

export const useJobKompassResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useJobKompassResume must be used within a JobKompassResumeProvider');
  }
  return context;
};