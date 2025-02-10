'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useJobKompassAuth } from "../helpers/providers/authContext";


export default function DashboardLoadSettingsClient() {
    const router = useRouter();
    const {setAuthEmail, setAuthPassword} = useJobKompassAuth()
    

    useEffect(() => {
        setAuthEmail?.('')
        setAuthPassword?.('')
        router.push('/dashboard/home')
    }, [])

}