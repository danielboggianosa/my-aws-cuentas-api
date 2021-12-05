import IRegistroRepository from "../../../domain/repositories/IRegistroRepository";
import dynamoDbClient from "./dynamoDbClient";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { RegistroModel } from "../../../domain/models/registroModel";
import { randomId } from "../../utils/Utils";

const REGISTROS_TABLE = process.env.REGISTROS_TABLE!;

export default class RegistroRepository implements IRegistroRepository {
    private dynamoDbClient: DocumentClient;

    constructor(private tableName: string = REGISTROS_TABLE) {
        this.dynamoDbClient = dynamoDbClient
    }

    async getAllByCuentaId(cuentaId: string): Promise<RegistroModel[]> {
        const params: DocumentClient.ScanInput = {
            TableName: this.tableName,
            FilterExpression: 'cuentaId = :cuentaId',
            ExpressionAttributeValues: { ':cuentaId': cuentaId }
        };
        return await this.dynamoDbClient.scan(params).promise()
            .then(({ Items }) => Items as RegistroModel[])
            .catch(err => { throw new Error(err) });
    }

    async getById(registroId: string): Promise<RegistroModel> {
        const params = {
            TableName: this.tableName,
            Key: { registroId }
        };
        return await this.dynamoDbClient.get(params).promise()
            .then(({ Item }) => Item as RegistroModel)
            .catch(err => { throw new Error(err) });
    }

    async create(registro: RegistroModel): Promise<RegistroModel> {
        const Item = {
            ...registro,
            registroId: randomId(),
            createdAt: new Date().toISOString(),
            updatedAt: null
        }
        const params = {
            TableName: this.tableName,
            Item
        };
        return await this.dynamoDbClient.put(params)
            .promise()
            .then(() => Item as unknown as RegistroModel)
            .catch(err => { throw new Error("REPOSITORY" + err) });
    }

    async update(registroId: string, registro: RegistroModel): Promise<RegistroModel> {
        const params = {
            TableName: this.tableName,
            Key: { registroId },
            UpdateExpression: 'set #fecha = :fecha, #monto = :monto, #categoriaId = :categoriaId, #subcategoriaId = :subcategoriaId, #descripcion = :descripcion, #entidad = :entidad, #imagenUrl = :imagenUrl, #operacion = :operacion',
            ExpressionAttributeNames: {
                '#fecha': 'fecha',
                '#monto': 'monto',
                '#categoriaId': 'categoriaId',
                '#subcategoriaId': 'subcategoriaId',
                '#descripcion': 'descripcion',
                '#entidad': 'entidad',
                '#imagenUrl': 'imagenUrl',
                '#operacion': 'operacion'
            },
            ExpressionAttributeValues: {
                ':fecha': registro.fecha,
                ':monto': registro.monto,
                ':categoriaId': registro.categoriaId,
                ':subcategoriaId': registro.subcategoriaId,
                ':descripcion': registro.descripcion,
                ':entidad': registro.entidad,
                ':imagenUrl': registro.imagenUrl,
                ':operacion': registro.operacion
            },
            ReturnValues: 'ALL_NEW'
        };
        return await this.dynamoDbClient.update(params)
            .promise()
            .then(({ Attributes }) => Attributes as RegistroModel)
            .catch(err => { throw new Error(err) });
    }

    async delete(registroId: string): Promise<boolean> {
        const params = {
            TableName: this.tableName,
            Key: {
                registroId
            }
        };
        return await this.dynamoDbClient.delete(params)
            .promise()
            .then(() => true)
            .catch(err => { throw new Error(err) });
    }
}