import { RegistroModel } from "../models/registroModel";

export interface IRegistroRepository {
    getAllByCuentaId(cuentaId: string): Promise<RegistroModel[]>;
    getById(registroId: string): Promise<RegistroModel>;
    create(registro: RegistroModel): Promise<RegistroModel>;
    update(registro: RegistroModel): Promise<RegistroModel>;
    delete(registroId: string): Promise<RegistroModel>;
}

