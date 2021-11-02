"use strict";

const AWS = require("aws-sdk");

const USERS_TABLE = process.env.USERS_TABLE;

module.exports = class UserRepository {
  constructor() {
    this.dynamoDbClient = new AWS.DynamoDB.DocumentClient();
  }

  async getUserById(id) {
    const params = {
      TableName: USERS_TABLE,
      Key: { id },
    };

    const { Item } = await this.dynamoDbClient.get(params).promise();
    if (!Item) {
      throw new Error('No se pudo encontrar un usuario con el "id" provisto');
    }
    return Item;
  }

  async createUser({ id, email, firstName, lastName }) {
    const params = {
      TableName: USERS_TABLE,
      Item: {
        id,
        firstName,
        lastName,
        email,
      },
    };

    const Item = await this.dynamoDbClient.put(params).promise();
    if (!Item) {
      throw new Error("No fue posible crear el usuario");
    }
    return Item;
  }

  async updateUser({ id, email, firstName, lastName }) {
    const params = {
      TableName: USERS_TABLE,
      Key: { id },
      UpdateExpression:
        "set email = :email, firstName = :firstName, lastName = :lastName",
      ExpressionAttributeValues: {
        ":email": email,
        ":firstName": firstName,
        ":lastName": lastName,
      },
      ReturnValues: "ALL_NEW",
    };

    const { Attributes } = await this.dynamoDbClient.update(params).promise();
    if (!Attributes) {
      throw new Error("No fue posible actualizar el usuario");
    }
    return Attributes;
  }

  async deleteUser(id) {
    const params = {
      TableName: USERS_TABLE,
      Key: { id },
    };

    const { Attributes } = await this.dynamoDbClient.delete(params).promise();
    if (!Attributes) {
      throw new Error("No fue posible eliminar el usuario");
    }
    return Attributes;
  }
};
