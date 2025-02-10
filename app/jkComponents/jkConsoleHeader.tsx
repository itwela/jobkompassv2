import { JK_Styles } from "@/app/jkUtilities_and_Tokens/styles";
import { JK_Colors } from "../jkUtilities_and_Tokens/colors";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import { textComponentDelayTime } from "../jkUtilities_and_Tokens/tokens";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
export default function ConsoleHeader(
    {
    headingText,
    subTitleText,
    } : 
    {
    headingText: any,
    subTitleText: any,
    }
) {

    const { open } = useSidebar()

    return (
        <>
        <span className="absolute z-1 top-0 left-0 place-self-start flex">
        <SidebarTrigger className=" bg-transparent w-[30px] h-[30px]  mx-6 my-4 left-0" />
        </span>
        <BlurFade delay={textComponentDelayTime} inView direction="right">
            {/* <TextAnimate className={`${JK_Styles.headingSize}`} animation="slideRight" by="word" delay={3.618}> */}
            <h1 className={`${JK_Styles(open).headingSize}`} >
                {headingText}  
            </h1>
            {/* </TextAnimate> */}
            {/* <TextAnimate className={`${JK_Styles.subTitleSize}`} animation="slideRight" by="word" */}
            <h1 className={`${JK_Styles(open).subTitleSize}`} 
                style={{
                    opacity: 0.4618
                }}
            >
             {subTitleText}
            </h1>
            {/* </TextAnimate> */}
        </BlurFade>
        </>
    )
}