
import IEmpresaRepository from "../repositories/IEmpresaRepository";
import { ValidationError } from "./validationError";

export class EmpresaValidator {
    private userRepository: IEmpresaRepository;
    constructor(userRepository: IEmpresaRepository) {
        this.userRepository = userRepository;
    }
    async validateById(empresaId: string) {
        try {
            return await this.userRepository.getEmpresaById(empresaId);
        } catch (error: any) {
            throw new ValidationError(error.message);
        }
    }
}