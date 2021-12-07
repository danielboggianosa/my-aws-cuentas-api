import { Role, UserModel } from "../../models/userModel";
import IUserRepository from "../../repositories/IUserRepository";
import { UserValidator } from "../userValidator";
import { ValidationError } from "../validationError";

const userId = "user-uuid";
const email = "test@email.com";
const username = 'test-username';
const password = 'test-password';
const mockUserValue: UserModel = {
    userId,
    firstName: "Test-name",
    lastName: "Test-lastName",
    email,
    username,
    password,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: "",
    role: Role.USER,
}
const mockUserRepository: IUserRepository = {
    getUsers: jest.fn().mockResolvedValue([mockUserValue]),
    getUserById: jest.fn().mockResolvedValue(mockUserValue),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    getUserByEmail: jest.fn().mockResolvedValue(mockUserValue),
    getUserByUsername: jest.fn().mockResolvedValue(mockUserValue),
    getUserByUsernameOrEmail: jest.fn().mockResolvedValue(mockUserValue),
    getUserByUsernameOrEmailAndPassword: jest.fn().mockResolvedValue(mockUserValue)
}

describe('User Validator', () => {
    const userValidator = new UserValidator(mockUserRepository)

    test('Given an existing userId, when the user is found, then the user is return', async () => {
        const user = await userValidator.validateById(userId)
        expect(user).toEqual(mockUserValue)
    })

    test('When the repository responds with an error, then a new error is thrown', () => {
        mockUserRepository.getUserById = jest.fn().mockRejectedValue(new ValidationError('Error'))
        expect(() => userValidator.validateById('non-id')).rejects.toThrowError('Error')
    })
})