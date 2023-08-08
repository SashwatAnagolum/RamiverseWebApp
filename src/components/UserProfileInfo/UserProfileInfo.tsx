'use client'

import UserAvatar from '@/components/UserAvatar/UserAvatar';
import AvatarEditModal from '../AvatarEditModal/AvatarEditModal';

import { useState } from 'react';

export default function UserProfileInfo() {
    const [avatarEditModalOpen, setAvatarEditModalOpen] = useState(false);

    return (
        <div className="w-full">
            <UserAvatar
                onClick={
                    () => {
                        setAvatarEditModalOpen(true);
                    }
                }
                userName="Sammy Anagolum"
                userJoinDate="April 21 2003"
                userID=""
            ></UserAvatar>
            <AvatarEditModal
                isOpen={avatarEditModalOpen}
                stateChanger={() => setAvatarEditModalOpen(false)}
            ></AvatarEditModal>
        </div>
    )
}