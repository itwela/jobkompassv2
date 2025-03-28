'use client';

import { useEffect, useMemo } from 'react';

// Import all images
import robot from '@/public/assets/images/robot.png';
import bluegraient from '@/public/assets/images/b-grad-1.png';
import bluegraient2 from '@/public/assets/images/b-grad-2.png';
import map from '@/public/assets/images/map-layout.png';

type ImageAssets = {
    [key: string]: string;
};

export const useJobKompassAssets = () => {
    // Create a memoized map of all assets
    const assets = useMemo<ImageAssets>(() => ({
        robot: robot.src,
        blueGradient1: bluegraient.src,
        blueGradient2: bluegraient2.src,
        mapLayout: map.src,
    }), []);

    // Function to get asset URL by key
    const getAsset = (key: keyof typeof assets) => {
        return assets[key];
    };

    // Preload images
    useEffect(() => {
        Object.values(assets).forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }, [assets]);

    return {
        assets,
        getAsset
    };
};