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
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { JKLogo } from "@/app/jkUtilities_and_Tokens/components/jkLogo"
import JkUserInfoClient from "./jkUserInfoClient"
import { JKColorThemeSelector } from "./jkColorThemeSelector"
import JkNavRoutes from "./jkNavRoutes"
import JkBottomNavRoutes from "./jkBottomNavRoutes"
 

export function AppSidebar() {
  


  return (
    <Sidebar collapsible='icon'>
    
      <SidebarContent className="no-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="hidden"></SidebarGroupLabel>
          <SidebarGroupContent>
            
            <JKLogo/>
            <JkNavRoutes/>
          
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>

        <SidebarContent className="no-scrollbar">
          
          <JkBottomNavRoutes/>
          <JkUserInfoClient/>
          <JKColorThemeSelector/>
        
        </SidebarContent>
        
      </SidebarFooter>
    
    </Sidebar>
  )
}

