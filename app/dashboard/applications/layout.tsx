import ApplicationsClient from "./page";
import dotenv from "dotenv";

dotenv.config();


export default function ApplicationsServer() {
    return (
        <>
        <ApplicationsClient/>
        </>
    );
}