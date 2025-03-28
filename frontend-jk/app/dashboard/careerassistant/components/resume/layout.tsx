import { Metadata } from 'next';
import { Document, Page } from "@htmldocs/react";

export const metadata: Metadata = {
    title: 'Resume HTML Document',
    description: 'Resume document structure for JobKompass Career Assistant',
};

export default function ResumeHTMLLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Document size="A4" orientation="portrait" margin="0.5in">
            <div className="resume-document-container">
                {children}
            </div>
        </Document>
    );
}