import UserDTO from "../dto/user.js";

export default class UserssRepository {
    constructor(dao) {
        this.dao = dao
    }
    getUserByEmail = async (email) => {
        const user = await this.dao.getUserByEmail(email);
        return user;
    }
    createUser = async (first_name, last_name, email, age, password, cart, role) => {
        const newUser = new UserDTO({ first_name, last_name, email, age, password: createHash(password), cart, role });
        const result = await this.dao.createUser(newUser);
        return result;
    }
}
