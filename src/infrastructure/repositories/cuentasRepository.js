"use strict";

const AWS = require("aws-sdk");

const CUENTA_TABLE = process.env.CUENTA_TABLE;

module.exports = class CuentasRepository {
  constructor(dynamoDb) {
    this.dinamoDbClient = new AWS.DynamoDB.DocumentClient();
  }

  async getCuentasById(id) {
    const params = {
      TableName: CUENTA_TABLE,
      Key: { id },
    };

    const { Item } = await this.dinamoDbClient.get(params).promise();
    if (!Item) {
      throw new Error(`Cuenta con id ${id} no encontrada`);
    }
    return Item;
  }

  async createCuenta({
    id,
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
  }) {
    const params = {
      TableName: CUENTA_TABLE,
      Item: {
        id,
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
      },
    };

    const Item = await this.dinamoDbClient.put(params).promise();
    if (!Item) {
      throw new Error(`Error al crear la cuenta`);
    }
    return Item;
  }

  async updateCuenta({
    id,
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
  }) {
    const params = {
      TableName: CUENTA_TABLE,
      Key: { id },
      UpdateExpression:
        "set userId = :userId, banco = :banco, descripcion = :descripcion, mantenimiento = :mantenimiento, moneda = :moneda, nombre = :nombre, numero = :numero, saldo = :saldo, tarjeta = :tarjeta, tipo = :tipo, titular = :titular",
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
      ReturnValues: "ALL_NEW",
    };

    const Item = await this.dinamoDbClient.update(params).promise();
    if (!Item) {
      throw new Error(`Error al actualizar la cuenta`);
    }
    return Item;
  }

  async deleteCuenta(id) {
    const params = {
      TableName: CUENTA_TABLE,
      Key: { id },
    };

    const Item = await this.dinamoDbClient.delete(params).promise();
    if (!Item) {
      throw new Error(`Error al eliminar la cuenta`);
    }
    return Item;
  }
};
