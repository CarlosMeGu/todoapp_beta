import {firebase} from "../providers/firebase";
import {constants} from "../utils/constants";
import {Status} from "../interfaces/status.interface";
import {Task} from "../interfaces/task.interface";
import {getUserFromFirebase} from "../utils/validations/user";

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
    getTasks:async(_, {} , context) => {
        const { user } = context;
        const { id:userId }= await getUserFromFirebase(user);
        const userRef = firebase.db.collection(constants.COLLECTIONS.USER).doc(userId);
        const tasks = await firebase.db
            .collection(constants.COLLECTIONS.TASK)
            .where("user", '==', userRef)
            .get();
        return tasks.docs.map( task => {
            return task.data()
        }) as Task[];
    },
}