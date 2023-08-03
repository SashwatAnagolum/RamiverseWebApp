'use client'

import Image from 'next/image';
import jack from './../../assets/jack.png';

import { useState } from 'react';

export default function UserAvatar() {
    const [isHoveredOn, setIsHoveredOn] = useState(false);
    let imageDivClasses: string, darkModalClasses: string;

    darkModalClasses = 'absolute top-0 bottom-0 left-0 right-0 m-auto' +
        'w-max h-full z-0 flex flex-col justify-around' +
        ' text-white text-lg font-semibold duration-100';

    if (isHoveredOn) {
        imageDivClasses = 'duration-100 relative top-0 left-0 brightness-[0.35]';
        darkModalClasses += ' bg-black/20';
    } else {
        imageDivClasses = 'duration-100 relative top-0 left-0 brightness-100';
        darkModalClasses += ' opacity-0';
    }

    return (
        <div className="flex flex-row justify-around relative">
            <div
                className={imageDivClasses}
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
                <Image
                    src={jack}
                    alt="Jack Avatar"
                    className="rounded-full"
                />
            </div>
            <div className={darkModalClasses}>
                <p>Change Avatar</p>
            </div>

        </div>
    )
}