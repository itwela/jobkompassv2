'use client'

import Image from 'next/image'
import neutralDots from '../assets/gifs/dots/neutralDotsLoading.gif'
import lightBlueDots from '../assets/gifs/dots/lightBlueDotsLoading.gif'
import blueDots from '../assets/gifs/dots/blueDotsLoading.gif'
import indigoDots from '../assets/gifs/dots/indigoDotsLoading.gif'
import purpleDots from '../assets/gifs/dots/purpleDotsLoading.gif'

type ColorOptions = 'neutral' | 'lightBlue' | 'blue' | 'indigo' | 'purple'
interface JkLoaderProps {
    className?: any,
    style?: any,
    width: number,
    height: number,
    color: ColorOptions
}

export default function JkLoaderIcon({
    className, 
    style, 
    width, 
    height, 
    color
} : JkLoaderProps) {

    let dotSrc = neutralDots

    if (color === 'neutral') {
        dotSrc = neutralDots
    } else if (color === 'lightBlue') {
        dotSrc = lightBlueDots
    } else if (color === 'blue') {
        dotSrc = blueDots
    } else if (color === 'indigo') {
        dotSrc = indigoDots
    } else if (color === 'purple') {
        dotSrc = purpleDots
    }

    return (
        <>
            <Image 
                className={className} 
                style={style} 
                src={dotSrc} 
                alt="dots" 
                width={width || 50} 
                height={height || 50} 
            />
        </>
    )
}