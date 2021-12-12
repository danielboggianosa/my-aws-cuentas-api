
import IEmpresaRepository from "../repositories/IEmpresaRepository";
import { statusCode, ValidationError } from "./validationError";

export class EmpresaValidator {
    private empresaRepository: IEmpresaRepository;
    constructor(empresaRepository: IEmpresaRepository) {
        this.empresaRepository = empresaRepository;
    }
    async validateById(userId: string, empresaId: string) {
        try {
            return await this.empresaRepository.getEmpresaById(userId, empresaId);
        } catch (error: any) {
            throw new ValidationError(statusCode.BAD_REQUEST, error.message);
        }
    }
}