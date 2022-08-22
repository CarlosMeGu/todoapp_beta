import 'dotenv/config'

import {ApolloServer} from 'apollo-server-cloud-functions';
import {resolvers} from "./resolvers";
import {typeDefs} from "./typesDefinitions";
import {ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginUsageReportingDisabled} from "apollo-server-core";
import {isTokenValid} from "./utils/validations/token";


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
    ],
    context: async ({req}) => {
        const {authorization: token} = req.headers;
        const validator = await isTokenValid(token);
        return {
            user: validator,
            token
        };
    }
});

exports.handler = server.createHandler({
    expressGetMiddlewareOptions: {
        cors: {
            origin: true,
            credentials: true,
        },
    }
});