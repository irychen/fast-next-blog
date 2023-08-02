import { memo, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { map } from 'ramda'

type Props = {
    NavList: Array<{ name: string; url: string }>
    isShow: boolean
    onClose?: () => void
}

function SiderMenu(props: Props) {
    const { NavList, isShow, onClose } = props
    const [delayedShowSiderMenu, setDelayedShowSiderMenu] = useState<boolean>(false)
    const timerRef = useRef<any>(undefined)
    useEffect(() => {
        if (isShow) {
            setDelayedShowSiderMenu(true)
        } else {
            clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => {
                setDelayedShowSiderMenu(false)
            }, 300)
        }
    }, [isShow])
    return (
        <div
            className={'sider-menu-container'}
            onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                onClose && onClose()
            }}
        >
            <style jsx>
                {`
                    .sider-menu-container {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 999;
                        display: ${isShow ? 'flex' : 'none'};
                        justify-content: flex-end;
                        width: 100%;
                        height: 100vh;
                    }
                `}
            </style>
            <style jsx>{`
                .sider-menu {
                    height: 100%;
                    overflow-y: auto;
                    width: 160px;
                    background-color: var(--header-bg-color);
                    box-shadow: 0 0 26px 1px rgba(0, 0, 0, 0.05);
                    padding: 10px;
                    transform: ${delayedShowSiderMenu ? 'translateX(0)' : 'translateX(100%)'};
                    transition: transform 0.2s ease-in-out;
                }
                ul {
                    -webkit-tap-highlight-color: transparent;
                }
                li {
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: bold;
                    list-style: none;
                    border-radius: 5px;
                    padding: 10px 10px;
                    display: flex;
                    align-items: center;

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.1);
                    }
                }
            `}</style>
            <div
                className={'sider-menu'}
                onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
            >
                <div className={'close-btn-container w-full flex p-[10px] items-center'}>
                    <div
                        className={'close-btn'}
                        onClick={e => {
                            e.stopPropagation()
                            e.preventDefault()
                            onClose && onClose()
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M18 6L6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <ul>
                    {map(
                        item => (
                            <Link key={item.name} href={item.url}>
                                <li key={item.name}>{item.name}</li>
                            </Link>
                        ),
                        NavList,
                    )}
                </ul>
            </div>
        </div>
    )
}

export default memo(SiderMenu)
