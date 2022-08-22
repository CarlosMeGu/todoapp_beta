import {firebase} from "../providers/firebase";
import {constants} from "../utils/constants";
import {ApolloError} from "apollo-server";
import * as moment from "moment/moment";
import {v4 as uuidv4} from 'uuid';
import {getUserFromFirebase} from "../utils/validations/user";

const getNewTaskStatusPayload = ({status}) => {
    return {
        status: firebase.db.doc(`${constants.COLLECTIONS.STATUS}/${status}`),
        updated_date: moment().format()
    }
}

const getNewTaskPayload = ({description, name, status, userId}) => {
    const id = uuidv4()
    return {
        id,
        name,
        description,
        status: firebase.db.doc(`${constants.COLLECTIONS.STATUS}/${status}`),
        user: firebase.db.doc(`${constants.COLLECTIONS.USER}/${userId}`),
        created_date: moment().format(),
        updated_date: moment().format()
    }
}

export const mutationResolvers = {
    updateTask: async (_, args: { id: string, status: string }, context) => {
        try {
            const taskReference = firebase.db.doc(`${constants.COLLECTIONS.TASK}/${args.id}`);
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
            const {user} = context;
            const {id: userId} = await getUserFromFirebase(user);
            const newTask = getNewTaskPayload({...args, userId});
            const taskReference = firebase.db
                .collection(`${constants.COLLECTIONS.TASK}`)
                .doc(newTask.id);
            await taskReference.set(newTask);
            return newTask;
        } catch (error) {
            throw new ApolloError(error);
        }
    },
}