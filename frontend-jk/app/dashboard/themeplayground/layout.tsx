import { ReactNode } from 'react'

export default function ThemePlaygroundLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div className="min-h-screen w-full">
            {children}
        </div>
    )
}