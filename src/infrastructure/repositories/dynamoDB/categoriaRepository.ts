import ICategoriaRepository from "../../../domain/repositories/ICategoriaRepository";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { CategoriaModel } from "../../../domain/models/categoriaModel";
import dynamoDbClient from "./dynamoDbClient";
import { randomId } from "../../utils/Utils";

const CATEGORIAS_TABLE = process.env.CATEGORIAS_TABLE!;

export default class CategoriaRepository implements ICategoriaRepository {
    private dynamoDbClient: DocumentClient;

    constructor(private tableName: string = CATEGORIAS_TABLE) {
        this.dynamoDbClient = dynamoDbClient;
    }

    async getAllByCuentaId(cuentaId: string): Promise<CategoriaModel[]> {
        const params: DocumentClient.ScanInput = {
            TableName: this.tableName,
            FilterExpression: 'cuentaId = :cuentaId',
            ExpressionAttributeValues: {
                ':cuentaId': cuentaId
            },
            Limit: 100,
        };
        return await this.dynamoDbClient.scan(params)
            .promise()
            .then(({ Items }) => Items as CategoriaModel[])
            .catch(err => { throw new Error(err) });
    }

    async getById(categoriaId: string): Promise<CategoriaModel> {
        const params: DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: {
                categoriaId
            }
        };
        return await this.dynamoDbClient.get(params).promise().then((result) => {
            if (!result) {
                throw new Error('No se pudo obtener la categoria');
            }
            return result.Item as CategoriaModel;
        });
    }
    async create(categoria: CategoriaModel): Promise<CategoriaModel> {
        const categoriaId = randomId();
        const Item = { ...categoria, categoriaId }
        const params: DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item
        };
        return await this.dynamoDbClient
            .put(params)
            .promise()
            .then(() => Item)
            .catch(err => { throw new Error(err) });
    }

    async update(categoriaId: string, categoria: CategoriaModel): Promise<CategoriaModel> {
        const params: DocumentClient.UpdateItemInput = {
            TableName: this.tableName,
            Key: { categoriaId },
            UpdateExpression: 'set nombre = :nombre, cuentaId = :cuentaId',
            ExpressionAttributeValues: {
                ':nombre': categoria.nombre,
                ':empresaId': categoria.empresaId
            },
            ReturnValues: 'ALL_NEW'
        }
        return await this.dynamoDbClient.update(params)
            .promise()
            .then(data => data.Attributes as CategoriaModel);
    }
    async delete(categoriaId: string): Promise<boolean> {
        const params: DocumentClient.DeleteItemInput = {
            TableName: this.tableName,
            Key: {
                categoriaId
            }
        };
        return await this.dynamoDbClient.delete(params).promise().then(() => {
            return true;
        });
    }
}
