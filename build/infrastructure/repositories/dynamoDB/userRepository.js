"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const dynamoDbClient_1 = __importDefault(require("./dynamoDbClient"));
const USERS_TABLE = process.env.USERS_TABLE;
class UserRepository {
    constructor() {
        this.dynamoDbClient = dynamoDbClient_1.default;
    }
    async getUsers() {
        const params = {
            TableName: USERS_TABLE,
            AttributesToGet: ["userId", "email", "firstName", "lastName", "createdAt", "updatedAt"],
            Limit: 50,
        };
        const result = await this.dynamoDbClient.scan(params).promise();
        if (!result) {
            throw new Error(`No se pudo encontrar la tabla ${USERS_TABLE}`);
        }
        return result.Items;
    }
    async getUserByEmail(email) {
        const params = {
            TableName: USERS_TABLE,
            Key: { email },
            AttributesToGet: ["userId", "email", "firstName", "lastName", "createdAt", "updatedAt"],
        };
        const { Item } = await this.dynamoDbClient.get(params).promise();
        if (!Item) {
            throw new Error('No se pudo encontrar un usuario con el "email" provisto');
        }
        return Item;
    }
    getUserByUsername(username) {
        throw new Error('Method not implemented.');
    }
    getUserByUsernameOrEmail(usernameOrEmail) {
        throw new Error('Method not implemented.');
    }
    getUserByUsernameOrEmailAndPassword(usernameOrEmail, password) {
        throw new Error('Method not implemented.');
    }
    async getUserById(userId) {
        const params = {
            TableName: USERS_TABLE,
            Key: { userId },
            AttributesToGet: ["userId", "email", "username", "firstName", "lastName", "createdAt", "updatedAt"],
        };
        const { Item } = await this.dynamoDbClient.get(params).promise();
        if (!Item) {
            throw new Error('No se pudo encontrar un usuario con el "id" provisto');
        }
        return Item;
    }
    async createUser({ email, username, firstName, lastName, password }) {
        const userId = (0, crypto_1.randomUUID)();
        const createdAt = new Date().toISOString();
        const params = {
            TableName: USERS_TABLE,
            Item: {
                userId,
                email,
                username,
                firstName,
                lastName,
                password,
                createdAt,
            },
        };
        await this.dynamoDbClient.put(params).promise();
        const Item = await this.getUserById(userId);
        return Item;
    }
    async updateUser(userId, { email, username, firstName, lastName }) {
        const params = {
            TableName: USERS_TABLE,
            Key: { userId },
            UpdateExpression: "set email = :email, username = :username, firstName = :firstName, lastName = :lastName",
            ExpressionAttributeValues: {
                ":email": email,
                ":username": username,
                ":firstName": firstName,
                ":lastName": lastName,
            },
            ReturnValues: "ALL_NEW",
        };
        const { Attributes } = await this.dynamoDbClient.update(params).promise();
        if (!Attributes) {
            throw new Error("No fue posible actualizar el usuario");
        }
        return;
    }
    async deleteUser(userId) {
        const params = {
            TableName: USERS_TABLE,
            Key: { userId },
        };
        const { Attributes } = await this.dynamoDbClient.delete(params).promise();
        if (!Attributes) {
            throw new Error("No fue posible eliminar el usuario");
        }
        return;
    }
}
exports.default = UserRepository;
;
