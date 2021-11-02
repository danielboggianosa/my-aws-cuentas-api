"use strict";

module.exports = class CuentaUseCases {
  constructor(appContext) {
    this.appContext = appContext;
    this.cuentasRepository = appContext.cuentaRepository;
  }

  async getCuenta(cuentaId) {
    try {
      return await this.cuentasRepository.getCuenta(cuentaId);
    } catch {
      throw new Error(`No se pudo obtener la cuenta con id ${cuentaId}`);
    }
  }

  async getCuentas() {
    try {
      return await this.cuentasRepository.getCuentas();
    } catch {
      throw new Error(`No se pudo obtener las cuentas`);
    }
  }

  async createCuenta(cuenta) {
    try {
      return await this.cuentasRepository.createCuenta(cuenta);
    } catch {
      throw new Error(`No se pudo crear la cuenta`);
    }
  }

  async updateCuenta(cuentaId, cuenta) {
    try {
      return await this.cuentasRepository.updateCuenta(cuentaId, cuenta);
    } catch {
      throw new Error(`No se pudo actualizar la cuenta con id ${cuentaId}`);
    }
  }

  async deleteCuenta(cuentaId) {
    try {
      return await this.cuentasRepository.deleteCuenta(cuentaId);
    } catch {
      throw new Error(`No se pudo eliminar la cuenta con id ${cuentaId}`);
    }
  }

  async getCuentasByUsuario(usuarioId) {
    try {
      return await this.cuentasRepository.getCuentasByUsuario(usuarioId);
    } catch {
      throw new Error(
        `No se pudo obtener la cuenta del usuario con id ${usuarioId}`
      );
    }
  }
};
