export const loggingPlugin = {
    async requestDidStart(requestContext) {
        console.log('Request started! Query:\n' +
            requestContext.request.query);
        return {
            async parsingDidStart(requestContext) {
                console.log('Parsing started!');
            },
            async validationDidStart(requestContext) {
                console.log('Validation started!');
            },
        }
    },
};