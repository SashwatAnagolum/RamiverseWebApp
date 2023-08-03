import { WorldInfoInterface } from "../WorldPreviewCard/WorldPreviewCard";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import Button from "../Button/Button";
import { BUILD_ID_FILE } from "next/dist/shared/lib/constants";


type WorldDetailsProps = {
    isOpen: boolean;
    worldInfo: WorldInfoInterface;
    stateChanger: () => void;
}

export default function WorldDetailsModal(props: WorldDetailsProps) {
    let modalElement: JSX.Element;

    if (props.isOpen) {
        document.body.style.overflow = 'hidden';

        modalElement = (
            <div className="duration-100 fixed top-0 left-0 h-screen w-screen bg-white z-50">
                <div className="absolute top-0 left-0 w-full flex flex-col p-5 gap-y-5">
                    <div
                        className="rounded-full h-9 w-9 bg-midnightblue self-end cursor-pointer"
                        onClick={() => props.stateChanger()}
                    >
                        <div className="h-1 w-5 rotate-45 bg-white translate-y-4 translate-x-2"></div>
                        <div className="h-1 w-5 -rotate-45 bg-white translate-y-3 translate-x-2"></div>
                    </div>
                </div>
                <div className="flex flex-col w-full mt-5 gap-y-5">
                    <div className="mx-5">
                        <h2 className="page-title">{props.worldInfo.worldName}</h2>
                        <p>{props.worldInfo.worldUploader}</p>
                    </div>
                    <div className="mx-5">
                        <Button text="Explore World" type="redirect" theme="blue"></Button>
                    </div>
                    <div className="mx-5">
                        <p className="font-bold">World Screenshots</p>
                    </div>
                    <div className="w-full h-100">
                        <ImageCarousel imageURLs={props.worldInfo.worldImages}></ImageCarousel>
                    </div>
                    <div className="mx-5">
                        <p className="font-bold">Description</p>
                        <p>{props.worldInfo.worldShortDesc}</p>
                    </div>
                </div >
            </div >
        )
    } else {
        document.body.style.overflow = 'auto';
        modalElement = <></>;
    }

    return modalElement;
}