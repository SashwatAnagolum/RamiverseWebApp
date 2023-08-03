'use client'

import Image from 'next/image';

import { useState } from 'react';

import minecraftPic from './../../assets/minecraft_world.png';

export default function WorldPreviewCard() {
    const [isHoveredOn, setIsHoveredOn] = useState(false);

    let imageDivClasses: string, darkModalClasses: string;

    if (isHoveredOn) {
        imageDivClasses = 'duration-100 relative top-0 left-0 brightness-[0.35]';
        darkModalClasses = 'duration-100 opacity-100';
    } else {
        imageDivClasses = 'duration-100 relative top-0 left-0 brightness-100';
        darkModalClasses = 'duration-100 opacity-0';
    }

    return (
        <div
            className="w-full rounded-xl bg-lightgrey box-border z-0"
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
                        src={minecraftPic}
                        alt="minecraft world"
                        priority
                        className="relative min-w-full overflow-clip rounded-t-xl -z-10"
                    />
                </div>
                <div className="absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-full z-0">
                    <div className="h-full flex flex-col justify-around text-white text-lg font-semibold">
                        <p className={darkModalClasses}>More Details</p>
                    </div>
                </div>
            </div>
            <div className="p-2">
                <p className="text-lg font-semibold">Minecraft World</p>
                <p>Sashwat Anagolum</p>
                <div className="flex flex-row flex-wrap py-2 text-sm gap-2">
                    <p className="px-3 py-1 bg-darkgrey text-white rounded-2xl">Minecraft</p>
                    <p className="px-3 py-1 bg-darkgrey text-white rounded-2xl">Sandbox</p>
                    <p className="px-3 py-1 bg-darkgrey text-white rounded-2xl">Tag 3</p>
                </div>
            </div>
        </div>
    );
}