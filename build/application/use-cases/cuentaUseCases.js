"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userValidator_1 = require("../../domain/validators/userValidator");
class CuentaUseCases {
    constructor(appContext) {
        this.cuentaRepository = appContext.repositories.cuentasRepository;
        this.userValidator = new userValidator_1.UserValidator(appContext.repositories.userRepository);
    }
    async getCuentaById(cuentaId) {
        try {
            return await this.cuentaRepository.getCuentaById(cuentaId);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getCuentas() {
        try {
            return await this.cuentaRepository.getCuentas();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async createCuenta(cuenta) {
        try {
            await this.userValidator.validateById(cuenta.userId);
            return await this.cuentaRepository.createCuenta(cuenta);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateCuenta(cuentaId, cuenta) {
        try {
            return await this.cuentaRepository.updateCuenta(cuentaId, cuenta);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteCuenta(cuentaId) {
        try {
            return await this.cuentaRepository.deleteCuenta(cuentaId);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getCuentasByUsuarioId(usuarioId) {
        try {
            return await this.cuentaRepository.getCuentasByUsuarioId(usuarioId);
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = CuentaUseCases;
;
