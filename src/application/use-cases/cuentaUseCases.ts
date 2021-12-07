import { CuentaModel } from "../../domain/models/cuentaModel";
import ICuentasRepository from "../../domain/repositories/ICuentasRepository";
import { EmpresaValidator } from "../../domain/validators/empresaValidator";
import { AppContext } from "../../infrastructure/config/AppContext";

export default class CuentaUseCases {
  cuentaRepository: ICuentasRepository;
  empresaValidator: EmpresaValidator;
  constructor({ repositories }: AppContext) {
    this.cuentaRepository = repositories.cuentasRepository;
    this.empresaValidator = new EmpresaValidator(repositories.empresaRepository);
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

  async createCuenta(userId: string, cuenta: CuentaModel) {
    try {
      await this.empresaValidator.validateById(userId, cuenta.empresaId);
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

  async getCuentasByUsuarioId(usuarioId: any) {
    try {
      return await this.cuentaRepository.getCuentasByUsuarioId(usuarioId);
    } catch (error: any) {
      throw new Error(error);
    }
  }
};
