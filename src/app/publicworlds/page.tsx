import WorldPreviewCard from '@/components/WorldPreviewCard/WorldPreviewCard';

export default function Home() {
    return (
        <div className="flex flex-col gap-y-2 m-2">
            <WorldPreviewCard></WorldPreviewCard>
            <WorldPreviewCard></WorldPreviewCard>
        </div>
    );
};
