import { RegistroModel } from "../models/registroModel";

export default interface IRegistroRepository {
    getAllByCuentaId(cuentaId: string): Promise<RegistroModel[]>;
    getById(registroId: string): Promise<RegistroModel>;
    create(registro: RegistroModel): Promise<RegistroModel>;
    update(registroId: string, registro: RegistroModel): Promise<RegistroModel>;
    delete(registroId: string): Promise<boolean>;
}

