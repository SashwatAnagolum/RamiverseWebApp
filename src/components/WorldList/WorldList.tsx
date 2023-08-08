'use client'

import fetchWithTimeout from '@/app/api/utils';
import WorldPreviewCard from '@/components/WorldPreviewCard/WorldPreviewCard';
import { useEffect, useState } from 'react';

type WorldListProps = {
    user: string;
}

async function fetchWorldNames(pageNumber: number): Promise<string[]> {
    let worldNames: string[] = new Array();

    const data = await fetchWithTimeout(
        './api/presigned',
        {
            headers: {
                'request-type': 'getAll',
                'maxKeys': 25,
                'delimiter': '/',
                'prefix': 'worlds/'
            }
        }
    );

    const signedURL = await data.body?.getReader().read().then(
        (resp) => new TextDecoder().decode(resp.value)
    );

    if (signedURL) {
        const response = await fetchWithTimeout(signedURL);

        const folderNames = await response.body?.getReader().read().then(
            (resp) => new TextDecoder().decode(resp.value)
        );

        if (folderNames) {
            const xml = new DOMParser().parseFromString(folderNames, 'text/xml');
            const prefixArray = xml.documentElement.getElementsByTagName('CommonPrefixes');

            for (let i = 0; i < prefixArray.length; i++) {
                worldNames.push(prefixArray[i].getElementsByTagName('Prefix')[0].textContent + '');
            }
        }
    }

    return worldNames;
}

export default function WorldList(props: WorldListProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [worldNames, setWorldNames] = useState(new Array());
    const [pageNumber, setPageNumber] = useState(0);
    let worldCards;

    let indices = new Array();

    for (let i = 0; i < 15; i++) {
        indices.push(i);
    }

    useEffect(
        () => {
            fetchWorldNames(pageNumber).then(
                (result) => {
                    setWorldNames(result);
                    setIsLoading(false);
                }
            );
        }, []
    );

    const worldIDs: string[] = new Array(12);

    for (let i = 0; i < 14; i++) {
        worldIDs[i] = "ff";
    }

    if (isLoading || (worldNames.length == 0)) {
        worldCards = indices.map(
            function (index: number) {
                return (
                    <div className="w-full mb-5 break-inside-avoid" key={index}>
                        <WorldPreviewCard
                            worldName=""
                            imageID={index}
                            showLoading={true}
                        ></WorldPreviewCard>
                    </div>
                )
            }
        )
    } else {
        worldCards = worldNames.map(
            function (worldName: string, index: number) {
                return (
                    <div className="w-full mb-5 break-inside-avoid" key={index}>
                        <WorldPreviewCard
                            worldName={worldName}
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