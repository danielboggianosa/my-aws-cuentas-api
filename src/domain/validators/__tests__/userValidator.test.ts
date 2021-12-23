import { Role, UserModel } from "../../../users/domain/model";
import IUserRepository from "../../../users/domain/repository";
import { UserValidator } from "../../../users/domain/validations";
import { statusCode, ValidationError } from "../validationError";

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
    getAll: jest.fn().mockResolvedValue([mockUserValue]),
    getOneById: jest.fn().mockResolvedValue(mockUserValue),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getOneByEmail: jest.fn().mockResolvedValue(mockUserValue),
    getOneByUsername: jest.fn().mockResolvedValue(mockUserValue),
    getOneByUsernameOrEmail: jest.fn().mockResolvedValue(mockUserValue),
    getOneByUsernameOrEmailAndPassword: jest.fn().mockResolvedValue(mockUserValue)
}

describe('User Validator', () => {
    const userValidator = new UserValidator(mockUserRepository)

    test('Given an existing userId, when the user is found, then the user is return', async () => {
        const user = await userValidator.validateById(userId)
        expect(user).toEqual(mockUserValue)
    })

    test('When the repository responds with an error, then a new error is thrown', () => {
        mockUserRepository.getOneById = jest.fn().mockRejectedValue(new ValidationError(statusCode.BAD_REQUEST, 'Error'))
        expect(() => userValidator.validateById('non-id')).rejects.toThrowError('Error')
    })
})