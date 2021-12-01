import IEmpresaRepository from "../../domain/repositories/IEmpresaRepository";
import { AppContext } from "../../infrastructure/config/AppContext";

export default class EmpresaUseCases {
    empresaRepository: IEmpresaRepository;
    constructor(appContext: AppContext) {
        this.empresaRepository = appContext.repositories.empresaRepository;
    }

    async getEmpresasByUserId(userId: string) {
        try {
            return await this.empresaRepository.getEmpresasByUserId(userId);
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    async getEmpresaById(empresaId: string) {
        try {
            return await this.empresaRepository.getEmpresaById(empresaId);
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    async createEmpresa(empresa: any) {
        try {
            return await this.empresaRepository.createEmpresa(empresa);
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    async updateEmpresa(empresa: any) {
        try {
            return await this.empresaRepository.updateEmpresa(empresa);
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    async deleteEmpresa(empresaId: string) {
        try {
            return await this.empresaRepository.deleteEmpresa(empresaId);
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

}
