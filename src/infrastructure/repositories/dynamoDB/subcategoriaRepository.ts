import dynamoDbClient from "./dynamoDbClient";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import ISubcategoriaRepository from "../../../domain/repositories/ISubcategoriaRepository";
import { SubcategoriaModel } from "../../../domain/models/subcategoriaModel";
import { randomId } from "../../utils/Utils";

const SUBCATEGORIAS_TABLE = process.env.SUBCATEGORIAS_TABLE!;

export default class SubcategoriaRepository implements ISubcategoriaRepository {
    private dynamoDbClient: DocumentClient;

    constructor(private tableName: string = SUBCATEGORIAS_TABLE) {
        this.dynamoDbClient = dynamoDbClient
    }

    async getAllByCategoriaId(categoriaId: string): Promise<SubcategoriaModel[]> {
        const params: DocumentClient.QueryInput = {
            TableName: this.tableName,
            FilterExpression: 'categoriaId = :categoriaId',
            ExpressionAttributeValues: { ':categoriaId': categoriaId },
            Limit: 100,
        };
        return await this.dynamoDbClient.scan(params)
            .promise()
            .then(({ Items }) => Items as SubcategoriaModel[])
            .catch(err => { throw new Error(err) });
    }

    async getById(subcategoriaId: string): Promise<SubcategoriaModel> {
        const params: DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: {
                subcategoriaId
            }
        };
        return await this.dynamoDbClient.get(params).promise().then((data: DocumentClient.GetItemOutput) => {
            return data.Item as SubcategoriaModel;
        });
    }

    async create(subcategoria: SubcategoriaModel): Promise<SubcategoriaModel> {
        const subcategoriaId = randomId();
        const Item = { ...subcategoria, subcategoriaId }
        const params: DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item
        };
        return await this.dynamoDbClient.put(params)
            .promise()
            .then(() => Item as SubcategoriaModel)
            .catch(err => { throw new Error(err) });
    }

    async update(subcategoriaId: string, subcategoria: SubcategoriaModel): Promise<SubcategoriaModel> {
        const params: DocumentClient.UpdateItemInput = {
            TableName: this.tableName,
            Key: { subcategoriaId },
            ExpressionAttributeValues: {
                ':nombre': subcategoria.nombre,
                ':categoriaId': subcategoria.categoriaId
            },
            UpdateExpression: 'set nombre = :nombre, categoriaId = :categoriaId',
            ReturnValues: 'ALL_NEW'
        };
        return await this.dynamoDbClient.update(params)
            .promise()
            .then((data: DocumentClient.UpdateItemOutput) => data.Attributes as SubcategoriaModel)
            .catch(err => { throw new Error(err) });
    }

    async delete(subcategoriaId: string): Promise<boolean> {
        const params: DocumentClient.DeleteItemInput = {
            TableName: this.tableName,
            Key: {
                subcategoriaId
            }
        };
        return await this.dynamoDbClient.delete(params).promise().then((data: DocumentClient.DeleteItemOutput) => {
            return true;
        });
    }
}