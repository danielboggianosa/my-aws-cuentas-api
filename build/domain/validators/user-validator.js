"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
class UserValidator {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async validateUser(userId) {
        try {
            const user = await this.userRepository.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.UserValidator = UserValidator;
