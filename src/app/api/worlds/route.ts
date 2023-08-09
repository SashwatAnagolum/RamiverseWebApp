import clientPromise from "@/lib/mongodb";
import { Document, ObjectId } from "mongodb";

export async function GET(request: Request) {
    const client = await clientPromise;
    const worldTable = client.db('ramiverse').collection('worlds');

    const username = request.headers.get('username');
    const pageNum = parseInt(request.headers.get('page') + '');
    const pageSize = parseInt(request.headers.get('pageSize') + '');

    let response: Response, data;
    let worldData = new Array();

    if (username?.length) {
        data = worldTable.find().sort('_id').skip(pageSize * pageNum).limit(pageSize);
    } else {
        data = worldTable.find({}).sort('_id').skip(pageSize * pageNum).limit(pageSize);
    }

    while (await data.hasNext()) {
        const nextWorld = await data.next();

        if (nextWorld) {
            let objID: ObjectId = nextWorld.builder;

            let newObj = {
                'worldName': nextWorld.title,
                'worldCreatorID': objID.toString(),
                'worldURLSlug': 'worlds/' + nextWorld.urlSlug,
                'worldTags': nextWorld.tags,
                'worldDesc': nextWorld.description,
            }

            worldData.push(newObj);
        }
    }

    const jsonData = {
        'worlds': worldData
    }

    response = new Response(JSON.stringify(jsonData), { status: 200 });

    return response;
}