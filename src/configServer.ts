import {typeDefs} from "./typesDefinitions";
import {resolvers} from "./resolvers";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginUsageReporting,
} from "apollo-server-core";
import {isTokenValid} from "./utils/validations/token";
import {loggingPlugin} from "./utils/apolloLogging/logging";
import {reportingConfig} from "./utils/apolloLogging/reporting";

export const config = {
    typeDefs,
    resolvers,
    introspection: true,
    csrfPrevention: true,
    apollo: {
        key: process.env.APOLLO_KEY
    },
    context: async ({req}) => {
        const {authorization: token} = req.headers;
        const validator = await isTokenValid(token);
        return {
            user: validator,
            token
        };
    },
    plugins:[
        loggingPlugin,
        ApolloServerPluginUsageReporting(reportingConfig),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ]
}