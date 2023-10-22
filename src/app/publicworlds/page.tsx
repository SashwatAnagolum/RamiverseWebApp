import WorldList from '@/components/WorldList/WorldList';

export default async function Home() {
    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="m-5 flex flex-col items-center gap-y-5">
                <h1 className="page-title">Public Worlds</h1>
                <WorldList userID=""></WorldList>
            </div>
        </div>
    );
};
