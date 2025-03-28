'use client'

export const JK_Design_System = {
    typography: {
        fontFamily: {
            // sans: 'IBM Plex Sans, sans-serif',
            sans: '',
            mono: ''
            // mono: 'Berkeley Mono, monospace'
        },
        fontSize: {
            xs: '0.75rem',     // 12px
            sm: '0.875rem',    // 14px
            base: '1rem',      // 16px
            lg: '1.125rem',    // 18px
            xl: '1.25rem',     // 20px
            '2xl': '1.5rem',   // 24px
            '3xl': '1.875rem', // 30px
            '4xl': '2.25rem',  // 36px
            '5xl': '3rem',     // 48px
        },
        lineHeight: {
            tight: '1.2',
            base: '1.5',
            relaxed: '1.75'
        },
        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700'
        }
    },
    icon: {
        size: {
            xs: '0.75rem',     // 12px - for very small indicators
            sm: '1rem',        // 16px - for inline text icons
            base: '1.25rem',   // 20px - default icon size
            lg: '1.5rem',      // 24px - for prominent UI elements
            xl: '2rem',        // 32px - for featured icons
            '2xl': '2.5rem',   // 40px - for hero sections
            '3xl': '3rem',     // 48px - for large displays
        },
        padding: {
            tight: '0.25rem',  // 4px - minimal padding
            base: '0.5rem',    // 8px - default padding
            relaxed: '0.75rem' // 12px - more spacious layout
        }
    },
    colors: {
        background: {
            light: '#F8F8FA',
            secondary: '#EAEAF0'
        },
        text: {
            dark: '#1A1A1A',
            secondary: '#575759',
            muted: '#6B7280'
        },
        border: {
            light: '#E5E7EB',
            medium: '#D1D5DB'
        },
        primary: {
            blue: '#2584FF'
        },
        neutral: {
            black: '#000000',
            lightGray: '#D9D9D9',
            mediumGray: '#ABABAF'
        }
    },
    spacing: {
        base: '8px',
        padding: {
            xs: '0.25rem',      // 8px
            sm: '0.75rem',     // 12px
            base: '1rem',      // 16px
            md: '1.5rem',      // 24px
            lg: '2rem',        // 32px
            xl: '3rem',        // 48px
            '2xl': '4rem',     // 64px
        },
        margin: {
            xs: '0.5rem',
            sm: '0.75rem',
            base: '1rem',
            md: '1.5rem',
            lg: '2rem',
            xl: '3rem',
            '2xl': '4rem',
        },
        layout: {
            containerPadding: '1.5rem',
            sectionGap: '2rem',
            componentGap: '1rem',
            maxWidth: '1200px'
        }
    },
    effects: {
        shadow: {
            sm: '0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        },
        borderRadius: {
            sm: '0.375rem',
            md: '0.5rem',
            lg: '0.75rem',
            xl: '1rem'
        }
    },
    components: {
        card: {
            base: 'rounded-lg backdrop-blur-md transition-all duration-300',
            padding: 'p-3'
        },
        button: {
            base: 'rounded-lg px-4 py-2 font-medium backdrop-blur-sm transition-all duration-200',
            calendar: 'px-3 py-1.5 text-sm font-medium rounded-md transition-colors hover:bg-opacity-80'
        },
        input: {
            base: 'rounded-lg backdrop-blur-sm px-4 py-2 transition-all duration-200'
        },
        text: {
            heading: 'text-2xl font-semibold tracking-tight',
            subtitle: 'text-sm font-normal',
            superSubtitle: 'text-xs font-medium uppercase tracking-wider',
            logo: 'font-bold tracking-tight'
        }
    },
    layout: {
        sidebar: {
            helper: 'w-[20%] min-w-[200px] transition-all duration-200'
        },
        container: {
            dashboard: 'h-screen flex w-ful',
            landing: 'min-h-screen flex items-center justify-center p-6',
            topLayer: 'h-full w-full w-full rounded-xl'
        },
        padding: {
            consoleOpen: 'p-6 pt-20 w-full max-w-7xl mx-auto transition-all duration-200',
            consoleClosed: 'p-8 pt-20 w-full max-w-7xl mx-auto transition-all duration-200'
        },
    }
}

export const JK_Styles = (open?: boolean) => ({
    twBgStyleSidebarHelper: 'w-full md:w-[calc(100vw-18rem)] transition-all duration-200',
    bigDashboardContainerStyle: `min-h-screen bg-opacity-98 backdrop-blur-sm p-6`,
    landingPageContainerStyle: 'min-h-screen flex items-center justify-center p-6',
    topLayerBigDashboardContainerStyle: 'w-full max-w-7xl mx-auto rounded-xl shadow-lg bg-white/5 backdrop-blur-md',
    consoleOpenPadding: 'p-6 pt-20 w-full max-w-7xl mx-auto transition-all duration-200',
    consoleClosedPadding: 'p-8 pt-20 w-full max-w-7xl mx-auto transition-all duration-200',
    headingSize: 'text-2xl font-semibold tracking-tight',
    subTitleSize: 'text-sm font-normal text-gray-400/80',
    superSubtitleSize: 'text-xs font-medium uppercase tracking-wider',
    componentPadding: 'p-6',
    cardStyle: 'rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-Glassmorphism hover:shadow-lg hover:bg-white/15 transition-all duration-300',
    buttonStyle: 'rounded-lg px-4 py-2 font-medium bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200',
    inputStyle: 'rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 focus:ring-2 focus:ring-white/30 hover:bg-white/15 transition-all duration-200',
    logo: 'font-bold tracking-tight'
})






