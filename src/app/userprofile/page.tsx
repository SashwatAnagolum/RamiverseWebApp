import UploadedWorlds from "@/components/UploadedWorlds/UploadedWorlds";
import UserProfileInfo from "@/components/UserProfileInfo/UserProfileInfo";
import WorldUploader from "@/components/WorldUploader/WorldUploader";

export default function UserProfile() {
    return (
        <div className="w-full max-w-screen-xl mx-auto">
            <div className="m-5 flex flex-col justify-items-center gap-y-5 md:flex-row">
                <div className="md:basis-1/2 lg:basis-1/3 md:flex md:flex-row jsutify-center md:justify-start">
                    <div>
                        <UserProfileInfo></UserProfileInfo>
                    </div>
                </div>
                <div className="md:basis-1/2 lg:basis-2/3">
                    <WorldUploader></WorldUploader>
                </div>
            </div>
            <div className="m-5">
                <UploadedWorlds></UploadedWorlds>
            </div>
        </div>
    )
}