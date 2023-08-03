'use client'

import Image from 'next/image';

import { useState } from 'react';
import Link from 'next/link';

import WorldDetailsModal from '../WorldDetailsModal/WorldDetailsModal';

type WorldPreviewCardProps = {
    imageID: number;
};

export interface WorldInfoInterface {
    worldName: string;
    worldUploader: string;
    worldAccesibility: string;
    worldURL: string;
    worldImages: string[];
    worldShortDesc: string;
}

export default function WorldPreviewCard(props: WorldPreviewCardProps) {
    const [isHoveredOn, setIsHoveredOn] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const worldImages = [
        'https://w.forfun.com/fetch/b1/b1316c4d8b836fa03c34e779f912f667.jpeg',
        'https://p4.wallpaperbetter.com/wallpaper/44/698/537/minecraft-natural-scenery-hd-wallpaper-preview.jpg',
        'https://wallpapers.com/images/high/tall-tree-mobs-minecraft-iphone-4jjs9tvjjv377jbe.webp',
        'https://wallpapers.com/images/high/minecraft-aesthetic-green-lake-nature-k0bwp6k3mfdn3bfd.webp',
        'https://wallpapercave.com/wp/wp2868363.jpg',
        'https://wallpapercave.com/wp/wp3174096.jpg',
        'https://wallpapercave.com/wp/wp3174097.jpg'
    ];

    const sampleWorldInfo = {
        worldName: 'Minecraft World',
        worldUploader: 'Sashwat Anagolum',
        worldAccesibility: 'Public',
        worldURL: '/',
        worldImages: worldImages,
        worldShortDesc: 'A sample world made in Minecraft ' +
            'that somehows works on the Unity WebGL player. ' +
            'Explore the infinite world, build fortresses, defend ' +
            'yourself from monsters, and much more!'
    };


    let imageDivClasses: string, darkModalClasses: string, darkModalTextClasses: string;

    darkModalClasses = 'absolute top-0 bottom-0 left-0 right-0 w-full' +
        ' h-full z-0 flex-col justify-around items-center';

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
                        src={worldImages[props.imageID % 7]}
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
                <p className="text-md font-semibold">Minecraft World</p>
                <p>Sashwat Anagolum</p>
                <div className="flex flex-row flex-wrap py-2 text-xs gap-2">
                    <p className="px-3 py-1 bg-darkgrey text-white rounded-2xl">Minecraft</p>
                    <p className="px-3 py-1 bg-darkgrey text-white rounded-2xl">Sandbox</p>
                    <p className="px-3 py-1 bg-darkgrey text-white rounded-2xl">Tag 3</p>
                </div>
            </div>
            <WorldDetailsModal
                isOpen={modalOpen}
                worldInfo={sampleWorldInfo}
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