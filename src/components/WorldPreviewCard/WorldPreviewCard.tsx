'use client'

import Image from 'next/image';

import { useState } from 'react';
import Link from 'next/link';

import minecraftPic from './../../assets/minecraft_world.png';
import minecraftPic2 from './../../assets/minecraft_world_2.jpg';
import minecraftPic3 from './../../assets/minecraft_world_3.jpg';
import minecraftPic4 from './../../assets/minecraft_world_4.jpg';
import WorldDetailsModal from '../WorldDetailsModal/WorldDetailsModal';

type WorldPreviewCardProps = {
    imageID: number;
};

export default function WorldPreviewCard(props: WorldPreviewCardProps) {
    const [isHoveredOn, setIsHoveredOn] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

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
                    setIsHoveredOn(!isHoveredOn);
                }
            }
            onMouseLeave={
                (e) => {
                    setIsHoveredOn(!isHoveredOn);
                }
            }
        >
            <div className="relative w-full">
                <div className={imageDivClasses}>
                    <Image
                        src={props.imageID % 4 ? ((props.imageID == 1) ? minecraftPic2 : ((props.imageID == 2) ? minecraftPic4 : minecraftPic3)) : minecraftPic}
                        alt="minecraft world"
                        priority
                        className="relative min-w-full rounded-t-lg overflow-clip -z-10"
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
                worldShortDesc=""
                worldID=""
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