export const reportingConfig = {
    generateClientInfo: ({
                             request
                         }) => {
        const headers = request.http && request.http.headers;
        if (headers) {
            return {
                clientName: headers["apollographql-client-name"],
                clientVersion: headers["apollographql-client-version"],
            };
        } else {
            return {
                clientName: "Unknown Client",
                clientVersion: "Unversioned",
            };
        }
    },
}