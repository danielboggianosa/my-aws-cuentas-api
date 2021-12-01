import { CuentaModel } from "../../../../domain/models/cuentaModel";
import CuentasRepository from "../cuentasRepository";

let cuentaId: string = "cuenta-uuid";
const empresaId: string = "empresa-uuid";
const cuenta: CuentaModel = {
    cuentaId,
    empresaId,
    banco: "test-bank",
    descripcion: "test-description",
    mantenimiento: 0,
    moneda: "PEN",
    nombre: "test-cuenta",
    numero: "123456789",
    saldo: 10,
    tarjeta: "4444-1111-1111-1111",
    tipo: "test",
    titular: "test-titular",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date()
}
const version = 'v4'
const stage = 'dev'

describe("CuentasRepository", () => {
    const CUENTAS_TABLE = `cuentas-table-${version}-${stage}`;
    const cuentasRepository = new CuentasRepository(CUENTAS_TABLE);

    beforeAll(async () => {
        cuentaId = (await cuentasRepository.createCuenta(cuenta)).cuentaId;
    })

    afterAll(async () => {
        cuentasRepository.deleteCuenta(cuentaId);
    })

    test('When getCuentas is called, then cuentas should be returned', () => {
        const cuentas = cuentasRepository.getCuentas();
        expect(cuentas).toBeDefined();
    })

    test('Given a valid cuenta id, then the cuenta is returned', () => {
        const cuenta = cuentasRepository.getCuentaById(cuentaId);
        expect(cuenta).toBeDefined();
    })

});