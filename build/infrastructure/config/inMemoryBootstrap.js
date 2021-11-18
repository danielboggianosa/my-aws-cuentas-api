"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = __importDefault(require("../repositories/inMemory/userRepository"));
const cuentasRepository_1 = __importDefault(require("../repositories/inMemory/cuentasRepository"));
const inMemoryDbClient_1 = __importDefault(require("../repositories/inMemory/inMemoryDbClient"));
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
const appContext = new AppContext(inMemoryDbClient_1.default).repositories;
exports.default = appContext;
