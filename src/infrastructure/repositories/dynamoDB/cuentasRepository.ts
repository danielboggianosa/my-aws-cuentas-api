import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { randomId } from '../../utils/Utils';
import { CuentaModel } from '../../../domain/models/cuentaModel';
import ICuentasRepository from '../../../domain/repositories/ICuentasRepository';
import dynamoDbClient from './dynamoDbClient';

const CUENTAS_TABLE = process.env.CUENTAS_TABLE!;

export default class CuentasRepository implements ICuentasRepository {
  private dynamoDbClient: DocumentClient;

  constructor(private tableName: string = CUENTAS_TABLE) {
    this.dynamoDbClient = dynamoDbClient;
  }

  async getCuentas(): Promise<CuentaModel[]> {
    const params: DocumentClient.ScanInput = {
      TableName: this.tableName,
      AttributesToGet: ['cuentaId', 'userId', 'banco', 'descripcion', 'mantenimiento', 'moneda', 'nombre', 'numero', 'saldo', 'tarjeta', 'tipo', 'titular'],
      Limit: 50,
    };
    const result = await this.dynamoDbClient.scan(params).promise();
    if (!result) {
      throw new Error(`Tabla con nombre ${this.tableName} no encontrada`);
    }
    return result.Items as CuentaModel[];
  }

  async getCuentasByUsuarioId(userId: string): Promise<CuentaModel[]> {
    const params: DocumentClient.QueryInput = {
      TableName: this.tableName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };
    const result = await this.dynamoDbClient.query(params).promise();
    if (!result) {
      throw new Error(`Tabla con nombre ${this.tableName} no encontrada`);
    }
    return result.Items as CuentaModel[];
  }

  async getCuentaById(cuentaId: string): Promise<CuentaModel> {
    const params: DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: { cuentaId },
    };

    const { Item } = await this.dynamoDbClient.get(params).promise();
    if (!Item) {
      throw new Error(`Cuenta con id ${cuentaId} no encontrada`);
    }
    return Item as CuentaModel;
  }

  async createCuenta({
    empresaId,
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
  }: CuentaModel): Promise<CuentaModel> {
    const cuentaId = randomId();
    const params = {
      TableName: this.tableName,
      Item: {
        cuentaId,
        empresaId,
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
    return Item as CuentaModel;
  }

  async updateCuenta(cuentaId: string, {
    empresaId,
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
  }: CuentaModel): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { cuentaId },
      UpdateExpression:
        "set empresaId = :empresaId, banco = :banco, descripcion = :descripcion, mantenimiento = :mantenimiento, moneda = :moneda, nombre = :nombre, numero = :numero, saldo = :saldo, tarjeta = :tarjeta, tipo = :tipo, titular = :titular",
      ExpressionAttributeValues: {
        ":empresaId": empresaId,
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

  async deleteCuenta(cuentaId: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { cuentaId },
    };

    const Item = await this.dynamoDbClient.delete(params).promise();
    if (!Item) {
      throw new Error(`Error al eliminar la cuenta`);
    }
    return;
  }
};