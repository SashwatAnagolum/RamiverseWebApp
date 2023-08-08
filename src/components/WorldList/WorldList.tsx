import WorldPreviewCard from '@/components/WorldPreviewCard/WorldPreviewCard';

export default async function WorldList() {
    const worldIDs: string[] = new Array(12);

    for (let i = 0; i < 14; i++) {
        worldIDs[i] = "ff";
    }

    let worldCards = worldIDs.map(
        function (worldID: string, index: number) {
            return (
                <div className="mb-5 break-inside-avoid" key={index}>
                    <WorldPreviewCard imageID={index}></WorldPreviewCard>
                </div>
            )
        }
    )

    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4">
            {worldCards}
        </div>
    );
}