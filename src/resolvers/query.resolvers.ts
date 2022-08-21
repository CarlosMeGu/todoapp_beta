import {firebase} from "../providers/firebase";
import {constants} from "../constants";
import {Status} from "../interfaces/status.interface";
import {Task} from "../interfaces/task.interface";

export const queryResolvers = {
    getAvailableStatus:async(_, {} , context) => {
        const { token, user } = context;
        const availableStatus = await firebase.db
            .collection(constants.COLLECTIONS.STATUS)
            .get();
        return availableStatus.docs.map(status => {
            return status.data()
        }) as Status[];
    },
    getTasks:async() => {
        const tasks = await firebase.db
            .collection(constants.COLLECTIONS.TASKS)
            .get();
        return tasks.docs.map( task => {
            return task.data()
        }) as Task[];
    },
}