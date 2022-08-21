import {ApolloServer} from 'apollo-server';
import {resolvers} from "./resolvers";
import {typeDefs} from "./typesDefinitions";
import {ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginUsageReportingDisabled} from "apollo-server-core";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    apollo: {
        key: "service:ToDoApp-ossf8q:0w9mX1kr5A9ZlglaJUBmsQ",
    },
    plugins: [
        ApolloServerPluginUsageReportingDisabled(),
        ApolloServerPluginLandingPageLocalDefault({embed: true}),
    ]
});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
