'use client'

import fetchWithTimeout from '@/app/api/utils';
import WorldPreviewCard from '@/components/WorldPreviewCard/WorldPreviewCard';

import { useEffect, useState } from 'react';

type WorldListProps = {
    user: string;
}

type WorldInfo = {
    worldName: string;
    worldCreatorID: string;
    worldURLSlug: string[];
    worldTags: string[];
    worldDesc: string;
    worldCreatorName: string;
}

async function fetchWorldData(pageNumber: number, username: string): Promise<WorldInfo[]> {
    let worldsData: WorldInfo[] = new Array();

    const response = await fetchWithTimeout(
        './api/worlds',
        {
            headers: {
                'username': username,
                'page': pageNumber,
                'pageSize': '10'
            }
        }
    );

    if (response.status == 200) {
        if (response.body) {
            const responseText = new TextDecoder().decode(
                (await response.body.getReader().read()).value
            );

            const worldsJSON = JSON.parse(responseText);
            worldsData = worldsJSON.worlds;

            for (let i = 0; i < worldsData.length; i++) {
                const dbResponse = await fetchWithTimeout(
                    './api/users',
                    {
                        headers: {
                            'id': worldsData[i].worldCreatorID
                        }
                    }
                );
            }
        }
    }

    return worldsData;
}

export default function WorldList(props: WorldListProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [worldsData, setWorldsData] = useState(new Array());
    const [pageNumber, setPageNumber] = useState(0);
    let worldCards;

    let indices = new Array();

    for (let i = 0; i < 15; i++) {
        indices.push(i);
    }

    useEffect(
        () => {
            fetchWorldData(pageNumber, '').then(
                (result) => {
                    setWorldsData(result);
                    setIsLoading(false);
                }
            );
        }, [pageNumber]
    );

    if (isLoading || (worldsData.length == 0)) {
        worldCards = indices.map(
            function (index: number) {
                return (
                    <div className="w-full mb-5 break-inside-avoid" key={index}>
                        <WorldPreviewCard
                            worldName=""
                            imageID={index}
                            showLoading={true}
                            worldCreator=""
                            worldURLSlug=""
                        ></WorldPreviewCard>
                    </div>
                )
            }
        )
    } else {
        worldCards = worldsData.map(
            function (worldData: WorldInfo, index: number) {
                return (
                    <div className="w-full mb-5 break-inside-avoid" key={index}>
                        <WorldPreviewCard
                            worldName={worldData.worldName}
                            worldCreator={worldData.worldCreatorName}
                            worldURLSlug=""
                            imageID={index}
                            showLoading={false}
                        ></WorldPreviewCard>
                    </div>
                )
            }
        )
    }

    return (
        <div className="w-full columns-1 sm:columns-2 lg:columns-3 xl:columns-4">
            {worldCards}
        </div>
    );
}