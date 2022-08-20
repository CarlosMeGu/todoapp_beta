import * as admin from 'firebase-admin';
import {v4 as uuidv4} from 'uuid';
import * as moment from 'moment';
import {ApolloError, ApolloServer, gql} from 'apollo-server';
import {ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginUsageReportingDisabled,} from "apollo-server-core";

const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

interface Status {
    id: string;
    description: string;
}

interface Task {
    id: string;
    name: string;
    description: string;
    status: string;
    created_date: string;
    updated_date: string;
}



const typeDefs = gql`
    type Status {
        id: ID
        description: String
    }
    
    type Task {
        id: ID!
        name: String!
        description: String!
        status: Status!
        created_date: String!
        updated_date: String!
    }
    

    type Query {
        getTasks: [Task]
        getAvailableStatus: [Status]
    }

    type Mutation {
        updateTask(
            id: ID!
            status: String!
        ): Task

        createTask(
            name: String!
            description: String!
            status: String!
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
            return tasks.docs.map( task => {
                return task.data()
            }) as Task[];
        },
        async getAvailableStatus() {
            const availableStatus = await admin
                .firestore()
                .collection('status')
                .get();
            return availableStatus.docs.map(status => {
                return status.data()
            }) as Status[];
        },
    },
    Mutation: {
        updateTask: async (_, args: { id: string, status: string }) => {
            try {
                const taskReference = admin.firestore().doc(`task/${args.id}`);
                await taskReference.update({
                    status: admin.firestore().doc(`status/${args.status}`),
                    updated_date: moment().format()
                });
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
                    status: admin.firestore().doc(`status/${args.status}`),
                    created_date: moment().format(),
                    updated_date: moment().format()
                }
                console.log(data)
                const taskReference = admin.firestore().collection(`task`).doc(id);
                await taskReference.set(data);
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
