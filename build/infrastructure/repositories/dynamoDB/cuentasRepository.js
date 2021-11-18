"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../../utils/Utils");
const dynamoDbClient_1 = __importDefault(require("./dynamoDbClient"));
const CUENTAS_TABLE = process.env.CUENTAS_TABLE;
class CuentasRepository {
    constructor() {
        this.dynamoDbClient = dynamoDbClient_1.default;
    }
    async getCuentas() {
        const params = {
            TableName: CUENTAS_TABLE,
            AttributesToGet: ['cuentaId', 'userId', 'banco', 'descripcion', 'mantenimiento', 'moneda', 'nombre', 'numero', 'saldo', 'tarjeta', 'tipo', 'titular'],
            Limit: 50,
        };
        const result = await this.dynamoDbClient.scan(params).promise();
        if (!result) {
            throw new Error(`Tabla con nombre ${CUENTAS_TABLE} no encontrada`);
        }
        return result.Items;
    }
    async getCuentasByUsuarioId(userId) {
        const params = {
            TableName: CUENTAS_TABLE,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        };
        const result = await this.dynamoDbClient.query(params).promise();
        if (!result) {
            throw new Error(`Tabla con nombre ${CUENTAS_TABLE} no encontrada`);
        }
        return result.Items;
    }
    async getCuentaById(cuentaId) {
        const params = {
            TableName: CUENTAS_TABLE,
            Key: { cuentaId },
        };
        const { Item } = await this.dynamoDbClient.get(params).promise();
        if (!Item) {
            throw new Error(`Cuenta con id ${cuentaId} no encontrada`);
        }
        return Item;
    }
    async createCuenta({ userId, banco, descripcion, mantenimiento, moneda, nombre, numero, saldo, tarjeta, tipo, titular, }) {
        const cuentaId = (0, Utils_1.randomId)();
        const params = {
            TableName: CUENTAS_TABLE,
            Item: {
                cuentaId,
                userId,
                banco,
                descripcion,
                mantenimiento,
                moneda,
                nombre,
                numero,
                saldo,
                tarjeta,
                tipo,
                titular,
            }
        };
        await this.dynamoDbClient.put(params).promise();
        const Item = await this.getCuentaById(cuentaId);
        if (!Item) {
            throw new Error(`Error al crear la cuenta`);
        }
        return Item;
    }
    async updateCuenta(cuentaId, { userId, banco, descripcion, mantenimiento, moneda, nombre, numero, saldo, tarjeta, tipo, titular, }) {
        const params = {
            TableName: CUENTAS_TABLE,
            Key: { cuentaId },
            UpdateExpression: "set userId = :userId, banco = :banco, descripcion = :descripcion, mantenimiento = :mantenimiento, moneda = :moneda, nombre = :nombre, numero = :numero, saldo = :saldo, tarjeta = :tarjeta, tipo = :tipo, titular = :titular",
            ExpressionAttributeValues: {
                ":userId": userId,
                ":banco": banco,
                ":descripcion": descripcion,
                ":mantenimiento": mantenimiento,
                ":moneda": moneda,
                ":nombre": nombre,
                ":numero": numero,
                ":saldo": saldo,
                ":tarjeta": tarjeta,
                ":tipo": tipo,
                ":titular": titular,
            },
            ReturnValues: "NONE",
        };
        const Item = await this.dynamoDbClient.update(params).promise();
        if (!Item) {
            throw new Error(`Error al actualizar la cuenta`);
        }
        return;
    }
    async deleteCuenta(cuentaId) {
        const params = {
            TableName: CUENTAS_TABLE,
            Key: { cuentaId },
        };
        const Item = await this.dynamoDbClient.delete(params).promise();
        if (!Item) {
            throw new Error(`Error al eliminar la cuenta`);
        }
        return;
    }
}
exports.default = CuentasRepository;
;
