"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userValidator_1 = require("../userValidator");
const validationError_1 = require("../validationError");
const userId = "user-uuid";
const email = "test@email.com";
const username = 'test-username';
const password = 'test-password';
const mockUserValue = {
    userId,
    firstName: "Test-name",
    lastName: "Test-lastName",
    email,
    username,
    password,
    createdAt: new Date(),
    updatedAt: new Date()
};
const mockUserRepository = {
    getUsers: jest.fn().mockResolvedValue([mockUserValue]),
    getUserById: jest.fn().mockResolvedValue(mockUserValue),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    getUserByEmail: jest.fn().mockResolvedValue(mockUserValue),
    getUserByUsername: jest.fn().mockResolvedValue(mockUserValue),
    getUserByUsernameOrEmail: jest.fn().mockResolvedValue(mockUserValue),
    getUserByUsernameOrEmailAndPassword: jest.fn().mockResolvedValue(mockUserValue)
};
describe('User Validator', () => {
    const userValidator = new userValidator_1.UserValidator(mockUserRepository);
    test('Given an existing userId, when the user is found, then the user is return', async () => {
        const user = await userValidator.validateById(userId);
        expect(user).toEqual(mockUserValue);
    });
    test('When the repository responds with an error, then a new error is thrown', () => {
        mockUserRepository.getUserById = jest.fn().mockRejectedValue(new validationError_1.ValidationError('Error'));
        expect(() => userValidator.validateById('non-id')).rejects.toThrowError('Error');
    });
});
