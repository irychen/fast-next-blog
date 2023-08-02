'use client'

import { useMemo, useState } from 'react'
import { setCookie } from 'nookies'
export type Theme = 'light' | 'dark'

function Capitalize(str: string) {
    if (!str) return str
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const themeMap = {
    light: 'dark',
    dark: 'auto',
    auto: 'light',
} as {
    [key: string]: string
}

type Props = {
    initTheme?: Theme
    initIsAuto?: boolean
}

function ThemeToggle(props: Props) {
    const { initIsAuto, initTheme } = props
    const [theme, setTheme] = useState<Theme>(initTheme || 'light')
    const [isAuto, setIsAuto] = useState<boolean>(initIsAuto || false)

    const currentTheme = useMemo(() => {
        return isAuto ? 'auto' : theme
    }, [theme, isAuto])

    function updateTheme(newTheme: Theme) {
        setTheme(newTheme)
        setCookie(null, 'theme', newTheme, { maxAge: 60 * 60 * 24 * 365 }) // 将主题存储到 cookie，有效期 365 天
    }

    function updateAuto(v: boolean) {
        setIsAuto(v)
        setCookie(null, 'isAutoTheme', v ? 'yes' : 'no', { maxAge: 60 * 60 * 24 * 365 }) // 将主题存储到 cookie，有效期 365 天
    }

    return (
        <div
            className={'theme-toggle flex items-center px-[10px] select-none'}
            onClick={() => {
                const next = themeMap[currentTheme]
                if (next === 'auto') {
                    updateAuto(true)
                    document.body.classList.remove(...['dark', 'light'])
                } else {
                    document.body.classList.remove(...['auto', 'dark', 'light'])
                    updateAuto(false)
                    document.body.classList.add(next)
                    updateTheme(next as Theme)
                }
            }}
        >
            <div className={'hidden sm:flex'}>{Capitalize(currentTheme)}</div>
            <style jsx>{`
                .theme-toggle {
                    -webkit-tap-highlight-color: transparent;
                }
                .theme-toggle-icon {
                    width: 16px;
                    flex-shrink: 0;
                    height: 16px;
                    mask-image: ${`url("/icon/theme-${currentTheme}.svg")`};
                    vertical-align: middle;
                    box-sizing: border-box;
                    mask-repeat: no-repeat;
                    display: inline-block;
                    transition: all 0.3s ease;
                }
            `}</style>
            <div className={'theme-toggle-icon sm:ml-[6px] ml-0'}></div>
        </div>
    )
}

export default ThemeToggle
