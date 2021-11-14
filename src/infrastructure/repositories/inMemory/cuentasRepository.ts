"use strict";

import { CuentaModel } from "../../../domain/models/cuentaModel";
import ICuentasRepository from "../../../domain/repositories/ICuentasRepository";
import { IInMemoryDbClient } from "./inMemoryDbClient";

const CUENTAS_TABLE = "cuentas";

export default class CuentasRepository implements ICuentasRepository {
  db: IInMemoryDbClient;
  constructor(db: any) {
    this.db = db;
    this.db.createTable(CUENTAS_TABLE, {
      id: { type: "integer primary key", autoincrement: true },
      nombre: { type: "text" },
      saldo: { type: "real" },
      fechaCreacion: { type: "text" },
      fechaModificacion: { type: "text" },
    });
  }
  getCuentasByUsuarioId(userId: string): Promise<CuentaModel[]> {
    throw new Error("Method not implemented.");
  }

  async getCuentaById(id: string): Promise<CuentaModel> {
    return await this.db.getById(CUENTAS_TABLE, id);
  }

  async getCuentas(): Promise<CuentaModel[]> {
    return await this.db.getAll(CUENTAS_TABLE);
  }

  async createCuenta(cuenta: CuentaModel): Promise<CuentaModel> {
    return await this.db.insert(CUENTAS_TABLE, cuenta);
  }

  async updateCuenta(id: string, cuenta: CuentaModel): Promise<void> {
    await this.db.update(CUENTAS_TABLE, id, cuenta);
    return;
  }

  async deleteCuenta(id: string): Promise<void> {
    return await this.db.delete(CUENTAS_TABLE, id);
  }
};
