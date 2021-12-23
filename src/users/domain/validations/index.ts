import { UserModel } from "../model";
import IUserRepository from "../repository";
import { statusCode, ValidationError } from "../../../domain/validators/validationError";

export class UserValidator {
    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    async validateById(userId: string) {
        try {
            return await this.userRepository.getOneById(userId);
        } catch (error: any) {
            throw new ValidationError(statusCode.CONFLICT, error.message);
        }
    }

    async userExists(userEmail: string) {
        const user = await this.userRepository.getOneByEmail(userEmail)
        if (user?.userId) throw new ValidationError(statusCode.CONFLICT, 'User email is in use')
    }

    async validateData(user: UserModel) {
        if (!user.password || !user.email) throw new ValidationError(statusCode.BAD_REQUEST, 'Mandatory fields not provided')
        await this.userExists(user.email)
    }
}