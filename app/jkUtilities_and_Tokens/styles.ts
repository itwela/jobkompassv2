'use client'

export const JK_Util_Styles = {
    padding: {
        padding_Small: '0.5rem',
        padding_Medium: '1rem',
        padding_Large: '1.5rem',
        padding_XLarge: '2rem',
        padding_XXLarge: '3rem',
        padding_XXXLarge: '4rem',
    },
    margin: {
        margin_Small: '0.5rem',
        margin_Medium: '1rem',
        margin_Large: '1.5rem',
        margin_XLarge: '2rem',
        margin_XXLarge: '3rem',
        margin_XXXLarge: '4rem',
    },
    borderRadius: {
        radius_Small: '0.375rem',
        radius_Medium: '0.5rem',
        radius_Large: '0.75rem',
        radius_XLarge: '1rem',
    },
    shadow: {
        shadow_Small: '0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        shadow_Medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        shadow_Large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        shadow_Glassmorphism: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    },
    effects: {
        glassmorphism_Light: 'bg-white/10 backdrop-blur-md border border-white/20',
        glassmorphism_Dark: 'bg-black/10 backdrop-blur-md border border-white/10',
        gradient_Primary: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20',
        gradient_Secondary: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20',
        gradient_Accent: 'bg-gradient-to-r from-pink-500/20 to-rose-500/20'
    },
    spacing: {
        container_Padding: '1.5rem',
        section_Gap: '2rem',
        component_Gap: '1rem',
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






