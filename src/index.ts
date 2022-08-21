import 'dotenv/config'

import {ApolloServer} from 'apollo-server-cloud-functions';
import {resolvers} from "./resolvers";
import {typeDefs} from "./typesDefinitions";
import {ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginUsageReportingDisabled} from "apollo-server-core";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    apollo: {
        key: process.env.APOLLO_KEY
    },
    plugins: [
        ApolloServerPluginUsageReportingDisabled(),
        ApolloServerPluginLandingPageLocalDefault({embed: true}),
    ]
});

exports.handler = server.createHandler({
    expressGetMiddlewareOptions: {
        cors: {
            origin: true,
            credentials: true,
        },
    }
});