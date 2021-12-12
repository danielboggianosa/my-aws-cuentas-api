import TokenSecurity from "./tokenSecurity";
import PasswordSecurity from "./passwordSecurity";
import { statusCode, ValidationError } from "../../domain/validators/validationError";
import { AppContext } from "../../infrastructure/config/AppContext";
import IUserRepository from "../../domain/repositories/IUserRepository";
import { Role, UserModel } from "../../domain/models/userModel";
import { UserValidator } from "../../domain/validators/userValidator";

export interface LoginUser { email: string; password: string; }

export default class AuthSecurity {
    private tokenSecurity: TokenSecurity;
    private passwordSecurity: PasswordSecurity;
    private userRepository: IUserRepository;
    private userValidator: UserValidator;

    constructor({ repositories }: AppContext) {
        this.userRepository = repositories.userRepository;
        this.tokenSecurity = new TokenSecurity();
        this.passwordSecurity = new PasswordSecurity();
        this.userValidator = new UserValidator(this.userRepository);
    }

    async login({ email, password }: LoginUser): Promise<string> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new ValidationError(statusCode.NOT_FOUND, "User not found");
        }
        if (!await this.passwordSecurity.comparePassword(password, user.password)) {
            throw new ValidationError(statusCode.UNAUTHORIZED, "Password is incorrect");
        }
        const userData = {
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role,
            image: user.imageUrl
        };
        return await this.tokenSecurity.generate(userData);
    }

    logout() {
        return null
    }

    async register(user: UserModel): Promise<string> {
        await this.userValidator.validateData(user)

        const password = await this.passwordSecurity.hashPassword(user.password);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const newUser = await this.userRepository.createUser({
            ...user,
            role: Role.ADMIN,
            password,
            createdAt,
            updatedAt
        });
        return await this.tokenSecurity.generate({
            userId: newUser.userId,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: newUser.username,
            role: newUser.role,
            imageUrl: newUser.imageUrl
        });
    }

    async sesion(token: string) {
        const isValid = await this.tokenSecurity.validate(token);
        if (isValid) return await this.tokenSecurity.getPayload(token);
        else throw new ValidationError(statusCode.UNAUTHORIZED, "Token is not valid");
    }
}