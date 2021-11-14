"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userRepository_1 = __importDefault(require("../repositories/dynamoDB/userRepository"));
var cuentasRepository_1 = __importDefault(require("../repositories/dynamoDB/cuentasRepository"));
var dynamoDbClient_1 = __importDefault(require("../repositories/dynamoDB/dynamoDbClient"));
var AppContext = /** @class */ (function () {
    function AppContext(dbClient) {
        this.userRepository = new userRepository_1.default(dbClient);
        this.cuentasRepository = new cuentasRepository_1.default(dbClient);
        this.repositories = {
            userRepository: this.userRepository,
            cuentasRepository: this.cuentasRepository
        };
    }
    ;
    return AppContext;
}());
var appContext = new AppContext(dynamoDbClient_1.default).repositories;
exports.default = appContext;
