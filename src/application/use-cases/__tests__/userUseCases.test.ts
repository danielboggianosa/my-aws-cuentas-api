import UserUseCases from "../userUseCases";
import IUserRepository from "../../../domain/repositories/IUserRepository";
import { Role, UserModel } from "../../../domain/models/userModel";

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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: "",
    role: Role.USER,
}

const mockUserRepository: IUserRepository = {
    getAll: jest.fn().mockResolvedValue([userMockValue]),
    getOneById: jest.fn().mockResolvedValue(userMockValue),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getOneByEmail: jest.fn().mockResolvedValue(userMockValue),
    getOneByUsername: jest.fn().mockResolvedValue(userMockValue),
    getOneByUsernameOrEmail: jest.fn().mockResolvedValue(userMockValue),
    getOneByUsernameOrEmailAndPassword: jest.fn().mockResolvedValue(userMockValue)
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
        expect(mockUserRepository.getAll).toHaveBeenCalled();
    })

    test('When getUsers returns an error, then a new Error is thrown', () => {
        mockUserRepository.getAll = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUsers()).rejects.toThrow();
    })

    test('When getUserById is called, then a single user is returned', async () => {
        const user = await userUseCases.getUserById(userId);
        expect(user).toEqual(userMockValue);
        expect(mockUserRepository.getOneById).toHaveBeenCalledWith(userId);
    })

    test('When getUserById returns an error, then a new error is thrown', () => {
        mockUserRepository.getOneById = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUserById(userId)).rejects.toThrow();
    })

    test('When createUser is called, then createUser is called from the repository', async () => {
        await userUseCases.createUser(userMockValue)
        expect(mockUserRepository.create).toHaveBeenCalledWith(userMockValue)
    })

    test('When createUser returns an error, then a new error is thrown', () => {
        mockUserRepository.create = jest.fn().mockRejectedValue(new Error());
        expect(userUseCases.createUser(userMockValue)).rejects.toThrow();
    })

    it('When update is called, then update is called from the repository', async () => {
        await userUseCases.updateUser(userId, userMockValue);
        expect(mockUserRepository.update).toHaveBeenCalledWith(userId,userMockValue)
    })

    test('When update returns and error, then a new error is thrown', () => {
        mockUserRepository.update = jest.fn().mockRejectedValue(new Error());
        expect(userUseCases.updateUser(userId, userMockValue)).rejects.toThrow();
    })

    test('When deleteUser is called, then deleteUser is called from the repository', async () => {
        await userUseCases.deleteUser(userId)
        expect(mockUserRepository.delete).toHaveBeenCalledWith(userId)
    })

    test('When deleteUser returns and error, then a new error is thrown', () => {
        mockUserRepository.delete = jest.fn().mockRejectedValue(new Error());
        expect(userUseCases.deleteUser(userId)).rejects.toThrow();
    })

    test('When getUserByEmail is called, then a single user is returned', async () => {
        const user = await userUseCases.getUserByEmail(email);
        expect(user).toEqual(userMockValue);
        expect(mockUserRepository.getOneByEmail).toHaveBeenCalledWith(email);
    })

    test('When getUserByEmail returns an error, then a new error is thrown', () => {
        mockUserRepository.getOneByEmail = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUserByEmail(email)).rejects.toThrow();
    })

    test('When getUserByUsername is called, then a single user is returned', async () => {
        const user = await userUseCases.getUserByUsername(userMockValue.username);
        expect(user).toEqual(userMockValue);
        expect(mockUserRepository.getOneByUsername).toHaveBeenCalledWith(username);
    })

    test('When getUserByUsername returns an error, then a new error is thrown', () => {
        mockUserRepository.getOneByUsername = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUserByUsername(username)).rejects.toThrow();
    })

    test('When getUserByUsernameOrEmail is called, then a single user is returned', async () => {
        const user = await userUseCases.getUserByUsernameOrEmail(userMockValue.username);
        expect(user).toEqual(userMockValue);
        expect(mockUserRepository.getOneByUsernameOrEmail).toHaveBeenCalledWith(username);
    })

    test('When getUserByUsernameOrEmail returns an error, then a new error is thrown', () => {
        mockUserRepository.getOneByUsernameOrEmail = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUserByUsernameOrEmail(username)).rejects.toThrow();
    })

    test('When getUserByUsernameOrEmailAndPassword is called, then a single user is returned', async () => {
        const user = await userUseCases.getUserByUsernameOrEmailAndPassword(username, password);
        expect(user).toEqual(userMockValue);
        expect(mockUserRepository.getOneByUsernameOrEmailAndPassword).toHaveBeenCalledWith(username, password);
    })

    test('When getUserByUsernameOrEmailAndPassword returns an error, then a new error is thrown', () => {
        mockUserRepository.getOneByUsernameOrEmailAndPassword = jest.fn().mockRejectedValue(new Error('Error'));
        expect(userUseCases.getUserByUsernameOrEmailAndPassword(username, password)).rejects.toThrow();
    })
});
