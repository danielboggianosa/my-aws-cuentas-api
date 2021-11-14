import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const dynamoDbClientParams: DocumentClient.DocumentClientOptions & DynamoDB.Types.ClientConfiguration = {};
// if (process.env.IS_OFFLINE) {
//   console.log("Creating a local DynamoDB instance");
//   dynamoDbClientParams.region = "localhost";
//   dynamoDbClientParams.endpoint = "http://localhost:8800";
// }
export default new DynamoDB.DocumentClient(dynamoDbClientParams);