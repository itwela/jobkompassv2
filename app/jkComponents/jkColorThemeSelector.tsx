'use client'

import { useJobKompassUser } from "@/app/helpers/providers/userProvider";
import { Dock, DockIcon } from "@/components/ui/dock";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useEffect } from "react";

import { JobKompassUserType } from "@/app/helpers/providers/userProvider";
import { toggleColorPreference } from "./actions";


export const JKColorThemeSelector = () => {
    const {user, refetchUserData} = useJobKompassUser() 
    const queryClient = useQueryClient();

    const handleThemeChange = async (theme: string, userId: string) => {
        try {
            await toggleColorPreference(userId, theme);
            // Refetch user data after successful theme change
            await refetchUserData();
        } catch (error) {
            console.error('Error changing theme:', error);
        }
    };

    return (
        <span className="no-scrollbar w-full flex align-items-center place-content-center justify-around">
            <button onClick={() => handleThemeChange('light', user?.[0]?.user_id)}>light</button>
            <button onClick={() => handleThemeChange('dark', user?.[0]?.user_id)}>dark</button>
        </span>
    );
}