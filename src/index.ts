import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

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
    created_date: string;
    updated_date: string;
}

const typeDefs = gql`
    type Task {
        id: ID!
        name: String!
        description: String!
        status: Int!
        created_date: String!
        updated_date: String!
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
            return tasks.docs.map(task => task.data()) as Task[];
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
                const id = uuidv4()
                const data = {
                    id,
                    name:args.name,
                    description:args.description,
                    status:args.status,
                    created_date: moment().format(),
                    updated_date: moment().format()
                }
                const taskReference = admin.firestore().collection(`task/`);
                await taskReference.add(data);
                return data;
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
    ]
});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
