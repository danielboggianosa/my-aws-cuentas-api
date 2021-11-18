import IUserRepository from "../repositories/IUserRepository";
import { ValidationError } from "./validationError";

export class UserValidator {
    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    async validateById(userId: string) {
        try {
            return await this.userRepository.getUserById(userId);
        } catch (error: any) {
            throw new ValidationError(error.message);
        }
    }
}