'use client'

import { useJobKompassTheme } from "@/app/helpers/providers/themeProvider";
import PrintResume from "./resume/🖨️Presume";
import { useJobKompassResume } from "@/app/helpers/providers/JobKompassResumeProvider";
import { Page, Document } from "@htmldocs/react";
import React from "react";

export default function PrintDocumentComponent({ currentTheme, styles, data,}: {currentTheme: any, styles: any,  data: any;  }) {
    const [isReady, setIsReady] = React.useState(false);
    const [isBrowser, setIsBrowser] = React.useState(false);
    const { wantsToPrint, setWantsToPrint } = useJobKompassResume()

    React.useEffect(() => {
        setIsBrowser(true);
        if (data && currentTheme) {
            setIsReady(true);
        }
    }, [data, currentTheme]);

    if (!isBrowser) {
        return null;
    }

    if (!isReady) {
        return (
            <div
            className="w-screen flex place-items-center place-content-center flex-col print-document-container min-h-screen">
                <p>Loading content...</p>
            </div>
        );
    }

    const handlePrint = () => {
        setWantsToPrint(true);
        setTimeout(() => {
            window.print();
        }, 100);
    };

    const hnadleGoBack = () => {
        setWantsToPrint(false)
    }

    const handleCopy = async () => {
        try {
            const content = document.querySelector('.resume-preview')?.innerHTML;
            if (content) {
                await navigator.clipboard.writeText(content);
                alert('Resume content copied to clipboard!');
            }
        } catch (error) {
            console.error('Failed to copy:', error);
            alert('Failed to copy resume content');
        }
    };

    return (
        <div 
            className="w-screen flex place-items-center place-content-center flex-col print-document-container min-h-screen"
            style={{
                background: styles.background,
                color: styles.text?.primary
            }}
        >
            <div className="flex gap-4 justify-center py-4 print:hidden">
                <button
                    onClick={handlePrint}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Save
                </button>
                <button
                    onClick={hnadleGoBack}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Back
                </button>
            </div>
            <PrintResume
            />
        </div>
    );
}
