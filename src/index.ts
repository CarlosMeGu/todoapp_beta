import 'dotenv/config'

import {ApolloServer} from 'apollo-server-cloud-functions';
import {config} from "./configServer";

const server = new ApolloServer(config);

exports.handler = server.createHandler({
    expressGetMiddlewareOptions: {
        cors: {
            origin: true,
            credentials: true,
        },
    }
});