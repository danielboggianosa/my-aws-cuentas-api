import { EmpresaModel } from "../models/empresaModel";

export default interface IEmpresaRepository {
    getEmpresasByUserId(userId: string): Promise<EmpresaModel[]>;
    getEmpresaById(userId: string, empresaId: string): Promise<EmpresaModel>;
    createEmpresa(empresa: EmpresaModel): Promise<EmpresaModel>;
    updateEmpresa(empreasaId: string, empresa: EmpresaModel): Promise<EmpresaModel>;
    deleteEmpresa(empresaId: string): Promise<boolean>;
}