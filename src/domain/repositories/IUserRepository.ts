import { UserModel } from "../models/userModel";

export default interface IUserRepository {
    getAll(): Promise<UserModel[]>;
    getOneById(userId: string): Promise<UserModel>;
    create(user: UserModel): Promise<UserModel>;
    update(userId: string, user: UserModel): Promise<void>;
    delete(userId: string): Promise<void>;
    getOneByEmail(email: string): Promise<UserModel>;
    getOneByUsername(username: string): Promise<UserModel>;
    getOneByUsernameOrEmail(usernameOrEmail: string): Promise<UserModel>;
    getOneByUsernameOrEmailAndPassword(usernameOrEmail: string, password: string): Promise<UserModel>;
}