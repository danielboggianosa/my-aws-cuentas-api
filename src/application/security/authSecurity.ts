import TokenSecurity from "./tokenSecurity";
import PasswordSecurity from "./passwordSecurity";
import { ValidationError } from "../../domain/validators/validationError";
import { AppContext } from "../../infrastructure/config/AppContext";
import IUserRepository from "../../domain/repositories/IUserRepository";
import { Role, UserModel } from "../../domain/models/userModel";

export interface LoginUser { email: string; password: string; }

export default class AuthSecurity {
    private tokenSecurity: TokenSecurity;
    private passwordSecurity: PasswordSecurity;
    private userRepository: IUserRepository;

    constructor({ repositories }: AppContext) {
        this.userRepository = repositories.userRepository;
        this.tokenSecurity = new TokenSecurity();
        this.passwordSecurity = new PasswordSecurity();
    }

    async login({ email, password }: LoginUser): Promise<string> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new ValidationError("User not found");
        }
        if (!await this.passwordSecurity.comparePassword(password, user.password)) {
            throw new ValidationError("Password is incorrect");
        }
        const userData = {
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
        };
        return await this.tokenSecurity.generate(userData);
    }

    logout() {
        return null
    }

    async register(user: UserModel): Promise<string> {
        const userExists = await this.userRepository.getUserByEmail(user.email);
        if (userExists) throw new ValidationError("User already exist");

        const password = await this.passwordSecurity.hashPassword(user.password);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const newUser = await this.userRepository.createUser({
            ...user,
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
        });
    }

    async sesion(token: string) {
        const isValid = await this.tokenSecurity.validate(token);
        if (isValid) return await this.tokenSecurity.getPayload(token);
        else throw new ValidationError("Token is not valid");
    }
}