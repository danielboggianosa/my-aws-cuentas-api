"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContext = void 0;
const userRepository_1 = __importDefault(require("../repositories/dynamoDB/userRepository"));
const cuentasRepository_1 = __importDefault(require("../repositories/dynamoDB/cuentasRepository"));
const dynamoDbClient_1 = __importDefault(require("../repositories/dynamoDB/dynamoDbClient"));
class AppContext {
    constructor(dbClient) {
        this.userRepository = new userRepository_1.default(dbClient);
        this.cuentasRepository = new cuentasRepository_1.default(dbClient);
        this.repositories = {
            userRepository: this.userRepository,
            cuentasRepository: this.cuentasRepository
        };
    }
    ;
}
exports.AppContext = AppContext;
const appContext = new AppContext(dynamoDbClient_1.default).repositories;
exports.default = appContext;
