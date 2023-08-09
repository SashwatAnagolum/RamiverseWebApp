'use client'

import UploadedWorlds from "@/components/UploadedWorlds/UploadedWorlds";
import UserProfileInfo from "@/components/UserProfileInfo/UserProfileInfo";
import WorldUploader from "@/components/WorldUploader/WorldUploader";
import { useEffect, useState } from "react";

export default function UserProfile() {
    const [userDetails, setUserDetails] = useState({ username: '', userID: '' });

    useEffect(
        () => {
            let newUserID = localStorage.getItem('userID') + '';
            let newUsername = localStorage.getItem('username') + '';
            setUserDetails({ username: newUsername, userID: newUserID });
        }, [userDetails.userID]
    )

    if (userDetails.userID.length > 0 && (userDetails.userID != 'null')) {
        return (
            <div className="w-full max-w-screen-xl mx-auto">
                <div className="m-5 flex flex-col justify-items-center gap-y-5 md:flex-row">
                    <div className="md:basis-1/2 lg:basis-1/3 md:flex md:flex-row jsutify-center md:justify-start">
                        <div>
                            <UserProfileInfo
                                username={userDetails.username}
                                userID={userDetails.userID}
                            ></UserProfileInfo>
                        </div>
                    </div>
                    <div className="md:basis-1/2 lg:basis-2/3">
                        <WorldUploader
                            userID={userDetails.userID}
                        ></WorldUploader>
                    </div>
                </div>
                <div className="m-5">
                    <UploadedWorlds userID={userDetails.userID}></UploadedWorlds>
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full max-w-screen-xl mx-auto">
                <div className="m-5 flex flex-col justify-items-center gap-y-5 md:flex-row">
                </div>
            </div>
        )
    }
}