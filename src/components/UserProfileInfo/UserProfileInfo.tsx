'use client'

import UserAvatar from '@/components/UserAvatar/UserAvatar';
import AvatarEditModal from '../AvatarEditModal/AvatarEditModal';

import { useEffect, useState } from 'react';

type UserProfileInfoProps = {
    username: string;
    userID: string;
}

export default function UserProfileInfo(props: UserProfileInfoProps) {
    const [avatarEditModalOpen, setAvatarEditModalOpen] = useState(false);

    return (
        <div className="w-full">
            <UserAvatar
                onClick={
                    () => {
                        setAvatarEditModalOpen(true);
                    }
                }
                username={props.username}
                userID={props.userID}
            ></UserAvatar>
            <AvatarEditModal
                isOpen={avatarEditModalOpen}
                username={props.username}
                userID={props.userID}
                stateChanger={() => setAvatarEditModalOpen(false)}
            ></AvatarEditModal>
        </div>
    );
}