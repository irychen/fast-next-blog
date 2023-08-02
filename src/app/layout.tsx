import '@/style/globals.scss'
import type { Metadata } from 'next'
import StyledJsxRegistry from '@/app/registry'
import { APP_DESCRIPTION, APP_NAME } from '@/config'
import { cookies } from 'next/headers'
export const metadata: Metadata = {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#fafafa' },
        { media: '(prefers-color-scheme: dark)', color: '#151515' },
    ],
    appleWebApp: {
        title: APP_NAME,
        statusBarStyle: 'default',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')?.value || 'light'
    const isAuto = cookieStore.get('isAutoTheme')?.value === 'yes'

    return (
        <html lang="zh">
            <body className={`theme-class-wrapper ${isAuto ? 'auto' : theme}`}>
                <StyledJsxRegistry>{children}</StyledJsxRegistry>
            </body>
        </html>
    )
}
