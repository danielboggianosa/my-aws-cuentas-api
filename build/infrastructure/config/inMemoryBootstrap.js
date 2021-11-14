"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userRepository_1 = __importDefault(require("../repositories/inMemory/userRepository"));
var cuentasRepository_1 = __importDefault(require("../repositories/inMemory/cuentasRepository"));
var inMemoryDbClient_1 = __importDefault(require("../repositories/inMemory/inMemoryDbClient"));
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
var appContext = new AppContext(inMemoryDbClient_1.default).repositories;
exports.default = appContext;
