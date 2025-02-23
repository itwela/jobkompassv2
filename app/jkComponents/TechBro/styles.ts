import { TechBroThemeTypes } from "./types";

export const techBroStyles: TechBroThemeTypes = {
  name: "text-clamp-[5px-2.5em-5xl] font-bold text-gray-900 leading-tight",
  heading: "text-clamp-[xl-1.8em-5xl] font-bold text-gray-800 mb-4",
  sectionHeading: "text-[1.4em] font-semibold text-gray-800 mb-[2%] uppercase tracking-wide",
  subheading: "text-[1.2em] font-medium text-gray-700 mb-1",
  body: "text-[1em] text-gray-600 leading-relaxed",
  bodySmall: "text-[0.9em] text-gray-500 leading-relaxed",
  spacing: {
    section: "mb-[4%] last:mb-0",
    item: "mb-[2%] last:mb-0"
  },
// Container
container: "w-full bg-white h-max p-[3%] text-base",
  
// Header Section
header: {
  wrapper: "flex h-max place-items-end justify-between w-full mb-[2%]",
  nameSection: "relative flex flex-col place-items-start h-max pb-[0.5%] leading-none gap-1",
  contactSection: "flex leading-none gap-[3%]",
  contactColumn: "flex flex-col h-max leading-none place-items-end text-[0.9em] gap-1"
},

// Content Sections
section: {
  wrapper: "space-y-[2%]",
  title: "text-[1.2em] font-semibold mb-[1%]",
  content: "space-y-[2%]"
},

// Education Section
education: {
  item: "mb-[2%] last:mb-0",
  details: "pl-[4%] mt-2 space-y-1",
  detailItem: "list-disc text-[0.9em] leading-relaxed"
},

// Experience Section
experience: {
  item: "mb-[2%] last:mb-0",
  details: "pl-[4%] mt-2 space-y-1",
  detailItem: "list-disc text-[0.9em] leading-relaxed"
},

// Projects Section
projects: {
  item: "mb-[2%] last:mb-0",
  details: "pl-[4%] mt-2 space-y-1",
  detailItem: "list-disc text-[0.9em] leading-relaxed"
},

// Skills Section
skills: {
  wrapper: "flex flex-wrap gap-x-[4%] gap-y-[2%]",
  section: "flex-1 min-w-[45%]",
  list: "flex flex-wrap gap-x-[0.5%] gap-y-[1%] mt-2",
  item: "text-[0.9em] after:content-[','] last:after:content-none after:mr-[0.5%]"
}
}