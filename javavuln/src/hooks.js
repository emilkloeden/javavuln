export async function externalFetch(request) {
    const env = process.env["NODE_ENV"]
    const apiOrigin = process.env["API_ORIGIN"]
    const apiPort = process.env["API_PORT"]

    if (env && env === "production" && request.url.startsWith(`http://localhost:${apiPort}`)) {
        // clone the original request, but change the URL

        const newURL = request.url.replace(`http://localhost:${apiPort}`, apiOrigin)
        console.log(`Replacing old url '${request.url}' with new url '${newURL}'`)
        request = new Request(
            newURL,
            request
        );
    }

    return fetch(request);
}