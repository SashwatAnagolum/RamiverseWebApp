import s3Client from '@/lib/awsClient';

import { ListObjectsV2Command } from '@aws-sdk/client-s3';

export async function GET(request: Request) {
    let command;
    let response: Response;

    const prefix = request.headers.get('urlSlug') + '';
    const delimiter = '/';
    const maxKeys = 10;

    command = new ListObjectsV2Command(
        {
            Bucket: 'ramiverse-bucket',
            Prefix: prefix,
            Delimiter: delimiter,
            MaxKeys: maxKeys
        }
    );

    response = new Response(null, { status: 200 });

    return response;
}