import Image from 'next/image'

type Props = {
    title: string
    description: string
    image: string
}

function ImageBanner(props: Props) {
    const { title, description, image } = props
    return (
        <div className={'image-banner md:h-[430px] h-[300px] relative'}>
            <Image
                src={image}
                alt={'background'}
                fill={true}
                priority={true}
                style={{
                    objectFit: 'cover',
                    filter: 'brightness(0.7)',
                }}
                sizes={'100%'}
            ></Image>
            <div
                className={'text-wrapper'}
                style={{
                    width: '100%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    color: '#fff',
                    textAlign: 'center',
                }}
            >
                <div className={'image-banner__title font-bold text-[40px]'}>{title}</div>
                <div className={'image-banner__description font-extralight'} style={{}}>
                    {description}
                </div>
            </div>
        </div>
    )
}

export default ImageBanner
