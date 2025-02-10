import { useJobKompassUser } from "@/app/helpers/providers/userProvider"
import { JK_Colors } from "@/app/jkUtilities_and_Tokens/colors"
import { ThemeKeys } from "@/app/types"


export default function DocumentEditor() {
    
    const {user} = useJobKompassUser()

    return (
        <div 
        style={{
            color: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.textColor,
            backgroundColor: JK_Colors?.[user?.[0]?.color_theme as ThemeKeys]?.bg}}
        className="w-full h-full absolute z-10">
            <h1>Document Editor</h1>
        </div>
    )
}