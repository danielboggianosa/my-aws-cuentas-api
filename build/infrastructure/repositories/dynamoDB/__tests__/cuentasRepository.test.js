"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cuentasRepository_1 = __importDefault(require("../cuentasRepository"));
describe("CuentasRepository", () => {
    const cuentasRepository = new cuentasRepository_1.default();
    test('When getCuentas is called, then cuentas should be returned', () => {
        const cuentas = cuentasRepository.getCuentas();
        expect(cuentas).toBeDefined();
    });
});
