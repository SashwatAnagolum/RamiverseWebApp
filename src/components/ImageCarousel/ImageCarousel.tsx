import Image from "next/image";
import { useState } from "react";

type ImageCarouselProps = {
    imageURLs: string[];
}

export default function ImageCarousel(props: ImageCarouselProps) {
    const [slideIndex, setSlideIndex] = useState(0);

    let carouselClassNames = 'duration-200 h-full inline-block grow';
    let carouselStyle = {
        transform: 'translate(0%, -' + (slideIndex * 100).toString() + '%)'
    };

    const activeSliderClass = 'duration-200 w-5 h-5 bg-black rounded-full border-0';
    const nonActiveSliderClass = 'duration-200 w-5 h-5 bg-darkgrey rounded-full border-0';

    let mobileDivClassNames: string = 'flex flex-row h-full w-full overflow-x-scroll snap-x ' +
        'snap-proximity scroll-pl-5 hide-scrollbar lg:hidden';

    let desktopDivClassNames: string = 'h-full w-full hidden overflow-x-hidden ' +
        'overflow-y-hidden hide-scrollbar flex-row lg:flex lg:relative';

    const numSlides: number = props.imageURLs.length;

    return (
        <div className="h-full w-full">
            <div className={mobileDivClassNames}>
                {
                    props.imageURLs.map(
                        (imageURL, index) => (
                            <Image
                                key={index}
                                src={imageURL}
                                alt="an image"
                                className="rounded-md overflow-clip -z-10 ml-5 snap-start object-cover"
                                width={500}
                                height={500}
                                priority
                            >
                            </Image>
                        )
                    )
                }
            </div>
            <div className={desktopDivClassNames}>
                <div className={carouselClassNames} style={carouselStyle}>
                    {
                        props.imageURLs.map(
                            (imageURL, index) => (
                                <div className="h-full w-full">
                                    <Image
                                        key={index}
                                        src={imageURL}
                                        alt="an image"
                                        className="rounded-md overflow-clip w-full h-full -z-10 snap-start object-cover"
                                        width={500}
                                        height={500}
                                        priority
                                    >
                                    </Image>
                                </div>
                            )
                        )
                    }
                </div>
                <div className="h-full flex flex-col justify-around mx-5">
                    <div className="flex flex-col gap-y-5">
                        {
                            props.imageURLs.map(
                                function (imageURL, index) {
                                    let currClassName = (index == slideIndex) ? activeSliderClass : nonActiveSliderClass;

                                    return (
                                        <div
                                            className={currClassName}
                                            key={index}
                                            onClick={() => setSlideIndex(index)}
                                        >
                                        </div>
                                    )

                                }
                            )
                        }

                    </div>
                </div>
            </div>
        </div>

    );
}