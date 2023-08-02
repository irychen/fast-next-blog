import HeaderBar from '@/components/HeaderBar'
import ThemeToggle, { Theme } from '@/components/ThemeToggle'
import { cookies } from 'next/headers'
function ServerHeaderWrapper() {
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')?.value || 'light'
    const isAuto = cookieStore.get('isAutoTheme')?.value === 'yes'
    return <HeaderBar toggleThemeNode={<ThemeToggle initIsAuto={isAuto} initTheme={theme as Theme} />}></HeaderBar>
}

export default ServerHeaderWrapper
