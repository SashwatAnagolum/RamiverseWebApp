import UserProfileInfo from "@/components/UserProfileInfo/UserProfileInfo";

export default function UserProfile() {
    return (
        <div className="m-5 flex flex-col justify-items-center gap-y-5">
            <UserProfileInfo></UserProfileInfo>
            {/* <UserWorlds></UserWorlds> */}
        </div>
    )
}