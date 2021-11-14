import { UserModel } from "../models/userModel";

export default interface IUserRepository {
    getUsers(): Promise<UserModel[]>;
    getUserById(userId: string): Promise<UserModel>;
    createUser(user: UserModel): Promise<UserModel>;
    updateUser(userId: string, user: UserModel): Promise<void>;
    deleteUser(userId: string): Promise<void>;
    getUserByEmail(email: string): Promise<UserModel>;
    getUserByUsername(username: string): Promise<UserModel>;
    getUserByUsernameOrEmail(usernameOrEmail: string): Promise<UserModel>;
    getUserByUsernameOrEmailAndPassword(usernameOrEmail: string, password: string): Promise<UserModel>;
}