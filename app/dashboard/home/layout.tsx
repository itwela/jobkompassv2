import { Suspense } from 'react';
import dotenv from "dotenv";
import StagehandConfig from "@/stagehand.config";
import Dashboard from './page';
// import { runStagehand } from '@/app/helpers/utilityFunctions';
import { JK_Colors } from '@/app/jkUtilities_and_Tokens/colors';
import SplashScreen from '@/app/jkUtilities_and_Tokens/components/splashScreen';
import { getJobInformationStagehand } from '@/app/helpers/clients/stagehand';
dotenv.config();



export default async function DashboardWithData() {
      return (
        <Dashboard 
        getJobInformationStagehand={getJobInformationStagehand}
        />
  
)
}
