'use client'

import Image, { StaticImageData } from "next/image";
import { useJobKompassTheme } from "../helpers/providers/themeProvider";

interface JkGradientImageProps {
    imageSrc: string | StaticImageData;
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

export default function JkGradientImage({
    imageSrc,
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
        start: styles.background,
        end: 'transparent'
    };

    const colors = gradientColors || defaultColors;

    return (
        <>
            <Image
                alt={imageAlt}
                src={imageSrc}
                width={width}
                height={height}
                className={`absolute z-[1] ${className}`}
                style={{
                    opacity: opacity,
                    transform: flip ? 'scaleX(-1)' : 'none',
                    top: imageTop,
                    bottom: imageBottom,
                    left: imageLeft,
                    right: imageRight,
                    filter: needsInversion && theme === 'dark' ? 'invert(1) brightness(1.9)' : 'invert(0) brightness(0.8)', 
                }}
            />
            <div 
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
            />
        </>
    );
}