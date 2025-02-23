export interface TechBroData {
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

export interface TechBroThemeTypes {
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
  container?: string;
  header?: {
    wrapper: string;
    nameSection: string;
    contactSection: string;
    contactColumn: string;
  };
  section?: {
    wrapper: string;
    title: string;
    content: string;
  };
  education?: {
    item: string;
    details: string;
    detailItem: string;
  };
  experience?: {
    item: string;
    details: string;
    detailItem: string;
  };
  projects?: {
    item: string;
    details: string;
    detailItem: string;
  };
  skills?: {
    wrapper: string;
    section: string;
    list: string;
    item: string;
  };
}


export interface TechBroProps {
  data: TechBroData;
  theme: TechBroThemeTypes;
  registerContentRef?: (ref: HTMLDivElement | null) => void;
  scale?: number;
  zoom?: number;
}