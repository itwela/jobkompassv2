import dotenv from "dotenv";
import Dashboard from './page';
// import { runStagehand } from '@/app/helpers/utilityFunctions';
import { getJobInformationStagehand } from '@/app/helpers/clients/stagehand';
dotenv.config();



export default async function DashboardWithData() {
      return (
        <Dashboard 
        getJobInformationStagehand={getJobInformationStagehand}
        />
  
)
}
