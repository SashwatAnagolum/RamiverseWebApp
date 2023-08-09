'use client'

import fetchWithTimeout from '@/app/api/utils';
import WorldDetailsModal from '../WorldDetailsModal/WorldDetailsModal';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type WorldPreviewCardProps = {
    imageID: number;
    worldName: string;
    showLoading: boolean;
    worldCreator: string;
    worldURLSlug: string;
    worldTags: string[];
    worldDesc: string;
};

async function fetchImageURLS(urlSlug: string): Promise<string[]> {
    let signedURL, response, urlsString, urlsXML;
    let imageURLs: string[] = new Array();

    response = await fetchWithTimeout(
        './api/presigned',
        {
            headers: {
                'request-type': 'getAll',
                'delimiter': '/',
                'prefix': urlSlug + '/images/',
                'maxKeys': 10
            }
        }
    );

    if (response.status == 200 && response.body) {
        signedURL = new TextDecoder().decode(
            (await response.body.getReader().read()).value
        );
    }

    response = await fetchWithTimeout(signedURL + '');

    if (response.status == 200 && response.body) {
        urlsString = new TextDecoder().decode(
            (await response.body.getReader().read()).value
        );

        urlsXML = new DOMParser().parseFromString(urlsString, 'text/xml');
        urlsXML = urlsXML.getElementsByTagName('Key');

        for (let i = 0; i < urlsXML.length; i++) {
            if (urlsXML[i].textContent?.includes('.png')) {
                imageURLs.push('https://cdn.ramiverse.xyz/' + urlsXML[i].textContent + '');
            }
        }
    }

    return imageURLs;
}

export default function WorldPreviewCard(props: WorldPreviewCardProps) {
    const [isHoveredOn, setIsHoveredOn] = useState(false);
    const [imageURLs, setImageURLs] = useState(new Array());
    const [modalOpen, setModalOpen] = useState(false);
    const [isGettingImages, setIsGettingImages] = useState(true);

    useEffect(
        () => {
            fetchImageURLS(props.worldURLSlug).then(
                imgUrls => {
                    setImageURLs(imgUrls);
                }
            );
        }, [props.worldURLSlug]
    );

    const loadingHeights = [64, 96, 48];

    const boxSizeClasses = 'relative w-full h-' + loadingHeights[props.imageID % 5] +
        ' rounded-lg bg-lightgrey box-border z-0';
    const imgSizeClasses = 'flex flex-col w-full h-' + (loadingHeights[props.imageID % 5]) +
        ' justify-around gap-y-3';

    let imageDivClasses: string, darkModalClasses: string, darkModalTextClasses: string;

    darkModalClasses = 'absolute top-0 bottom-0 left-0 right-0 w-full' +
        ' h-full z-0 flex-col justify-around items-center cursor-pointer';

    darkModalTextClasses = 'duration-100 text-white text-lg font-semibold h-min';

    if (isHoveredOn) {
        imageDivClasses = 'duration-100 relative top-0 left-0 brightness-[0.35]';
        darkModalTextClasses += ' opacity-100';
        darkModalClasses += ' flex';
    } else {
        imageDivClasses = 'duration-100 relative top-0 left-0 brightness-100';
        darkModalTextClasses += ' opacity-0 hidden';
        darkModalClasses += ' hidden';
    }

    if (props.showLoading || !imageURLs.length) {
        return (
            <div className={boxSizeClasses}>
                <div className={imgSizeClasses}>
                    <div className="w-full grow items-stretch">
                        <div className="skeleton h-full w-full rounded-t-lg bg-darkgrey/25"></div>
                    </div>
                    <div className="w-2/3 px-2">
                        <div className="skeleton w-full rounded-lg h-4 bg-darkgrey/25"></div>
                    </div>
                    <div className="w-2/5 px-2">
                        <div className="skeleton w-full rounded-lg h-4 bg-darkgrey/25"></div>
                    </div>
                    <div className="w-full px-2 mb-3">
                        <div className="skeleton w-full rounded-lg h-4 bg-darkgrey/25"></div>
                    </div>
                </div>
            </div >
        );
    } else {
        return (
            <div
                className="w-full rounded-lg bg-lightgrey box-border z-0"
                onMouseEnter={
                    (e) => {
                        setIsHoveredOn(true);
                    }
                }
                onMouseLeave={
                    (e) => {
                        setIsHoveredOn(false);
                    }
                }
            >
                <div className="relative w-full">
                    <div className={imageDivClasses}>
                        <Image
                            src={imageURLs[0]}
                            alt="minecraft world"
                            priority
                            className="relative min-w-full rounded-t-lg overflow-clip -z-10"
                            width={1000}
                            height={1000}
                        />
                    </div>
                    <div className="contents">
                        <div className={darkModalClasses} onClick={(e) => { setModalOpen(true); }}>
                            <p className={darkModalTextClasses}>More Details</p>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <p className="text-md font-semibold">{props.worldName}</p>
                    <p>{props.worldCreator}</p>
                    <div className="flex flex-row flex-wrap py-2 text-xs gap-1">
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
                </div>
                <WorldDetailsModal
                    isOpen={modalOpen}
                    worldDesc={props.worldDesc}
                    worldTags={props.worldTags}
                    worldName={props.worldName}
                    worldCreator={props.worldCreator}
                    imageURLs={imageURLs}
                    stateChanger={
                        () => {
                            setModalOpen(false);
                            setIsHoveredOn(false);
                        }
                    }
                ></WorldDetailsModal>
            </div>
        );
    }
}