import { WorldInfoInterface } from "../WorldPreviewCard/WorldPreviewCard";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import CloseButton from "../CloseButton/CloseButton";
import Button from "../Button/Button";

import { useEffect } from 'react';


type WorldDetailsProps = {
    isOpen: boolean;
    worldInfo: WorldInfoInterface;
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
                        <h2 className="page-title">{props.worldInfo.worldName}</h2>
                        <p>{props.worldInfo.worldUploader}</p>
                    </div>
                    <div className="mx-5">
                        <Button
                            text="Explore World"
                            type="redirect"
                            theme="blue"
                            clickHandler={() => { }}
                        ></Button>
                    </div>
                    <div className="mx-5">
                        <p className="font-bold">World Screenshots</p>
                    </div>
                    <div className="w-full h-48 sm:h-72 md:h-96 lg:px-5">
                        <ImageCarousel imageURLs={props.worldInfo.worldImages}></ImageCarousel>
                    </div>
                    <div className="mx-5">
                        <p className="font-bold">Description</p>
                        <p>{props.worldInfo.worldShortDesc}</p>
                    </div>
                    <div className="flex flex-row flex-wrap mx-5 mb-5 text-xs gap-1">
                        {
                            props.worldInfo.worldTags.map(
                                tag => (
                                    <p className="px-3 py-1 bg-darkgrey text-white rounded-2xl">{tag}</p>
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