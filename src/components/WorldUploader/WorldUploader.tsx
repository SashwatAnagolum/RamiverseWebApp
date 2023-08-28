'use client'

import Button from "../Button/Button";
import WorldUploadModal from '../WorldUploadModal/WorldUploadModal';

import { useState } from 'react';

type WorldUploaderProps = {
    userID: string;
}

export default function WorldUploader(props: WorldUploaderProps) {
    const [worldUploadModalOpen, setWorldUploadModalOpen] = useState(false);

    return (
        <div className="w-full flex flex-col items-center gap-y-2 md:py-5 md:items-start">
            <p>Ready to share another world with everyone?</p>
            <div className="w-full sm:w-max">
                <Button text="Upload World" theme="blue" type="submit" clickHandler={() => { setWorldUploadModalOpen(true); }}></Button>
            </div>
            <WorldUploadModal
                isOpen={worldUploadModalOpen}
                userID={props.userID}
                stateChanger={() => setWorldUploadModalOpen(false)}
            ></WorldUploadModal>
        </div>
    );
}