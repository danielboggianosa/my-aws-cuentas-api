import { CuentaModel } from "../models/cuentaModel";

export default interface ICuentasRepository {
    getCuentas(): Promise<CuentaModel[]>;
    getCuentaById(cuentaId: string): Promise<CuentaModel>;
    createCuenta(cuenta: CuentaModel): Promise<CuentaModel>;
    updateCuenta(cuentaId:string, cuenta: CuentaModel): Promise<void>;
    deleteCuenta(cuentaId: string): Promise<void>;
    getCuentasByUsuarioId(userId: string): Promise<CuentaModel[]>;
}