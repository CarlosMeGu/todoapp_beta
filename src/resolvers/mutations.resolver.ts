import {firebase} from "../providers/firebase";
import {constants} from "../constants";
import {ApolloError} from "apollo-server";
import * as moment from "moment/moment";
import {v4 as uuidv4} from 'uuid';
import {isTokenValid} from "../validate";

const getNewTaskStatusPayload = ({status}) => {
    return {
        status: firebase.db.doc(`${constants.COLLECTIONS.STATUS}/${status}`),
        updated_date: moment().format()
    }
}

const getNewTaskPayload = ({description, name, status}) => {
    const id = uuidv4()
    return {
        id,
        name,
        description,
        status: firebase.db.doc(`${constants.COLLECTIONS.STATUS}/${status}`),
        created_date: moment().format(),
        updated_date: moment().format()
    }
}

export const mutationResolvers = {
    updateTask: async (_, args: { id: string, status: string }, context) => {
        try {
            const { token } = await context();
            const error = await isTokenValid(token);
            const taskReference = firebase.db.doc(`${constants.COLLECTIONS.TASKS}/${args.id}`);
            await taskReference.update(getNewTaskStatusPayload(args));
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
    }, context) => {
        try {
            const newTask = getNewTaskPayload(args);
            const taskReference = firebase.db
                .collection(`${constants.COLLECTIONS.TASKS}`)
                .doc(newTask.id);
            await taskReference.set(newTask);
            return newTask;
        } catch (error) {
            throw new ApolloError(error);
        }
    },
}