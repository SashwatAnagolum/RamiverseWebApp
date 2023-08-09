'use client'

import Button from "../Button/Button";
import WorldUploadModal from '../WorldUploadModal/WorldUploadModal';

import { useState } from 'react';

export default function WorldUploader() {
    const [avatarEditModalOpen, setAvatarEditModalOpen] = useState(false);
    return (
        <div className="w-full flex flex-col items-center gap-y-2 md:py-5 md:items-start">
            <p>Ready to share another world with everyone?</p>
            <div className="w-full sm:w-max">
                <Button text="Upload World" theme="blue" type="submit" clickHandler={() => { setAvatarEditModalOpen(true); }}></Button>
            </div>
            <WorldUploadModal
                isOpen={avatarEditModalOpen}
                stateChanger={() => setAvatarEditModalOpen(false)}
            ></WorldUploadModal>
        </div>
    );
}