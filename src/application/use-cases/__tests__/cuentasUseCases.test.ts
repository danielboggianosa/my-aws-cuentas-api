import CuentasUseCases from '../cuentaUseCases'
import ICuentasRepository from '../../../domain/repositories/ICuentasRepository'
import { CuentaModel } from '../../../domain/models/cuentaModel'
import IUserRepository from '../../../domain/repositories/IUserRepository'
import { Role, UserModel } from '../../../domain/models/userModel'

const cuentaId = 'cuenta-uuid';
const userId = 'user-uuid';
const empresaId = 'empresa-uuid';
const cuentaMockValue: CuentaModel = {
    cuentaId,
    empresaId,
    nombre: 'Cuenta 1',
    tipo: 'ahorros',
    saldo: 1000,
    banco: 'BCP',
    descripcion: '',
    mantenimiento: 0,
    moneda: 'USD',
    numero: '12343456789',
    tarjeta: '3847574388292',
    titular: 'Test Owner',
    imageUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}

const userMockValue: UserModel = {
    userId,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: '', 
    role: Role.USER
}

const mockCuentasRepository: ICuentasRepository = {
    getCuentas: jest.fn().mockResolvedValue([cuentaMockValue]),
    getCuentaById: jest.fn().mockResolvedValue(cuentaMockValue),
    createCuenta: jest.fn(),
    updateCuenta: jest.fn(),
    deleteCuenta: jest.fn(),
    getCuentasByUsuarioId: jest.fn().mockResolvedValue([cuentaMockValue])
}

const mockUserRepository: IUserRepository = {
    getAll: jest.fn(),
    getOneById: jest.fn().mockResolvedValue(userMockValue),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getOneByEmail: jest.fn(),
    getOneByUsername: jest.fn(),
    getOneByUsernameOrEmail: jest.fn(),
    getOneByUsernameOrEmailAndPassword: jest.fn()
}

const mockAppContext: any = {
    repositories: {
        cuentasRepository: mockCuentasRepository,
        userRepository: mockUserRepository
    },
}

describe('CuentasUserCases', () => {
    const cuentasUseCases = new CuentasUseCases(mockAppContext);

    test('When getCuentas is called, then cuentas is return in array', async () => {
        const data = await cuentasUseCases.getCuentas();
        expect(JSON.stringify(data)).toEqual(JSON.stringify([cuentaMockValue]));
        expect(mockCuentasRepository.getCuentas).toHaveBeenCalled();
    });

    test('When getCuentas is called and returns an error, then a new Error is thrown', () => {
        mockCuentasRepository.getCuentas = jest.fn().mockRejectedValue(new Error('Error'));
        expect(cuentasUseCases.getCuentas()).rejects.toThrow();
    })

    test('Given a valid cuentaId, then it should call the repository', async () => {
        const cuentaId = '1234567890'
        const data = await cuentasUseCases.getCuentaById(cuentaId);
        expect(data).toEqual(cuentaMockValue)
        expect(mockCuentasRepository.getCuentaById).toHaveBeenCalledWith(cuentaId)
    })

    test('When getCuentaById is called and returns an error, then a new Error is thrown', () => {
        mockCuentasRepository.getCuentaById = jest.fn().mockRejectedValue(new Error('Error'));
        expect(cuentasUseCases.getCuentaById(cuentaId)).rejects.toThrow();
    })

    test('When crearCuenta is called, then createCuenta is called from the repository', async () => {
        await cuentasUseCases.createCuenta(userId, cuentaMockValue)
        expect(mockCuentasRepository.createCuenta).toHaveBeenCalledWith(userId, cuentaMockValue)
    })

    test('When crearCuenta is called and returns an error, then a new Error is thrown', () => {
        mockCuentasRepository.createCuenta = jest.fn().mockRejectedValue(new Error('Error'));
        expect(cuentasUseCases.createCuenta(userId, cuentaMockValue)).rejects.toThrow();
    })

    test('When updateCuenta is called, then updateCuenta is called from the repository', async () => {
        await cuentasUseCases.updateCuenta(cuentaId, cuentaMockValue)
        expect(mockCuentasRepository.updateCuenta).toHaveBeenCalledWith(cuentaId, cuentaMockValue)
    })

    test('When updateCuenta is called and returns an error, then a new Error is thrown', () => {
        mockCuentasRepository.updateCuenta = jest.fn().mockRejectedValue(new Error('Error'));
        expect(cuentasUseCases.updateCuenta(cuentaId, cuentaMockValue)).rejects.toThrow();
    })

    test('When deleteCuenta is called, then deleteCuenta is called from the repository', async () => {
        await cuentasUseCases.deleteCuenta(cuentaId)
        expect(mockCuentasRepository.deleteCuenta).toHaveBeenCalledWith(cuentaId)
    })

    test('When deleteCuenta is called and returns an error, then a new Error is thrown', () => {
        mockCuentasRepository.deleteCuenta = jest.fn().mockRejectedValue(new Error('Error'));
        expect(cuentasUseCases.deleteCuenta(cuentaId)).rejects.toThrow();
    })

    test('When getCuentasByUsuarioId is called, then getCuentasByUsuarioId is called from the repository', async () => {
        await cuentasUseCases.getCuentasByUsuarioId(userId)
        expect(mockCuentasRepository.getCuentasByUsuarioId).toHaveBeenCalledWith(userId)
    })

    test('When getCuentasByUsuarioId is called and returns an error, then a new Error is thrown', () => {
        mockCuentasRepository.getCuentasByUsuarioId = jest.fn().mockRejectedValue(new Error('Error'));
        expect(cuentasUseCases.getCuentasByUsuarioId(userId)).rejects.toThrow();
    })
})