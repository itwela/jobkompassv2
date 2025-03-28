import { AppSidebar } from "@/app/jkComponents/jkSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { JobKompassAuthProvider } from "../helpers/providers/authContext"
import { JobKompassJobsProvider } from "../helpers/providers/jobsProvider"
import { JobKompassLandingProvider } from "../helpers/providers/landingProvider"
import ReactQueryProvider from "../helpers/providers/tanstackProviders"
import { JobKompassUserProvider } from "../helpers/providers/userProvider"

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