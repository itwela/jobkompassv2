'use client'

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider"
import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { JKLogo } from "@/app/jkUtilities_and_Tokens/components/jkLogo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar
} from "@/components/ui/sidebar"
import { useJobKompassResume } from "../helpers/providers/JobKompassResumeProvider"
import JkBottomNavRoutes from "./jkBottomNavRoutes"
import { JKColorThemeSelector } from "./jkColorThemeSelector"
import JkNavRoutes from "./jkNavRoutes"
import JkUserInfoClient from "./jkUserInfoClient"

export function AppSidebar() {
  const { user } = useJobKompassUser()
  const { styles } = useJobKompassTheme()
  const { wantsToPrint } = useJobKompassResume()
  const { open } = useSidebar()
  
  if (wantsToPrint === true) return <></>

  if (wantsToPrint === false) return (
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
