
'use client'

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  import { Calendar, Home, Book, ArrowLeft, SettingsIcon, Inbox, Search, Settings,  User2, ChevronUp, ArrowLeftFromLine } from "lucide-react"
import { supabaseClientClient } from "../utils/supabase/client"
import { useRouter } from "next/navigation"
import { useJobKompassUser } from "../helpers/providers/userProvider"

export default function JkBottomNavRoutes() {

  // Menu items.
  const items = [
    {
      title: "Blog",
      url: "/blog",
      icon: Book,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ]

  // const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    // defaults to the global scope
    await supabaseClientClient.auth.signOut()
    router.push('/')
  }
    
    return (
        <>
            <SidebarMenu>
              {items.map((item: any) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href='/'>
                      <ArrowLeft />
                      <span>Landing</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <span onClick={handleLogout}>
                      <ArrowLeftFromLine />
                      <span>Log Out</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </>
    )
}