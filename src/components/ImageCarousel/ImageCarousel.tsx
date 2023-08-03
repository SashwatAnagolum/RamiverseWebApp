import Image from "next/image";

type ImageCarouselProps = {
    imageURLs: string[];
}

export default function ImageCarousel(props: ImageCarouselProps) {
    return (
        <div className="flex flex-row h-full w-full overflow-x-scroll snap-x snap-proximity scroll-pl-5">
            {
                props.imageURLs.map(
                    (imageURL) => (
                        <Image
                            src={imageURL}
                            alt="an image"
                            className="rounded-md overflow-clip -z-10 ml-5 snap-start"
                            width={500}
                            height={300}
                            priority
                        >
                        </Image>
                    )
                )
            }
        </div >
    );
}