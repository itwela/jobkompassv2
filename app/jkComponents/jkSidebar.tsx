'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { JKLogo } from "@/app/jkUtilities_and_Tokens/components/jkLogo"
import JkUserInfoClient from "./jkUserInfoClient"
import { JKColorThemeSelector } from "./jkColorThemeSelector"
import JkNavRoutes from "./jkNavRoutes"
import JkBottomNavRoutes from "./jkBottomNavRoutes"
import { JK_Util_Styles } from "../jkUtilities_and_Tokens/styles"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors"
import { ThemeKeys } from "@/app/types"
import { useJobKompassResume } from "../helpers/providers/JobKompassResumeProvider"

export function AppSidebar() {
  const { user } = useJobKompassUser()
  const { styles } = useJobKompassTheme()
  const { wantsToPrint } = useJobKompassResume()
  const { open } = useSidebar()
  
  if (wantsToPrint === true) return null

  return (
    <Sidebar 
      collapsible='icon' 
      className=""
      style={{
        backgroundColor: styles.background,
      }}
    >

      <SidebarContent style={{ backgroundColor: styles.background }} className="no-scrollbar w-full relative z-10">
        <SidebarGroup>
          <SidebarGroupContent className="space-y-1">
            {/* Logo Section */}
            <div style={{justifyContent : open ? 'flex-start' : 'center'}} className="w-full flex items-center bg-orang-200 transition-all duration-300 hover:translate-y-[-2px]">
                <JKLogo/>
            </div>

            {/* Navigation Routes */}
            <div className="space-y-1">
              <JkNavRoutes/>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter 
        className="relative w-full z-10 border-t border-white/10 backdrop-blur-xl"
        style={{
          backgroundColor: styles.background,
          // boxShadow: '0 -4px 16px -8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <SidebarContent className="no-scrollbar space-y-4">
          <div className="transition-all duration-300 ">
            <JkBottomNavRoutes/>
          </div>
          <div className="space-y-3">
            <div className="transition-all duration-300 ">
              <JkUserInfoClient/>
            </div>
            <div className="transition-all duration-300">
              <JKColorThemeSelector/>
            </div>
          </div>
        </SidebarContent>
      </SidebarFooter>

    </Sidebar>
  )

}
