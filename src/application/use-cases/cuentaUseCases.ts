import { CuentaModel } from "../../domain/models/cuentaModel";
import ICuentasRepository from "../../domain/repositories/ICuentasRepository";
import { UserValidator } from "../../domain/validators/user-validator";

export default class CuentaUseCases {
  cuentaRepository: ICuentasRepository;
  userValidator: UserValidator;
  constructor(appContext: any) {
    this.cuentaRepository = appContext.default.cuentasRepository;
    this.userValidator = new UserValidator(appContext.default.userRepository);
  }

  async getCuentaById(cuentaId: string) {
    try {
      return await this.cuentaRepository.getCuentaById(cuentaId);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getCuentas() {
    try {
      return await this.cuentaRepository.getCuentas();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createCuenta(cuenta: CuentaModel) {
    try {
      await this.userValidator.validateUser(cuenta.userId);
      return await this.cuentaRepository.createCuenta(cuenta);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateCuenta(cuentaId: string, cuenta: CuentaModel) {
    try {
      return await this.cuentaRepository.updateCuenta(cuentaId, cuenta);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteCuenta(cuentaId: string) {
    try {
      return await this.cuentaRepository.deleteCuenta(cuentaId);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getCuentasByUsuario(usuarioId: any) {
    try {
      return await this.cuentaRepository.getCuentasByUsuarioId(usuarioId);
    } catch (error: any) {
      throw new Error(error);
    }
  }
};
