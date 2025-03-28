import localFont from 'next/font/local'

export const grillages = localFont({
  src: [
    {
      path: '../public/assets/fonts/grillages/GrillagesThin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/grillages/GrillagesThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/assets/fonts/grillages/Grillages.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/grillages/GrillagesItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/assets/fonts/grillages/GrillagesSemibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/grillages/GrillagesBold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/grillages/GrillagesBoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/assets/fonts/grillages/GrillagesExtrabold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/assets/fonts/grillages/GrillagesExtraboldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-grillages',
  display: 'swap',
})