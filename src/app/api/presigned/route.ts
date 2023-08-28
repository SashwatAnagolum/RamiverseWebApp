import s3Client from '@/lib/awsClient';

import { ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET(request: Request) {
    let command;
    let response: Response;
    const filename = request.headers.get('filename');

    if (filename && request.headers.get('request-type') == 'put') {
        command = new PutObjectCommand(
            {
                Bucket: 'ramiverse-bucket',
                Key: filename
            }
        );

        const signedURL = await getSignedUrl(
            s3Client, command,
            {
                expiresIn: 900
            }
        );

        response = new Response(signedURL, { status: 200 });
    } else if (request.headers.get('request-type') == 'getAll') {
        const prefix = request.headers.get('prefix') + '';
        const delimiter = request.headers.get('delimiter') + '';
        const maxKeys = parseInt(request.headers.get('maxKeys') + '');

        command = new ListObjectsV2Command({
            Bucket: 'ramiverse-bucket',
            Prefix: prefix,
            Delimiter: delimiter,
            MaxKeys: maxKeys
        });

        const signedURL = await getSignedUrl(
            s3Client, command,
            {
                expiresIn: 900
            }
        );

        response = new Response(signedURL, { status: 200 });
    } else {
        response = new Response(null, { status: 200 });
    }

    return response;
}

