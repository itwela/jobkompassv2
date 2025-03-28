'use client'

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { ArrowLeft, Book } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function JkBottomNavRoutes() {
  const { styles } = useJobKompassTheme()
  const { open, state } = useSidebar();
  const items = [
    {
      title: "Blog",
      url: "/blog",
      icon: Book,
      color: styles.nav.colors.home
    },
    {
      title: "Landing",
      url: "/",
      icon: ArrowLeft,
      color: styles.nav.colors.home
    },
  ]
  const router = useRouter()
  const [navItemIndex, setNavItemIndex] = useState<number | null>(null)
  const [isLandingHovered, setIsLandingHovered] = useState<boolean>(false)

  return (
    <SidebarMenu className="space-y-1">
      {items.map((item, index) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <a
              onMouseEnter={() => setNavItemIndex(index)}
              onMouseLeave={() => setNavItemIndex(null)}
              href={item.url}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                backgroundColor: navItemIndex === index ? styles.card.accent : 'transparent',
              }}
            >
              <div className="relative">
                <div className="relative z-10 flex items-center gap-3 py-3">
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
                  <span 
                    className={`font-medium tracking-wide transition-all duration-300 ${state === 'expanded' ? 'block' : 'hidden'}`}
                    style={{
                      color: navItemIndex === index ? styles.nav.activeColor : styles.nav.inactiveColor,
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}