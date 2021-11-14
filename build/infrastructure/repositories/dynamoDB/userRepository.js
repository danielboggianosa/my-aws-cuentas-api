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
var crypto_1 = require("crypto");
var USERS_TABLE = process.env.USERS_TABLE;
var UserRepository = /** @class */ (function () {
    function UserRepository(dynamoDbClient) {
        this.dynamoDbClient = dynamoDbClient;
    }
    UserRepository.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: USERS_TABLE,
                            AttributesToGet: ["userId", "email", "firstName", "lastName", "createdAt", "updatedAt"],
                            Limit: 50,
                        };
                        return [4 /*yield*/, this.dynamoDbClient.scan(params).promise()];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new Error("No se pudo encontrar la tabla " + USERS_TABLE);
                        }
                        return [2 /*return*/, result.Items];
                }
            });
        });
    };
    UserRepository.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var params, Item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: USERS_TABLE,
                            Key: { email: email },
                            AttributesToGet: ["userId", "email", "firstName", "lastName", "createdAt", "updatedAt"],
                        };
                        return [4 /*yield*/, this.dynamoDbClient.get(params).promise()];
                    case 1:
                        Item = (_a.sent()).Item;
                        if (!Item) {
                            throw new Error('No se pudo encontrar un usuario con el "email" provisto');
                        }
                        return [2 /*return*/, Item];
                }
            });
        });
    };
    UserRepository.prototype.getUserByUsername = function (username) {
        throw new Error('Method not implemented.');
    };
    UserRepository.prototype.getUserByUsernameOrEmail = function (usernameOrEmail) {
        throw new Error('Method not implemented.');
    };
    UserRepository.prototype.getUserByUsernameOrEmailAndPassword = function (usernameOrEmail, password) {
        throw new Error('Method not implemented.');
    };
    UserRepository.prototype.getUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var params, Item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: USERS_TABLE,
                            Key: { userId: userId },
                            AttributesToGet: ["userId", "email", "username", "firstName", "lastName", "createdAt", "updatedAt"],
                        };
                        return [4 /*yield*/, this.dynamoDbClient.get(params).promise()];
                    case 1:
                        Item = (_a.sent()).Item;
                        if (!Item) {
                            throw new Error('No se pudo encontrar un usuario con el "id" provisto');
                        }
                        return [2 /*return*/, Item];
                }
            });
        });
    };
    UserRepository.prototype.createUser = function (_a) {
        var email = _a.email, username = _a.username, firstName = _a.firstName, lastName = _a.lastName, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var userId, createdAt, params, Item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = crypto_1.randomUUID();
                        createdAt = new Date().toISOString();
                        params = {
                            TableName: USERS_TABLE,
                            Item: {
                                userId: userId,
                                email: email,
                                username: username,
                                firstName: firstName,
                                lastName: lastName,
                                password: password,
                                createdAt: createdAt,
                            },
                        };
                        return [4 /*yield*/, this.dynamoDbClient.put(params).promise()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getUserById(userId)];
                    case 2:
                        Item = _b.sent();
                        return [2 /*return*/, Item];
                }
            });
        });
    };
    UserRepository.prototype.updateUser = function (userId, _a) {
        var email = _a.email, username = _a.username, firstName = _a.firstName, lastName = _a.lastName;
        return __awaiter(this, void 0, void 0, function () {
            var params, Attributes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        params = {
                            TableName: USERS_TABLE,
                            Key: { userId: userId },
                            UpdateExpression: "set email = :email, username = :username, firstName = :firstName, lastName = :lastName",
                            ExpressionAttributeValues: {
                                ":email": email,
                                ":username": username,
                                ":firstName": firstName,
                                ":lastName": lastName,
                            },
                            ReturnValues: "ALL_NEW",
                        };
                        return [4 /*yield*/, this.dynamoDbClient.update(params).promise()];
                    case 1:
                        Attributes = (_b.sent()).Attributes;
                        if (!Attributes) {
                            throw new Error("No fue posible actualizar el usuario");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var params, Attributes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: USERS_TABLE,
                            Key: { userId: userId },
                        };
                        return [4 /*yield*/, this.dynamoDbClient.delete(params).promise()];
                    case 1:
                        Attributes = (_a.sent()).Attributes;
                        if (!Attributes) {
                            throw new Error("No fue posible eliminar el usuario");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserRepository;
}());
exports.default = UserRepository;
;
