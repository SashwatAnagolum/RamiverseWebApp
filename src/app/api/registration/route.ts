import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
    const client = await clientPromise;
    const userTable = client.db('ramiverse').collection('users');

    const username = request.headers.get('username');
    const password = request.headers.get('password');

    let response: Response;

    if (username && password) {
        let data = await userTable.findOne({ 'username': username });

        if (!data) {
            const result = await userTable.insertOne(
                { 'username': username, 'password': password }
            );

            if (result.acknowledged) {
                response = new Response('valid', { status: 200 });
            } else {
                response = new Response('invalid', { status: 200 });
            }
        } else {
            response = new Response('nonunique', { status: 200 });
        }
    } else {
        response = new Response('invalid', { status: 200 });
    }

    return response;
}