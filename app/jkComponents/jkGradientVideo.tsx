'use client'

import Image from "next/image";
import { useJobKompassTheme } from "../helpers/providers/themeProvider";

interface JkGradientImageProps {
    videoName: string;
    typeOfVideo?: string;
    imageAlt?: string;
    width?: number;
    height?: number;
    opacity?: string;
    flip?: boolean;
    gradientDirection?: 'right' | 'left' | 'top' | 'bottom';
    gradientColors?: {
        start: string;
        end: string;
    };
    className?: string;
    imageTop?: string;
    imageBottom?: string;
    imageLeft?: string;
    imageRight?: string;
    needsInversion?: boolean;
}

export default function JkGradientVideo({
    videoName,
    typeOfVideo,
    imageAlt = "",
    width = 1000,
    height = 1000,
    opacity = "100%",
    flip = false,
    gradientDirection = 'right',
    gradientColors,
    className = "",
    imageTop,
    imageBottom,
    imageLeft,
    imageRight,
    needsInversion
}: JkGradientImageProps) {
    const { styles, theme } = useJobKompassTheme();

    const getGradientDirection = () => {
        switch (gradientDirection) {
            case 'left':
                return 'to left';
            case 'top':
                return 'to top';
            case 'bottom':
                return 'to bottom';
            default:
                return 'to right';
        }
    };

    const defaultColors = {
        start: styles.background,
        end: 'transparent'
    };

    const colors = gradientColors || defaultColors;

    return (
        <>

            <video
                autoPlay
                loop
                muted
                playsInline
                className={`absolute z-[1] object-cover ${className}`}
                style={{  }}
                onLoadedMetadata={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.playbackRate = 1.5;
                    console.log("the videoath pis.....", video)
                }}
            >
                <source src={`/assets/vids/${videoName}`} type={`video/${typeOfVideo} || mp4`} />
            </video>
            {/* <div
                className="absolute w-[70%] h-full z-[2]"
                style={{
                    background: `linear-gradient(${getGradientDirection()}, ${colors.start}, ${colors.start} 40%, ${colors.end})`,
                }}
            />
            <div
                className="absolute w-full h-[80%] z-[2]"
                style={{
                    background: `linear-gradient(to top, ${colors.start}, ${colors.start} 40%, ${colors.end})`,
                }}
            /> */}
        </>
    );
}