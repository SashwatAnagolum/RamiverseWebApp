'use client'

import fetchWithTimeout from '@/app/api/utils';
import WorldPreviewCard from '@/components/WorldPreviewCard/WorldPreviewCard';

import { useEffect, useState } from 'react';

type WorldListProps = {
    userID: string;
}

type WorldInfo = {
    worldName: string;
    worldCreatorID: string;
    worldURLSlug: string;
    worldTags: string[];
    worldDesc: string;
    worldCreatorName: string;
}

async function fetchWorldData(pageNumber: number, userID: string): Promise<WorldInfo[]> {
    let worldsData: WorldInfo[] = new Array();

    const response = await fetchWithTimeout(
        './api/worlds',
        {
            headers: {
                'userID': userID,
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

                if (dbResponse.status == 200 && dbResponse.body) {
                    const creatorName = new TextDecoder().decode(
                        (await dbResponse.body.getReader().read()).value
                    );

                    worldsData[i].worldCreatorName = creatorName;
                }
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
            fetchWorldData(pageNumber, props.userID).then(
                (result) => {
                    setWorldsData(result);
                    setIsLoading(false);
                }
            );
        }, [pageNumber, props.userID]
    );

    if (isLoading) {
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
                            worldTags={[]}
                            worldDesc=""
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
                            worldURLSlug={worldData.worldURLSlug}
                            imageID={index}
                            worldTags={worldData.worldTags}
                            showLoading={false}
                            worldDesc={worldData.worldDesc}
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