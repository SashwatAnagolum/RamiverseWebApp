import Button from '@/components/Button/Button';

export default function UserProfileHero() {
    return (
        <ul className="flex flex-col bg-midnightblue text-white">
            <li className="flex flex-row">
                <ul className="p-5 flex flex-col justify-items-start">
                    <li className="my-2 text-xs text-lightgrey tracking-wider">USERNAME</li>
                    <li>Jack Sparrow</li>
                </ul>
                {/* <div className="text-xs text-lightgrey tracking-wider self-center">
                    <Button text="EDIT" type="submit" theme="gray"></Button>
                </div> */}
            </li>
            <li className="flex flex-row">
                <ul className="p-5 flex flex-col justify-items-start">
                    <li className="my-2 text-xs text-lightgrey tracking-wider">MEMBER SINCE</li>
                    <li>January 1, 1700</li>
                </ul>
                {/* <div className="text-xs text-lightgrey tracking-wider self-center">
                    <Button text="EDIT" type="submit" theme="gray"></Button>
                </div> */}
            </li>
        </ul>
    )
}