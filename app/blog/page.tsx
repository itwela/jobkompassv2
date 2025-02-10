'use client'

import { JK_Styles  } from "@/app/jkUtilities_and_Tokens/styles";
import Header from "@/app/jkComponents/jkLandingHeader";

export default function BlogClient() {
    return (
        <>
        <Header/>
        <div className={`${JK_Styles.landingPageContainerStyle}`}>
            <h1 className='text-2xl'>Blog</h1>
        </div>
        </>
    )
}