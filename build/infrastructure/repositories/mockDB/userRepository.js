"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { randomId } = require("../../utils/Utils");
const USERS_TABLE = "users";
class UserRepository {
    constructor(db) {
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
    getUserByEmail(email) {
        throw new Error("Method not implemented.");
    }
    getUserByUsername(username) {
        throw new Error("Method not implemented.");
    }
    getUserByUsernameOrEmail(usernameOrEmail) {
        throw new Error("Method not implemented.");
    }
    getUserByUsernameOrEmailAndPassword(usernameOrEmail, password) {
        throw new Error("Method not implemented.");
    }
    async getUsers() {
        return this.db.getAll(USERS_TABLE);
    }
    async getUserById(id) {
        return await this.db.getById(USERS_TABLE, id);
    }
    async createUser(user) {
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
    async updateUser(userId, user) {
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
    async deleteUser(userId) {
        return await this.db.delete(USERS_TABLE, userId);
    }
}
exports.default = UserRepository;
;
