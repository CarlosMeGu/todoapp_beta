import * as admin from 'firebase-admin';

const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

import {ApolloServer, ApolloError, ValidationError, gql} from 'apollo-server';
import {
    ApolloServerPluginUsageReportingDisabled,
    ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
interface Task {
    id: string;
    name: string;
    description: string;
    status: number;
}

const typeDefs = gql`
    type Task {
        id: ID!
        name: String!
        description: String!
        status: Int!
    }

    type Query {
        getTasks: [Task]
    }

    type Mutation {
        updateTask(
            id: ID!
            status: Int!
        ): Task

        createTask(
            name: String!
            description: String!
            status: Int!
        ): Task
    }
`;

const resolvers = {
    Query: {
        async getTasks() {
            const tasks = await admin
                .firestore()
                .collection('task')
                .get();
            console.log(tasks.docs);
            return tasks.docs.map(task => {
                const data = task.payload.doc.data() as Task;
                data.id = task.payload.doc.id;
                return data;
            })
        },
    },
    Mutation: {
        updateTask: async (_, args: { id: string, status: number }) => {
            try {
                const taskReference = admin.firestore().doc(`task/${args.id}`);
                await taskReference.update({status: args.status});
                const task = await taskReference.get();
                return task.data();
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        createTask: async (_, args: {
            name: string,
            description: string,
            status: number,
        }) => {
            try {
                const data = {
                    name:args.name,
                    description:args.description,
                    status:args.status,
                }
                const taskReference = admin.firestore().collection(`task/`);
                const { id } =  taskReference.add(data);
                return id;
            } catch (error) {
                throw new ApolloError(error);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    apollo: {
        key: "service:ToDoApp-ossf8q:0w9mX1kr5A9ZlglaJUBmsQ",
    },
    plugins: [
        ApolloServerPluginUsageReportingDisabled(),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
