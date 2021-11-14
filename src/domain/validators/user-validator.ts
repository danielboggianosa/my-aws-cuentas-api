import IUserRepository from "../repositories/IUserRepository";

export class UserValidator {
    userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    async validateUser(userId: string) {
        try {
            const user = await this.userRepository.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
        catch (error: any) {
            throw new Error(error);
        }
    }
}