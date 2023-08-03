import WorldList from '@/components/WorldList/WorldList';

export default function Home() {
    return (
        <div>
            <div className="m-5 flex flex-row justify-around">
                <h1 className="page-title">Public Worlds</h1>
            </div>
            <WorldList></WorldList>
        </div>
    );
};
