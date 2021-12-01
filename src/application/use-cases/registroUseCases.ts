import { RegistroModel } from "../../domain/models/registroModel";
import { IRegistroRepository } from "../../domain/repositories/IRegistroRepository";
import { AppContext } from "../../infrastructure/config/AppContext";

export default class RegistroUseCases {
    registroRepository: IRegistroRepository;
    constructor(appContext: AppContext) {
        this.registroRepository = appContext.repositories.registroRepository;
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
            return await this.registroRepository.create(registro);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async update(registro: RegistroModel): Promise<RegistroModel> {

        try {
            return await this.registroRepository.update(registro);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async delete(registroId: string): Promise<RegistroModel> {
        try {
            return await this.registroRepository.delete(registroId);
        } catch (error: any) {
            throw new Error(error);
        }
    }

}