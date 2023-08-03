'use client'

import Image from 'next/image';
import jack from './../../assets/jack.png';

import { useState } from 'react';

export default function UserAvatar() {
    const [isHoveredOn, setIsHoveredOn] = useState(false);
    let imageDivClasses: string, darkModalClasses: string;

    darkModalClasses = 'absolute top-0 bottom-0 left-0 right-0 m-auto' +
        ' w-full h-full z-0 flex flex-col justify-around' +
        ' text-white text-lg text-center font-semibold duration-100 rounded-full';

    if (isHoveredOn) {
        imageDivClasses = 'duration-100 relative top-0 left-0 rounded-full';
        darkModalClasses += ' bg-black/40';
    } else {
        imageDivClasses = 'duration-100 relative top-0 left-0 rounded-full';
        darkModalClasses += ' opacity-0';
    }

    return (
        <div className="flex flex-row justify-around relative">
            <div className={imageDivClasses}>
                <Image
                    src={jack}
                    alt="Jack Avatar"
                    className="rounded-full"
                />
                <div
                    className={darkModalClasses}
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
                    <p>Change Avatar</p>
                </div>
            </div>
        </div>
    )
}