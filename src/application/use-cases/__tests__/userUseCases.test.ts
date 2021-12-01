import UserUseCases from "../userUseCases";
import IUserRepository from "../../../domain/repositories/IUserRepository";
import { UserModel } from "../../../domain/models/userModel";

const userId = "user-uuid";
const email = "test@email.com";
const username = 'test-username';
const password = 'test-password';
const userMockValue: UserModel = {
    userId,
    firstName: "Test-name",
    lastName: "Test-lastName",
    email,
    username,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: ""
}

const mockUserRepository: IUserRepository = {
    getUsers: jest.fn().mockResolvedValue([userMockValue]),
    getUserById: jest.fn().mockResolvedValue(userMockValue),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    getUserByEmail: jest.fn().mockResolvedValue(userMockValue),
    getUserByUsername: jest.fn().mockResolvedValue(userMockValue),
    getUserByUsernameOrEmail: jest.fn().mockResolvedValue(userMockValue),
    getUserByUsernameOrEmailAndPassword: jest.fn().mockResolvedValue(userMockValue)
}

const mockAppContext: any = {
    repositories: {
        userRepository: mockUserRepository
    },
}

describe('UserUseCases', () => {
    const userUseCases = new UserUseCases(mockAppContext);

    test('When getUsers is called, then getUsers are return in a array', async () => {
        const users = await userUseCases.getUsers();
        expect(users).toEqual([userMockValue]);
        expect(mockUserRepository.getUsers).toHaveBeenCalled();
    })

    test('When getUsers returns an error, then a new Error is thrown', () => {
        mockUserRepository.getUsers = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUsers()).rejects.toThrow();
    })

    test('When getUserById is called, then a single user is returned', async () => {
        const user = await userUseCases.getUserById(userId);
        expect(user).toEqual(userMockValue);
        expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
    })

    test('When getUserById returns an error, then a new error is thrown', () => {
        mockUserRepository.getUserById = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUserById(userId)).rejects.toThrow();
    })

    test('When createUser is called, then createUser is called from the repository', async () => {
        await userUseCases.createUser(userMockValue)
        expect(mockUserRepository.createUser).toHaveBeenCalledWith(userMockValue)
    })

    test('When createUser returns an error, then a new error is thrown', () => {
        mockUserRepository.createUser = jest.fn().mockRejectedValue(new Error());
        expect(userUseCases.createUser(userMockValue)).rejects.toThrow();
    })

    it('When updateUser is called, then updateUser is called from the repository', async () => {
        await userUseCases.updateUser(userId, userMockValue);
        expect(mockUserRepository.updateUser).toHaveBeenCalledWith(userId,userMockValue)
    })

    test('When updateUser returns and error, then a new error is thrown', () => {
        mockUserRepository.updateUser = jest.fn().mockRejectedValue(new Error());
        expect(userUseCases.updateUser(userId, userMockValue)).rejects.toThrow();
    })

    test('When deleteUser is called, then deleteUser is called from the repository', async () => {
        await userUseCases.deleteUser(userId)
        expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId)
    })

    test('When deleteUser returns and error, then a new error is thrown', () => {
        mockUserRepository.deleteUser = jest.fn().mockRejectedValue(new Error());
        expect(userUseCases.deleteUser(userId)).rejects.toThrow();
    })

    test('When getUserByEmail is called, then a single user is returned', async () => {
        const user = await userUseCases.getUserByEmail(email);
        expect(user).toEqual(userMockValue);
        expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
    })

    test('When getUserByEmail returns an error, then a new error is thrown', () => {
        mockUserRepository.getUserByEmail = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUserByEmail(email)).rejects.toThrow();
    })

    test('When getUserByUsername is called, then a single user is returned', async () => {
        const user = await userUseCases.getUserByUsername(userMockValue.username);
        expect(user).toEqual(userMockValue);
        expect(mockUserRepository.getUserByUsername).toHaveBeenCalledWith(username);
    })

    test('When getUserByUsername returns an error, then a new error is thrown', () => {
        mockUserRepository.getUserByUsername = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUserByUsername(username)).rejects.toThrow();
    })

    test('When getUserByUsernameOrEmail is called, then a single user is returned', async () => {
        const user = await userUseCases.getUserByUsernameOrEmail(userMockValue.username);
        expect(user).toEqual(userMockValue);
        expect(mockUserRepository.getUserByUsernameOrEmail).toHaveBeenCalledWith(username);
    })

    test('When getUserByUsernameOrEmail returns an error, then a new error is thrown', () => {
        mockUserRepository.getUserByUsernameOrEmail = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUserByUsernameOrEmail(username)).rejects.toThrow();
    })

    test('When getUserByUsernameOrEmailAndPassword is called, then a single user is returned', async () => {
        const user = await userUseCases.getUserByUsernameOrEmailAndPassword(username, password);
        expect(user).toEqual(userMockValue);
        expect(mockUserRepository.getUserByUsernameOrEmailAndPassword).toHaveBeenCalledWith(username, password);
    })

    test('When getUserByUsernameOrEmailAndPassword returns an error, then a new error is thrown', () => {
        mockUserRepository.getUserByUsernameOrEmailAndPassword = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUserByUsernameOrEmailAndPassword(username, password)).rejects.toThrow();
    })
});
