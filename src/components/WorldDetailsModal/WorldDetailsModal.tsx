import ImageCarousel from "../ImageCarousel/ImageCarousel";
import CloseButton from "../CloseButton/CloseButton";
import Button from "../Button/Button";

import { useEffect } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";


type WorldDetailsProps = {
    isOpen: boolean;
    worldName: string;
    worldCreator: string;
    worldTags: string[];
    imageURLs: string[];
    worldDesc: string;
    worldExplorePageURL: string;
    stateChanger: () => void;
}

export default function WorldDetailsModal(props: WorldDetailsProps) {
    useEffect(
        () => {
            if (props.isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    );

    let modalElement: JSX.Element;

    if (props.isOpen) {
        modalElement = (
            <div className="duration-100 fixed top-0 left-0 h-screen w-screen bg-white z-50 overflow-y-scroll hide-scrollbar lg:px-24">
                <div className="absolute top-0 left-0 w-full flex flex-col items-end p-5 gap-y-5">
                    <CloseButton stateChanger={props.stateChanger}></CloseButton>
                </div>
                <div className="flex flex-col w-full mt-5 gap-y-5 max-w-screen-xl mx-auto">
                    <div className="mx-5">
                        <h2 className="page-title">{props.worldName}</h2>
                        <p>{props.worldCreator}</p>
                    </div>
                    <div className="mx-5 sm:w-max">
                        <Link href={props.worldExplorePageURL}>
                            <Button
                                text="Explore World"
                                type="redirect"
                                theme="blue"
                                clickHandler={() => { }}
                            ></Button>
                        </Link>
                    </div>
                    <div className="mx-5">
                        <p className="font-bold">World Screenshots</p>
                    </div>
                    <div className="w-full h-48 sm:h-72 md:h-96 lg:px-5">
                        <ImageCarousel imageURLs={props.imageURLs}></ImageCarousel>
                    </div>
                    <div className="mx-5">
                        <p className="font-bold">Description</p>
                        <p>{props.worldDesc}</p>
                    </div>
                    <div className="flex flex-row flex-wrap mx-5 mb-5 text-xs gap-1">
                        {
                            props.worldTags.map(
                                (tag, index) => (
                                    <p
                                        className="px-3 py-1 bg-darkgrey text-white rounded-2xl"
                                        key={index}
                                    >{tag}</p>
                                )
                            )
                        }
                    </div>
                </div >
            </div>
        )
    } else {
        modalElement = <></>;
    }

    return modalElement;
}