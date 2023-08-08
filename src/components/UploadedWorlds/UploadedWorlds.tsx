import WorldList from "../WorldList/WorldList";

export default function UploadedWorlds() {
    return (
        <div className="w-full flex flex-col gap-y-5 items-center">
            <p className="mx-5 text-lg font-semibold">Your Uploaded Worlds</p>
            <WorldList></WorldList>
        </div>
    );
}