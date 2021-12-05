import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { randomUUID } from 'crypto';
import { UserModel } from '../../../domain/models/userModel';
import IUserRepository from '../../../domain/repositories/IUserRepository';
import dynamoDbClient from './dynamoDbClient';

const USERS_TABLE = process.env.USERS_TABLE!;

export default class UserRepository implements IUserRepository {
  private dynamoDbClient: DocumentClient;
  constructor() {
    this.dynamoDbClient = dynamoDbClient;
  }
  async getUsers(): Promise<UserModel[]> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: USERS_TABLE,
      AttributesToGet: ["userId", "email", "firstName", "lastName", "createdAt", "updatedAt"],
      Limit: 50,
    };

    const result = await this.dynamoDbClient.scan(params).promise();
    if (!result) {
      throw new Error(`No se pudo encontrar la tabla ${USERS_TABLE}`);
    }
    return result.Items as UserModel[];
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: USERS_TABLE,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: { ":email": email },
      Limit: 1
    };

    return await this.dynamoDbClient.scan(params).promise().then((data: DynamoDB.DocumentClient.ScanOutput) => {
      if (!data.Items) {
        throw new Error('No se pudo encontrar un usuario con el "email" provisto');
      }
      return data.Items[0] as UserModel;
    });
  }

  getUserByUsername(username: string): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  getUserByUsernameOrEmail(usernameOrEmail: string): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }
  getUserByUsernameOrEmailAndPassword(usernameOrEmail: string, password: string): Promise<UserModel> {
    throw new Error('Method not implemented.');
  }

  async getUserById(userId: string): Promise<UserModel> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: USERS_TABLE,
      Key: { userId },
      AttributesToGet: ["userId", "email", "username", "firstName", "lastName", "createdAt", "updatedAt"],
    };

    const { Item } = await this.dynamoDbClient.get(params).promise();
    if (!Item) {
      throw new Error('No se pudo encontrar un usuario con el "id" provisto');
    }
    return Item as UserModel;
  }

  async createUser({ email, username, firstName, lastName, password }: UserModel): Promise<UserModel> {
    const userId = randomUUID();
    const createdAt = new Date().toISOString();
    const params: DocumentClient.PutItemInput = {
      TableName: USERS_TABLE,
      Item: {
        userId,
        email,
        username,
        firstName,
        lastName,
        password,
        createdAt,
      },
    };

    await this.dynamoDbClient.put(params).promise();
    const Item = await this.getUserById(userId);
    return Item as UserModel;
  }

  async updateUser(userId: string, { email, username, firstName, lastName }: UserModel): Promise<void> {
    const params = {
      TableName: USERS_TABLE,
      Key: { userId },
      UpdateExpression:
        "set email = :email, username = :username, firstName = :firstName, lastName = :lastName",
      ExpressionAttributeValues: {
        ":email": email,
        ":username": username,
        ":firstName": firstName,
        ":lastName": lastName,
      },
      ReturnValues: "ALL_NEW",
    };

    const { Attributes } = await this.dynamoDbClient.update(params).promise();
    if (!Attributes) {
      throw new Error("No fue posible actualizar el usuario");
    }
    return;
  }

  async deleteUser(userId: string): Promise<void> {
    const params = {
      TableName: USERS_TABLE,
      Key: { userId },
    };

    return await this.dynamoDbClient.delete(params).promise()
      .then(() => {
        return;
      })
      .catch((err) => { throw new Error(err); });
  }
};
