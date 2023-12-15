import { userModel } from "../../models/users.js";

export default class Users {

    getUserByEmail = async (email) => {
        try {
            const user = await userModel.findOne({ email: email.toLowerCase() });
            return user;
        } catch (error) {
            throw error;
        }
    }
    
    createUser = async (first_name, last_name, email, age, password, cart, role) => {
        try {
            const result = await userModel.create(first_name, last_name, email, age, password, cart, role);
            return result;
        } catch (error) {
            throw error;
        }
    }
}