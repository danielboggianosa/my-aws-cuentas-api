"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const validationError_1 = require("./validationError");
class UserValidator {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async validateById(userId) {
        try {
            return await this.userRepository.getUserById(userId);
        }
        catch (error) {
            throw new validationError_1.ValidationError(error.message);
        }
    }
}
exports.UserValidator = UserValidator;
