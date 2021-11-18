"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserUseCases {
    constructor(appContext) {
        this.userRepository = appContext.repositories.userRepository;
    }
    async getUserById(userId) {
        try {
            return await this.userRepository.getUserById(userId);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUsers() {
        try {
            return await this.userRepository.getUsers();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async createUser(user) {
        try {
            const Item = await this.userRepository.createUser(user);
            return Item;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUser(userId, user) {
        try {
            return await this.userRepository.updateUser(userId, user);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteUser(userId) {
        try {
            return await this.userRepository.deleteUser(userId);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUserByEmail(email) {
        try {
            return await this.userRepository.getUserByEmail(email);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUserByUsername(username) {
        try {
            return await this.userRepository.getUserByUsername(username);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUserByUsernameOrEmail(usernameOrEmail) {
        try {
            return await this.userRepository.getUserByUsernameOrEmail(usernameOrEmail);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUserByUsernameOrEmailAndPassword(usernameOrEmail, password) {
        try {
            return await this.userRepository.getUserByUsernameOrEmailAndPassword(usernameOrEmail, password);
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = UserUseCases;
;
