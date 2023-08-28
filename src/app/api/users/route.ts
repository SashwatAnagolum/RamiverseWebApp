import clientPromise from "@/lib/mongodb";
import { Document, ObjectId } from "mongodb";

export async function GET(request: Request) {
    const client = await clientPromise;
    const userTable = client.db('ramiverse').collection('users');

    const userID = request.headers.get('id') + '';
    const username = request.headers.get('username') + '';

    let response: Response, data;

    if (userID.length) {
        const objID = new ObjectId(userID);
        data = await userTable.findOne({ '_id': objID });

        if (data) {
            const dataDoc: Document = data;
            response = new Response(dataDoc.username, { status: 200 });
        } else {
            response = new Response(null, { status: 200 });
        }
    } else if (username.length) {
        data = await userTable.findOne({ 'username': username });

        if (data) {
            const dataDoc: Document = data;

            response = new Response(dataDoc._id.toString(), { status: 200 });
        } else {
            response = new Response(null, { status: 200 });
        }
    } else {
        response = new Response(null, { status: 200 });
    }

    return response;
}