export async function externalFetch(request) {
    const { VITE_API_ORIGIN, VITE_API_PORT } = import.meta.env;

    console.log(`HOOK RUNNING: ${request.url}`)
    console.log(`VITE_API_ORIGIN: ${VITE_API_ORIGIN}`)
    console.log(`VITE_API_PORT: ${VITE_API_PORT}`)
    if (request.url.startsWith(`http://localhost:${VITE_API_PORT}`)) {
        // clone the original request, but change the URL

        const newURL = request.url.replace(`http://localhost:${VITE_API_PORT}`, VITE_API_ORIGIN)
        console.log(`Replacing old url '${request.url}' with new url '${newURL}'`)
        request = new Request(
            newURL,
            request
        );
    }

    return fetch(request);
}