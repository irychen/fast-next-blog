import ImageBanner from '@/components/ImageBanner'
import ServerHeaderWrapper from '@/components/ServerHeaderWrapper'

export default function Home() {
    return (
        <main
            style={{
                minHeight: '100vh',
            }}
        >
            <ServerHeaderWrapper />
            <ImageBanner
                image={'/backgrounds/background01.jpg'}
                title={"Rychen's Blog"}
                description={'< keep doing >'}
            />
            <section className={'h-[1200px]'}></section>
        </main>
    )
}
