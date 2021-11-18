"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const dynamoDbClientParams = {};
// if (process.env.IS_OFFLINE) {
//   console.log("Creating a local DynamoDB instance");
//   dynamoDbClientParams.region = "localhost";
//   dynamoDbClientParams.endpoint = "http://localhost:8800";
// }
exports.default = new aws_sdk_1.DynamoDB.DocumentClient(dynamoDbClientParams);
