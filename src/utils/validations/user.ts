import {ApolloError} from "apollo-server";
import * as moment from "moment";
import {firebase} from "../../providers/firebase";
import {constants} from "../constants";
import {User} from "../../interfaces/user.interface";
import {v4 as uuidv4} from 'uuid';


const validateUserInfo = (userInfo) => {
    if (userInfo) {
        if (userInfo.user) {
            if (userInfo.user.email) return userInfo.user.email;
        }
    }
    throw new ApolloError("there is no user info or token is not present");
}

const getUserPayload = ({user: {email, name}}) => {
    const id = uuidv4()
    return {
        id,
        name,
        email,
        created_date: moment().format(),
        updated_date: moment().format()
    }
}

const createUser = async (userInfo) => {
    try {
        const newUser = getUserPayload(userInfo);
        const userReference = firebase.db
            .collection(`${constants.COLLECTIONS.USER}`)
            .doc(newUser.id);
        await userReference.set(newUser);
        return newUser as User;
    } catch (error) {
        throw new ApolloError(error);
    }
}


export const getUserFromFirebase = async (userInfo) => {
    const email = validateUserInfo(userInfo);
    const userRef = firebase.db.collection(`${constants.COLLECTIONS.USER}`);
    const user = await userRef.where('email', '==', email).limit(1).get();
    if (!user.empty) {
        let userData = {}
        user.forEach(doc => userData = doc.data());
        return userData as User
    }
    return createUser(userInfo);

}
