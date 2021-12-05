import { RegistroModel } from "../../domain/models/registroModel";
import ICuentasRepository from "../../domain/repositories/ICuentasRepository";
import IRegistroRepository from "../../domain/repositories/IRegistroRepository";
import { AppContext } from "../../infrastructure/config/AppContext";

export default class RegistroUseCases {
    registroRepository: IRegistroRepository;
    cuentaRespository: ICuentasRepository
    constructor(appContext: AppContext) {
        this.registroRepository = appContext.repositories.registroRepository;
        this.cuentaRespository = appContext.repositories.cuentasRepository;
    }

    async getAllByCuentaId(cuentaId: string): Promise<RegistroModel[]> {
        try {
            return await this.registroRepository.getAllByCuentaId(cuentaId);
        } catch (error: any) {
            throw new Error(error);
        }

    }

    async getById(registroId: string): Promise<RegistroModel> {
        try {
            return await this.registroRepository.getById(registroId);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async create(registro: RegistroModel): Promise<RegistroModel> {
        try {
            const result = await this.registroRepository.create(registro);
            const cuenta = await this.cuentaRespository.getCuentaById(registro.cuentaId);
            await this.cuentaRespository.updateCuenta(cuenta.cuentaId, { ...cuenta, saldo: cuenta.saldo + registro.monto });
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async update(registroId: string, registro: RegistroModel): Promise<RegistroModel> {

        try {
            return await this.registroRepository.update(registroId, registro);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async delete(registroId: string): Promise<boolean> {
        try {
            return await this.registroRepository.delete(registroId);
        } catch (error: any) {
            throw new Error(error);
        }
    }

}