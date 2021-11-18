"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cuentaUseCases_1 = __importDefault(require("../cuentaUseCases"));
const cuentaMockValue = {
    cuentaId: 'cuenta-uuid',
    userId: 'user-uuid',
    nombre: 'Cuenta 1',
    tipo: 'ahorros',
    saldo: 1000,
    banco: 'BCP',
    descripcion: '',
    mantenimiento: 0,
    moneda: 'USD',
    numero: '12343456789',
    tarjeta: '3847574388292',
    titular: 'Test Owner'
};
const mockCuentasRepository = {
    getCuentas: function () {
        return jest.fn().mockReturnValue(Promise.resolve([cuentaMockValue]));
    },
    getCuentaById: function (cuentaId) {
        return jest.fn().mockReturnValue(Promise.resolve(cuentaMockValue));
    },
    createCuenta: function (cuenta) {
        throw new Error('Function not implemented.');
    },
    updateCuenta: function (cuentaId, cuenta) {
        throw new Error('Function not implemented.');
    },
    deleteCuenta: function (cuentaId) {
        throw new Error('Function not implemented.');
    },
    getCuentasByUsuarioId: function (userId) {
        throw new Error('Function not implemented.');
    }
};
const mockAppContext = {
    default: {
        repositories: {
            cuentaRepository: mockCuentasRepository,
        }
    }
};
describe('CuentasUserCases', () => {
    let cuentasUseCases = new cuentaUseCases_1.default(mockAppContext);
    it('Given a valid cuentaId, then it should call the repository', async () => {
        console.log("### CUENTA USERCases");
        const cuentaId = '1234567890';
        const data = await cuentasUser;
    }, Cases.getCuentaById(cuentaId));
    expect(data).toEqual(cuentaMockValue);
    expect(mockCuentasRepository.getCuentaById).toHaveBeenCalledWith(cuentaId);
});
