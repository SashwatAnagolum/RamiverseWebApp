import UserAvatar from '@/components/UserAvatar/UserAvatar';
import Button from '@/components/Button/Button';
import UserProfileHero from '@/components/UserProfileHero/UserProfileHero';

export default function Home() {
    return (
        <div className="flex flex-col justify-items-center gap-y-5 my-5">
            <UserAvatar />
            <UserProfileHero />
            <div className='flex flex-row m-5'>
                <Button text="Button1" type="submit" theme="blue" ></Button>
                <Button text="Button2" type="submit" theme="gray" ></Button>
            </div>
        </div>
    )
}