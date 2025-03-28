'use client'

import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors";
import { ThemeKeys } from "@/app/types";
import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import SplashScreen from "@/app/jkUtilities_and_Tokens/components/splashScreen";
import { useSidebar } from "@/components/ui/sidebar";
import { useJobKompassChat } from "@/app/helpers/providers/chatProvider";

export default function WorkersClient() {

    const { user, userDataIsLoading } = useJobKompassUser()
    const { open } = useSidebar()
    const { input, handleInputChange, handleSubmit } = useJobKompassChat();

    if (userDataIsLoading) {
        return (
            <>
                <div className={`${JK_Styles?.().bigDashboardContainerStyle}`}>
                    <SplashScreen />
                </div>
            </>
        )
    }

    return (
        <div className={`${JK_Styles?.().bigDashboardContainerStyle} w-full`}
            style={{ backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.fg }}
        >
            <div
                className={`min-h-screen relative h-max w-full ${open ? JK_Styles?.().consoleOpenPadding : JK_Styles?.().consoleClosedPadding}`}
                style={{
                    backgroundColor: 'transparent',
                    color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
                }}
            >
                <h1 className='text-2xl animate-pulse'>Workers</h1>


                    <input
                        className="w-full px-3 py-2 border border-gray-700 bg-transparent rounded-lg text-neutral-200"
                        value={input}
                        placeholder="Ask me anything..."
                        onChange={handleInputChange}
                    />

                    <button onClick={handleSubmit}>Test</button>

                <div
                    className="min-h-[50vh] h-[50vh] max-h-[50vh] overflow-y-auto p-4"
                >
                    <div className="min-h-full flex-1 flex flex-col justify-end gap-2 w-full pb-4">

                       
                    </div>
                </div>

            </div>
        </div>
    );
}