
import IEmpresaRepository from "../repositories/IEmpresaRepository";
import { ValidationError } from "./validationError";

export class EmpresaValidator {
    private empresaRepository: IEmpresaRepository;
    constructor(empresaRepository: IEmpresaRepository) {
        this.empresaRepository = empresaRepository;
    }
    async validateById(empresaId: string) {
        try {
            return await this.empresaRepository.getEmpresaById(empresaId);
        } catch (error: any) {
            throw new ValidationError(error.message);
        }
    }
}