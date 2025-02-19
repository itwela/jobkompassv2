'use client'

import { Home, StickyNote, Building2, Pen, Bot, SettingsIcon, Joystick } from "lucide-react"
import { useState } from "react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { useSidebar } from "@/components/ui/sidebar";

export default function JkNavRoutes() {
  const { styles } = useJobKompassTheme()
  const { state, open } = useSidebar()
  const items = [
    {
      title: "Home",
      url: "/dashboard/home",
      icon: Home,
      color: styles.nav.colors.home,
    },
    {
      title: "Applications", 
      url: "/dashboard/applications",
      icon: StickyNote,
      color: styles.nav.colors.applications,
    },
    {
      title: "Career Assistant",
      url: "/dashboard/careerassistant",
      icon: Pen,
      color: styles.nav.colors.careerAssistant,
    },
    {
      title: "Workers",
      url: "/dashboard/workers",
      icon: Bot,
      color: styles.nav.colors.workers,
    },
    {
      title: "Settings",
      url: "/",
      icon: SettingsIcon,
      color: styles.nav.colors.home
    },
    {
      title: "Theme Playground",
      url: "/dashboard/themeplayground",
      icon: Joystick,
      color: styles.nav.colors.home
    },
  ]

  const [navItemIndex, setNavItemIndex] = useState<number | null>(null)

  return (
    <SidebarMenu className="space-y-1">
      {items.map((item, index) => (
        <SidebarMenuItem className="p-0 m-0" key={item.title}>
          <SidebarMenuButton className="p-0 m-0" asChild>
            <a
              onMouseEnter={() => setNavItemIndex(index)}
              onMouseLeave={() => setNavItemIndex(null)}
              href={item.url}
              className={`
                ${open ? 'group p-0 m-0 flex my-[1px] p-2 w-full h-full  relative overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-2px]' : 'group p-0 m-0 flex items-center place-content-center w-full h-full  relative overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-2px]'} 
                `}
              style={{
                backgroundColor: navItemIndex === index ? styles.card.accent : 'transparent',
              }}
            >
              <div className="relative p-0 m-0">
                <div className="relative z-10 flex w-full h-max p-0 m-0  items-center place-content-center gap-3 ">
                  <div 
                    className="rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: navItemIndex === index ? `${item.color}20` : 'transparent'
                    }}
                  >
                    <item.icon 
                      size={20}
                      className="transition-all duration-300"
                      style={{
                        color: navItemIndex === index ? item.color : styles.nav.inactiveColor,
                      }}
                    />
                  </div>

                {open && (
                  <span 
                    className={`font-medium tracking-wide transition-all duration-300 ${state === 'expanded' ? 'block' : 'hidden'}`}
                    style={{
                      color: navItemIndex === index ? styles.nav.activeColor : styles.nav.inactiveColor,
                    }}
                  >
                    {item.title}
                  </span>
                )}  
                
                </div>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}