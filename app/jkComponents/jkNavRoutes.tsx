'use client'

import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, StickyNote, Building2, Pen, Bot } from "lucide-react"
import { useState } from "react"

export default function JkNavRoutes() {
  // Menu items.
  const items = [
    {
      title: "Home",
      url: "/dashboard/home",
      icon: Home,
    },
    {
      title: "Applications",
      url: "/dashboard/applications",
      icon: StickyNote,
      color: JK_Colors.lightBlue,
    },
    {
      title: "Company Hub",
      url: "/dashboard/companyhub",
      icon: Building2,
      color: JK_Colors.blue,
    },
    {
      title: "Career Assistant",
      url: "/dashboard/careerassistant",
      icon: Pen,
      color: JK_Colors.indigo,
    },
    {
      title: "Workers",
      url: "/dashboard/workers",
      icon: Bot,
      color: JK_Colors.purple,
    },
  ]

  const hexToRgba = (hex: string, alpha: number) => {
    const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16))
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const [navItemIndex, setNavItemIndex] = useState<number | null>(null)

  return (
    <SidebarMenu>
      {items.map((item, index) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <a
              onMouseOver={() => setNavItemIndex(index)}
              onMouseOut={() => setNavItemIndex(null)}
              href={item.url}
              style={{
                backgroundColor:
                  navItemIndex === index
                    ? item.color
                      ? hexToRgba(item.color, 0.5)
                      : hexToRgba(JK_Colors.darkGrey, 0.5)
                    : 'transparent',
              }}
            >
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}