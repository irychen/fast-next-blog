'use client'

import { APP_NAME, NAV_LINKS } from '@/config'
import Link from 'next/link'
import { Fragment, ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { map } from 'ramda'
import SiderMenu from '@/components/SiderMenu'

const transparentHeight = 200
const showMenuHeightMax = 100

function HeaderBar({ toggleThemeNode }: { toggleThemeNode: ReactNode }) {
    const [isTransparent, setIsTransparent] = useState(true)
    const [isShow, setIsShow] = useState<boolean>(true)
    const historyScrollRef = useRef<number>(0)

    useLayoutEffect(() => {
        const scrollY = window.scrollY
        historyScrollRef.current = scrollY
        setIsShow(scrollY < showMenuHeightMax)
        setIsTransparent(scrollY < transparentHeight)
    }, [])
    useLayoutEffect(() => {
        const handleScroll = () => {
            if (historyScrollRef.current < window.scrollY) {
                if (window.scrollY > showMenuHeightMax) {
                    setIsShow(false)
                }
            } else {
                setIsShow(true)
            }
            setIsTransparent(window.scrollY < transparentHeight)
            historyScrollRef.current = window.scrollY
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const [isShowSiderMenu, setIsShowSiderMenu] = useState(false)

    return (
        <Fragment>
            <SiderMenu
                NavList={NAV_LINKS}
                isShow={isShowSiderMenu}
                onClose={() => {
                    setIsShowSiderMenu(false)
                }}
            />
            <div className={'header-bar'}>
                <style jsx global>
                    {`
                        .theme-toggle-icon {
                            background-color: ${isTransparent ? 'white' : 'var(--header-font-color)'};
                        }
                    `}
                </style>
                <style jsx>
                    {`
                        .header-bar {
                            position: fixed;
                            background-color: ${isTransparent ? 'transparent' : 'var(--header-bg-color)'};
                            box-shadow: ${isTransparent ? 'none' : '0 0 10px rgba(0,0,0,0.2)'};
                            color: ${isTransparent ? 'white' : 'var(--header-font-color)'};
                            transform: ${isShow ? 'translateY(0)' : 'translateY(-100%)'};
                            top: 0;
                            left: 0;
                            right: 0;
                            z-index: 99;
                            display: flex;
                            padding: 0 10px;
                            align-items: center;
                            justify-content: space-between;
                            width: 100%;
                            height: 50px;
                            transition: all 0.3s ease-in-out;
                        }
                    `}
                </style>
                <style jsx>
                    {`
                        ul {
                            padding: 10px 0;
                            margin: 0;
                            display: flex;
                            list-style: none;
                            align-items: center;
                            -webkit-tap-highlight-color: transparent;
                        }
                        li {
                            margin: 0;
                            cursor: pointer;
                            padding: 5px 20px;
                            height: 38px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 500;
                            user-select: none;
                            border-radius: 5px;
                            -webkit-tap-highlight-color: transparent;

                            &:hover {
                                background-color: rgba(0, 0, 0, 0.1);
                            }
                        }
                    `}
                </style>
                <div className={'font-semibold'}>
                    <Link href={'/'}>{APP_NAME}</Link>
                </div>
                <div className={'flex'}>
                    {/* PC */}
                    <div className={'pc-btns hidden sm:flex'}>
                        {toggleThemeNode}
                        <ul>
                            {map(
                                item => (
                                    <Link key={item.name} href={item.url}>
                                        <li key={item.name}>{item.name}</li>
                                    </Link>
                                ),
                                NAV_LINKS,
                            )}
                        </ul>
                    </div>
                    {/* Mobile */}
                    <div className={'mobile-btns sm:hidden flex'}>
                        {toggleThemeNode}
                        <div
                            className={'menu-sider-btn ml-[10px]'}
                            onClick={() => {
                                setIsShowSiderMenu(true)
                            }}
                        >
                            <svg className={'w-6 h-6'} fill={'none'} viewBox={'0 0 24 24'} stroke={'currentColor'}>
                                <path
                                    strokeLinecap={'round'}
                                    strokeLinejoin={'round'}
                                    strokeWidth={2}
                                    d={'M4 6h16M4 12h16M4 18h16'}
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default HeaderBar
