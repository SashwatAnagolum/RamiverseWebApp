'use client'

import UserAvatar from '@/components/UserAvatar/UserAvatar';
import AvatarEditModal from '../AvatarEditModal/AvatarEditModal';

import { useState } from 'react';

export default function UserProfileInfo() {
    const [avatarEditModalOpen, setAvatarEditModalOpen] = useState(false);

    return (
        <div>
            <UserAvatar onClick={
                () => {
                    setAvatarEditModalOpen(true);
                }
            }></UserAvatar>
            <AvatarEditModal
                isOpen={avatarEditModalOpen}
                stateChanger={() => setAvatarEditModalOpen(false)}
            ></AvatarEditModal>
        </div>
    )
}