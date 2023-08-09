export default async function fetchWithTimeout(requestURL: string, options = {}, timeout = 5000) {
    const controller = new AbortController();
    let response: Response;

    const timeoutID = setTimeout(
        () => controller.abort(),
        timeout
    );

    if (!requestURL) {
        console.log(options);
        response = new Response(null, { status: 408 });
    } else {
        try {
            response = await fetch(
                requestURL,
                {
                    ...options,
                    signal: controller.signal
                }
            );
        } catch (error) {
            response = new Response(null, { status: 408 });
        }
    }

    return response;
}