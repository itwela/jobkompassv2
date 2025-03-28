import { TechBroThemeTypes } from "./types";

const nameStyle = `lg:text-4xl text-3xl  font-bold leading-tight`;
const detailItem = `text-gray-600 leading-relaxed mb-3 last:mb-0`;

// export const techBroStyles: TechBroThemeTypes = {
//   name: nameStyle,
//   heading: `font-bold text-gray-800`,
//   sectionHeading: `
//     ~jk-text-md/4xl 
//     mb-4 underline font-semibold text-gray-800 uppercase tracking-wide`,
//   subheading: `
//     ~jk-text-md/4xl 
//     font-semibold`,
//   body: `
//     ~jk-text-sm/3xl 
//     text-gray-600 mb-2 leading-relaxed`,
//   bodySmall: `
//     ~jk-text-sm/3xl 
//     text-gray-500 mb-1 leading-snug flex items-center`,

//   spacing: {
//     section: "mb-6 pb-4 border-b-[1px] border-black/10 last:mb-0 last:pb-0 last:border-none",
//     item: "mb-3 last:mb-0",
//   },

//   container: "min-w-[8in] max-w-[95%] bg-white h-max text-base",
//   // container: "min-w-[8in] max-w-[95%] bg-white h-max text-base",

//   header: {
//     wrapper: "flex justify-between items-start w-full mb-4",
//     nameSection: "flex flex-col",
//     contactSection: "flex gap-4",
//     contactColumn: "flex flex-col items-end",
//   },

//   section: {
//     wrapper: "w-full space-y-3",
//     title: "font-semibold mb-2",
//     content: "space-y-3",
//   },

//   education: {
//     item: "mb-3 last:mb-0",
//     details: "pl-4 list-disc",
//     detailItem: "text-gray-600 leading-relaxed",
//   },

//   experience: {
//     item: "mb-3 last:mb-0",
//     details: "pl-4 list-disc",
//     detailItem: "text-gray-600 leading-relaxed",
//   },

//   projects: {
//     item: "mb-3 last:mb-0",
//     details: "pl-4 list-disc",
//     detailItem: "text-gray-600 leading-relaxed",
//   },

//   skills: {
//     wrapper: "flex flex-wrap gap-x-6 gap-y-3",
//     section: "flex-1 min-w-[45%]",
//     list: "flex flex-wrap bread-word max-w-[96%] ",
//     item: "text-gray-600 after:content-[','] after:mr-1 last:after:content-none",
//   },
// };

export const techBroStyles: TechBroThemeTypes = {
  name: `text-[length:2.4cqw] font-bold leading-tight`,
  heading: `font-bold text-[length:2.8cqw] text-gray-800`,
  sectionHeading: `text-[length:2.4cqw] mb-[1cqw] underline font-semibold uppercase tracking-wide text-gray-800`,
  subheading: `text-[length:2cqw] font-semibold text-gray-700`,
  body: `text-[length:1.6cqw] mb-[0.5cqw] leading-relaxed text-gray-600`,
  bodySmall: `text-[length:1.4cqw] leading-snug flex items-center text-gray-500`,

  spacing: {
    section: "mb-[1.5cqw] pb-[0.75cqw] border-b-[1px] border-black/10 last:mb-0 last:pb-0 last:border-none",
    item: "mb-[0.75cqw] last:mb-0",
  },

  container: "w-full bg-white h-max",

  header: {
    wrapper: "flex justify-between items-start w-full mb-[1.5cqw]",
    nameSection: "flex flex-col gap-[0.25cqw]",
    contactSection: "flex gap-[1cqw]",
    contactColumn: "flex flex-col items-end gap-[0.25cqw]",
  },

  section: {
    wrapper: "w-full space-y-[1cqw]",
    title: "font-semibold mb-[0.5cqw]",
    content: "space-y-[0.75cqw]",
  },

  education: {
    item: "mb-[1cqw] last:mb-0",
    details: "pl-[1.5cqw] list-disc mt-[0.25cqw]",
    detailItem: "text-gray-600 leading-relaxed mb-[0.25cqw]",
  },

  experience: {
    item: "mb-[1cqw] last:mb-0",
    details: "pl-[1.5cqw] list-disc mt-[0.25cqw]",
    detailItem: "text-gray-600 leading-relaxed mb-[0.25cqw]",
  },

  projects: {
    item: "mb-[1cqw] last:mb-0",
    details: "pl-[1.5cqw] list-disc mt-[0.25cqw]",
    detailItem: "text-gray-600 leading-relaxed mb-[0.25cqw]",
  },

  skills: {
    wrapper: "flex flex-wrap gap-x-[1.5cqw] gap-y-[0.75cqw]",
    section: "flex-1 min-w-[45%]",
    list: "flex flex-wrap break-words max-w-[96%] gap-[0.25cqw]",
    item: "text-gray-600 after:content-[','] after:mr-[0.25cqw] last:after:content-none",
  },
};