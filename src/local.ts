import {ApolloServer} from 'apollo-server';
import {config} from "./configServer";

const server = new ApolloServer(config);

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
