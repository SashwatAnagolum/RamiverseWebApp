'use client'

import WorldList from "../WorldList/WorldList";

type UploadedWorldsProps = {
    userID: string;
}

export default function UploadedWorlds(props: UploadedWorldsProps) {
    return (
        <div className="w-full flex flex-col gap-y-5 items-center">
            <p className="mx-5 text-lg font-semibold">Your Uploaded Worlds</p>
            <WorldList userID={props.userID}></WorldList>
        </div>
    );
}