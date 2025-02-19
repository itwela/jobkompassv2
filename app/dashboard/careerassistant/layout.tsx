import { Metadata } from 'next';
import CareerAssistantClient from "./page";

export const metadata: Metadata = {
    title: 'Career Assistant - Resume Builder',
    description: 'Create and manage your professional resume with JobKompass Career Assistant',
};

export default function CareerAssistantServer() {
    return (
        <>
            <CareerAssistantClient/>
        </>
    );
}