import {typeDefs} from "./typesDefinitions";
import {resolvers} from "./resolvers";
import {ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginUsageReportingDisabled} from "apollo-server-core";
import {isTokenValid} from "./utils/validations/token";

export const config = {
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
}