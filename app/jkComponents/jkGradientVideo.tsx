'use client'

import { useJobKompassTheme } from "../helpers/providers/themeProvider";

interface JkGradientVideoProps {
    videoSrc: string;
    gradientDirection?: 'right' | 'left' | 'top' | 'bottom';
    gradientColors?: {
        start: string;
        end: string;
    };
}

export default function JkGradientVideo({ 
    videoSrc,
    gradientDirection = 'right',
    gradientColors,
 }: JkGradientVideoProps) {

    const { styles, theme } = useJobKompassTheme();

    const getGradientDirection = () => {
        switch(gradientDirection) {
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
        start: styles.black,
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
            className="absolute z-[1] object-cover"
            style={{ width: '100%', height: '100%', opacity: '100%', filter: 'none' }}
            onLoadedMetadata={(e) => {
                const video = e.target as HTMLVideoElement;
                video.playbackRate = 0.818;
            }}
            >
            <source src={`/assets/vids/${videoSrc}`} type="video/mp4" />
        </video>
        <div 
                className="absolute w-full h-full z-[2]"
                style={{
                    background: `linear-gradient(to bottom, ${colors.start}, ${colors.start}, ${colors.end})`,
                }}
            />
            {/* <div 
                className="absolute w-full h-[80%] z-[2]"
                style={{
                    background: `linear-gradient(to bottom, ${colors.start}, ${colors.start} 20%, ${colors.end})`,
                }}
            /> */}

            </>
    );
}