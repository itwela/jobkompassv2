import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./helpers/providers/tanstackProviders";

import dotenv from 'dotenv';
import { JobKompassAuthProvider } from "./helpers/providers/authContext";
import { JobKompassUserProvider } from "./helpers/providers/userProvider";
import { JobKompassLandingProvider } from "./helpers/providers/landingProvider";
import { JobKompassChatProvider } from "./helpers/providers/chatProvider";
import { JobKompassCareerAssistantProvider } from "./helpers/providers/careerAssistantProvider";
import { JobKompassToastProvider } from "./helpers/providers/toastProvider";
import { JobKompassResumeProvider } from "./helpers/providers/JobKompassResumeProvider";
import { JobKompassThemeProvider } from "./helpers/providers/themeProvider";
import { JobKompassApplicationBuddyProvider } from "./helpers/providers/applicaitonBuddyProvider";
import { JobKompassAiResumeProvider } from "./helpers/providers/aiResumeProvider";
import { DialogProvider } from "./helpers/providers/dialogProvider";

dotenv.config();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <JobKompassAuthProvider>
            <JobKompassThemeProvider>
              <JobKompassToastProvider>
                <JobKompassUserProvider>
                  <JobKompassChatProvider>
                    <JobKompassApplicationBuddyProvider>
                      <JobKompassCareerAssistantProvider>
                        <JobKompassResumeProvider>
                          <JobKompassAiResumeProvider>
                          <JobKompassLandingProvider>
                            <DialogProvider>
                            <div className="no-scrollbar">
                              {children}
                            </div>
                            </DialogProvider>
                          </JobKompassLandingProvider>
                          </JobKompassAiResumeProvider>
                        </JobKompassResumeProvider>
                      </JobKompassCareerAssistantProvider>
                    </JobKompassApplicationBuddyProvider>
                  </JobKompassChatProvider>
                </JobKompassUserProvider>
              </JobKompassToastProvider>
            </JobKompassThemeProvider>
          </JobKompassAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
