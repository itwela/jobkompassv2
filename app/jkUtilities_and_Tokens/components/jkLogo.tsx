'use client';

import { useSidebar } from "@/components/ui/sidebar";
import { Magnet } from "lucide-react";
import { JK_Styles } from "../styles";
import logoSvg from '../../assets/svgs/logo.svg'
import { JKLogoSVG } from "@/app/assets/svgs/logo";

export const JKLogo = () => {

    const { open, state } = useSidebar();
    return (
        <>
        <span style={{display: "flex", padding: '0.5rem', alignItems: "flex-start", justifyContent: state === 'expanded' ? "flex-start" : "center", gap: "0.5rem"}}>
            <span>
                <JKLogoSVG/>
            </span>
            <span className={`${state === 'expanded' ? "block" : "hidden"}`}>
                <span className={`${JK_Styles(open).logo} text-2xl font-bold`}>
                    JobKompass
                </span>
            </span>
        </span>
        </>
        )
        }