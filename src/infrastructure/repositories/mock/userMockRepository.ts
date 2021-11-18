import { UserModel } from "../../../domain/models/userModel";
import IUserRepository from "../../../domain/repositories/IUserRepository";
import { IMockClient } from "./mockClient";

const { randomId } = require("../../utils/Utils");

const USERS_TABLE = "usersMock";

export default class UserMockRepository implements IUserRepository {
    db: IMockClient;
    constructor(db: IMockClient) {
        this.db = db;
        this.db.createTable(USERS_TABLE, {
            id: { type: "integer", primaryKey: true, autoIncrement: true },
            name: { type: "text" },
            email: { type: "text" },
            password: { type: "text" },
            createdAt: { type: "text" },
            updatedAt: { type: "text" },
        });
    }

    getUserByEmail(email: string): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }
    getUserByUsername(username: string): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }
    getUserByUsernameOrEmail(usernameOrEmail: string): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }
    getUserByUsernameOrEmailAndPassword(usernameOrEmail: string, password: string): Promise<UserModel> {
        throw new Error("Method not implemented.");
    }

    async getUsers(): Promise<UserModel[]> {
        return this.db.getAll(USERS_TABLE);
    }

    async getUserById(id: string): Promise<UserModel> {
        return await this.db.getById(USERS_TABLE, id);
    }

    async createUser(user: UserModel): Promise<UserModel> {
        const { firstName, lastName, email, username, password, createdAt, updatedAt } = user;
        const userId = randomId();
        const result = await this.db.insert(USERS_TABLE, {
            userId,
            firstName,
            lastName,
            email,
            password,
            createdAt,
            updatedAt,
            username,
        });
        return result;
    }

    async updateUser(userId: string, user: UserModel): Promise<void> {
        const { firstName, lastName, email, username, password, createdAt, updatedAt } = user;
        const result = await this.db.update(USERS_TABLE, userId, {
            firstName,
            lastName,
            email,
            password,
            createdAt,
            updatedAt,
            username,
        });
        return;
    }

    async deleteUser(userId: string): Promise<void> {
        return await this.db.delete(USERS_TABLE, userId);
    }
};