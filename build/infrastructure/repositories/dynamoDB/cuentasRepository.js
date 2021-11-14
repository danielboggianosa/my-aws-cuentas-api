"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../../utils/Utils");
var CUENTAS_TABLE = process.env.CUENTAS_TABLE;
var CuentasRepository = /** @class */ (function () {
    function CuentasRepository(dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }
    CuentasRepository.prototype.getCuentas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: CUENTAS_TABLE,
                            AttributesToGet: ['cuentaId', 'userId', 'banco', 'descripcion', 'mantenimiento', 'moneda', 'nombre', 'numero', 'saldo', 'tarjeta', 'tipo', 'titular'],
                            Limit: 50,
                        };
                        return [4 /*yield*/, this.dynamoDbClient.scan(params).promise()];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new Error("Tabla con nombre " + CUENTAS_TABLE + " no encontrada");
                        }
                        return [2 /*return*/, result.Items];
                }
            });
        });
    };
    CuentasRepository.prototype.getCuentasByUsuarioId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: CUENTAS_TABLE,
                            KeyConditionExpression: 'userId = :userId',
                            ExpressionAttributeValues: {
                                ':userId': userId
                            }
                        };
                        return [4 /*yield*/, this.dynamoDbClient.query(params).promise()];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new Error("Tabla con nombre " + CUENTAS_TABLE + " no encontrada");
                        }
                        return [2 /*return*/, result.Items];
                }
            });
        });
    };
    CuentasRepository.prototype.getCuentaById = function (cuentaId) {
        return __awaiter(this, void 0, void 0, function () {
            var params, Item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: CUENTAS_TABLE,
                            Key: { cuentaId: cuentaId },
                        };
                        return [4 /*yield*/, this.dynamoDbClient.get(params).promise()];
                    case 1:
                        Item = (_a.sent()).Item;
                        if (!Item) {
                            throw new Error("Cuenta con id " + cuentaId + " no encontrada");
                        }
                        return [2 /*return*/, Item];
                }
            });
        });
    };
    CuentasRepository.prototype.createCuenta = function (_a) {
        var userId = _a.userId, banco = _a.banco, descripcion = _a.descripcion, mantenimiento = _a.mantenimiento, moneda = _a.moneda, nombre = _a.nombre, numero = _a.numero, saldo = _a.saldo, tarjeta = _a.tarjeta, tipo = _a.tipo, titular = _a.titular;
        return __awaiter(this, void 0, void 0, function () {
            var cuentaId, params, Item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cuentaId = Utils_1.randomId();
                        params = {
                            TableName: CUENTAS_TABLE,
                            Item: {
                                cuentaId: cuentaId,
                                userId: userId,
                                banco: banco,
                                descripcion: descripcion,
                                mantenimiento: mantenimiento,
                                moneda: moneda,
                                nombre: nombre,
                                numero: numero,
                                saldo: saldo,
                                tarjeta: tarjeta,
                                tipo: tipo,
                                titular: titular,
                            }
                        };
                        return [4 /*yield*/, this.dynamoDbClient.put(params).promise()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getCuentaById(cuentaId)];
                    case 2:
                        Item = _b.sent();
                        if (!Item) {
                            throw new Error("Error al crear la cuenta");
                        }
                        return [2 /*return*/, Item];
                }
            });
        });
    };
    CuentasRepository.prototype.updateCuenta = function (cuentaId, _a) {
        var userId = _a.userId, banco = _a.banco, descripcion = _a.descripcion, mantenimiento = _a.mantenimiento, moneda = _a.moneda, nombre = _a.nombre, numero = _a.numero, saldo = _a.saldo, tarjeta = _a.tarjeta, tipo = _a.tipo, titular = _a.titular;
        return __awaiter(this, void 0, void 0, function () {
            var params, Item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = {
                            TableName: CUENTAS_TABLE,
                            Key: { cuentaId: cuentaId },
                            UpdateExpression: "set userId = :userId, banco = :banco, descripcion = :descripcion, mantenimiento = :mantenimiento, moneda = :moneda, nombre = :nombre, numero = :numero, saldo = :saldo, tarjeta = :tarjeta, tipo = :tipo, titular = :titular",
                            ExpressionAttributeValues: {
                                ":userId": userId,
                                ":banco": banco,
                                ":descripcion": descripcion,
                                ":mantenimiento": mantenimiento,
                                ":moneda": moneda,
                                ":nombre": nombre,
                                ":numero": numero,
                                ":saldo": saldo,
                                ":tarjeta": tarjeta,
                                ":tipo": tipo,
                                ":titular": titular,
                            },
                            ReturnValues: "NONE",
                        };
                        return [4 /*yield*/, this.dynamoDbClient.update(params).promise()];
                    case 1:
                        Item = _b.sent();
                        if (!Item) {
                            throw new Error("Error al actualizar la cuenta");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CuentasRepository.prototype.deleteCuenta = function (cuentaId) {
        return __awaiter(this, void 0, void 0, function () {
            var params, Item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: CUENTAS_TABLE,
                            Key: { cuentaId: cuentaId },
                        };
                        return [4 /*yield*/, this.dynamoDbClient.delete(params).promise()];
                    case 1:
                        Item = _a.sent();
                        if (!Item) {
                            throw new Error("Error al eliminar la cuenta");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CuentasRepository;
}());
exports.default = CuentasRepository;
;
