'use client'

import Image from 'next/image';
import jack from './../../assets/jack.png';

import { useState } from 'react';

type UserAvatarProps = {
    onClick: () => void;
    userName: string;
    userJoinDate: string;
}

export default function UserAvatar(props: UserAvatarProps) {
    const [isHoveredOn, setIsHoveredOn] = useState(false);
    let imageDivClasses: string, darkModalClasses: string;

    darkModalClasses = 'absolute top-0 bottom-0 left-0 right-0 m-auto' +
        ' w-full h-full z-0 flex flex-col justify-around cursor-pointer' +
        ' text-white text-lg text-center font-semibold duration-100 rounded-full';

    if (isHoveredOn) {
        imageDivClasses = 'duration-100 relative top-0 left-0 rounded-full';
        darkModalClasses += ' bg-black/75';
    } else {
        imageDivClasses = 'duration-100 relative top-0 left-0 rounded-full';
        darkModalClasses += ' opacity-0';
    }

    return (
        <div className="flex flex-col items-center relative gap-y-5">
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
                    onClick={(e) => props.onClick()}
                >
                    <p>Change Avatar</p>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-lg font-bold">{props.userName}</p>
                <p>Joined {props.userJoinDate}</p>
            </div>
        </div>
    )
}