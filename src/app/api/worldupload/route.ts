import clientPromise from "@/lib/mongodb";
import { Document, ObjectId } from "mongodb";

export async function GET(request: Request) {
    const client = await clientPromise;
    const worldTable = client.db('ramiverse').collection('worlds');

    const userID = request.headers.get('worldCreator')?.trimStart().trimEnd();
    const worldName = request.headers.get('worldName')?.trimStart().trimEnd();
    const worldDesc = request.headers.get('worldDesc')?.trimStart().trimEnd();
    const worldTags = request.headers.get('worldTags')?.trimStart().trimEnd();

    let response: Response, data;

    if (userID?.length && worldName?.length && worldDesc?.length && worldTags?.length) {
        const userIDObj = new ObjectId(userID);
        const worldTagsList = worldTags.split(',').map(
            tag => tag.trimStart().trimEnd()
        );

        const worldObj = {
            'builder': userIDObj,
            'title': worldName,
            'tags': worldTagsList,
            'description': worldDesc,
            'urlSlug': worldName.replaceAll(' ', '_')
        }

        const dbResponse = await worldTable.insertOne(worldObj);

        if (dbResponse.acknowledged) {
            response = new Response(null, { status: 200 });
        }
    } else {
        response = new Response(null, { status: 400 });
    }

    response = new Response(null, { status: 200 });

    return response;
}