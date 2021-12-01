import { EmpresaModel } from "../models/empresaModel";

export default interface IEmpresaRepository {
    getEmpresasByUserId(userId: string): Promise<EmpresaModel[]>;
    getEmpresaById(empresaId: string): Promise<EmpresaModel>;
    createEmpresa(empresa: EmpresaModel): Promise<EmpresaModel>;
    updateEmpresa(empresa: EmpresaModel): Promise<EmpresaModel>;
    deleteEmpresa(empresaId: string): Promise<EmpresaModel>;
}