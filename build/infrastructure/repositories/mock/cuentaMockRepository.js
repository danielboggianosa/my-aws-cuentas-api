"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CUENTAS_TABLE = "cuentasMock";
class CuentasMockRepository {
    constructor(db) {
        this.db = db;
        this.db.createTable(CUENTAS_TABLE, {
            id: { type: "integer primary key", autoincrement: true },
            nombre: { type: "text" },
            saldo: { type: "real" },
            fechaCreacion: { type: "text" },
            fechaModificacion: { type: "text" },
        });
    }
    getCuentasByUsuarioId(userId) {
        throw new Error("Method not implemented.");
    }
    async getCuentaById(id) {
        return await this.db.getById(CUENTAS_TABLE, id);
    }
    async getCuentas() {
        return await this.db.getAll(CUENTAS_TABLE);
    }
    async createCuenta(cuenta) {
        return await this.db.insert(CUENTAS_TABLE, cuenta);
    }
    async updateCuenta(id, cuenta) {
        await this.db.update(CUENTAS_TABLE, id, cuenta);
        return;
    }
    async deleteCuenta(id) {
        return await this.db.delete(CUENTAS_TABLE, id);
    }
}
exports.default = CuentasMockRepository;
;
