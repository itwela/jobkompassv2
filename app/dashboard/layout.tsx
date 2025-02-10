import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/jkComponents/jkSidebar"
import { JobKompassUserProvider } from "../helpers/providers/userProvider"
import ReactQueryProvider from "../helpers/providers/tanstackProviders"
import { JobKompassAuthProvider } from "../helpers/providers/authContext"
import { JobKompassLandingProvider } from "../helpers/providers/landingProvider"
import { JobKompassJobsProvider } from "../helpers/providers/jobsProvider"

export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <ReactQueryProvider>
      <JobKompassAuthProvider>
        <JobKompassUserProvider>
        <JobKompassJobsProvider>

          <JobKompassLandingProvider>
              <SidebarProvider>

                <AppSidebar />

                  {children}

              </SidebarProvider>
            </JobKompassLandingProvider>
        </JobKompassJobsProvider>
        </JobKompassUserProvider>
      </JobKompassAuthProvider>
    </ReactQueryProvider>
  )
}