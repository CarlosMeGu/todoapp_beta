import {gql} from "apollo-server";
import {Status} from "../interfaces/status.interface";
import {Task} from "../interfaces/task.interface";

export const typeDefs = gql`
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

