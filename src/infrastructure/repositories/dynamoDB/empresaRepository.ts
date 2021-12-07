import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { randomId } from '../../utils/Utils';
import { EmpresaModel } from '../../../domain/models/empresaModel';
import IEmpresaRepository from '../../../domain/repositories/IEmpresaRepository';
import dynamoDbClient from './dynamoDbClient';

const EMPRESAS_TABLE = process.env.EMPRESAS_TABLE!;

export default class EmpresaRepository implements IEmpresaRepository {
    private dynamoDbClient: DocumentClient;
    constructor(private tableName: string = EMPRESAS_TABLE) {
        this.dynamoDbClient = dynamoDbClient;
    }
    async getEmpresasByUserId(userId: string): Promise<EmpresaModel[]> {
        const params: DocumentClient.ScanInput = {
            TableName: this.tableName,
            FilterExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        };
        return await this.dynamoDbClient.scan(params)
            .promise()
            .then(({ Items }) => Items as EmpresaModel[])
            .catch(err => { throw new Error(err) });
    }

    async getEmpresaById(userId: string, empresaId: string): Promise<EmpresaModel> {
        const params: DocumentClient.ScanInput = {
            TableName: this.tableName,
            FilterExpression: 'empresaId = :empresaId and userId = :userId',
            ExpressionAttributeValues: {
                ':empresaId': empresaId,
                ':userId': userId
            }
        };

        return await this.dynamoDbClient.scan(params)
            .promise()
            .then(({ Items }) => Items ? Items[0] as EmpresaModel : {} as EmpresaModel)
            .catch(err => { throw new Error(err) });
    }

    async createEmpresa(empresa: EmpresaModel): Promise<EmpresaModel> {
        const Item = {
            ...empresa,
            empresaId: randomId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        const params: DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item
        };
        return await this.dynamoDbClient.put(params)
            .promise()
            .then(() => Item as unknown as EmpresaModel)
            .catch((err) => { throw new Error(err) });
    }

    async updateEmpresa(empresaId: string, empresa: EmpresaModel): Promise<EmpresaModel> {
        const {
            nombre,
            description,
            imageUrl,
            userId,
        } = empresa;
        const params = {
            TableName: this.tableName,
            Key: { empresaId },
            UpdateExpression: 'set nombre = :nombre, description = :description, imageUrl = :imageUrl, userId = :userId, updatedAt = :updatedAt',
            ExpressionAttributeValues: {
                ':nombre': nombre,
                ':description': description,
                ':imageUrl': imageUrl,
                ':userId': userId,
                ':updatedAt': new Date().toISOString()
            },
            ReturnValues: 'ALL_NEW'
        };
        return this.dynamoDbClient.update(params).promise()
            .then(({ Attributes }) => Attributes as EmpresaModel)
            .catch(err => { throw new Error(err) });
    }

    async deleteEmpresa(empresaId: string): Promise<boolean> {
        const params = {
            TableName: this.tableName,
            Key: { empresaId }
        };
        return await this.dynamoDbClient.delete(params).promise().then(() => { return true });
    }

}