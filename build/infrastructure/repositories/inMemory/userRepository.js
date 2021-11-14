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
var randomId = require("../../utils/Utils").randomId;
var USERS_TABLE = "users";
var UserRepository = /** @class */ (function () {
    function UserRepository(db) {
        this.db = db;
        this.db.createTable(USERS_TABLE, {
            id: { type: "integer", primaryKey: true, autoIncrement: true },
            name: { type: "text" },
            email: { type: "text" },
            password: { type: "text" },
            createdAt: { type: "text" },
            updatedAt: { type: "text" },
        });
    }
    UserRepository.prototype.getUserByEmail = function (email) {
        throw new Error("Method not implemented.");
    };
    UserRepository.prototype.getUserByUsername = function (username) {
        throw new Error("Method not implemented.");
    };
    UserRepository.prototype.getUserByUsernameOrEmail = function (usernameOrEmail) {
        throw new Error("Method not implemented.");
    };
    UserRepository.prototype.getUserByUsernameOrEmailAndPassword = function (usernameOrEmail, password) {
        throw new Error("Method not implemented.");
    };
    UserRepository.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.db.getAll(USERS_TABLE)];
            });
        });
    };
    UserRepository.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.getById(USERS_TABLE, id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserRepository.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var firstName, lastName, email, username, password, createdAt, updatedAt, userId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstName = user.firstName, lastName = user.lastName, email = user.email, username = user.username, password = user.password, createdAt = user.createdAt, updatedAt = user.updatedAt;
                        userId = randomId();
                        return [4 /*yield*/, this.db.insert(USERS_TABLE, {
                                userId: userId,
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                password: password,
                                createdAt: createdAt,
                                updatedAt: updatedAt,
                                username: username,
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UserRepository.prototype.updateUser = function (userId, user) {
        return __awaiter(this, void 0, void 0, function () {
            var firstName, lastName, email, username, password, createdAt, updatedAt, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstName = user.firstName, lastName = user.lastName, email = user.email, username = user.username, password = user.password, createdAt = user.createdAt, updatedAt = user.updatedAt;
                        return [4 /*yield*/, this.db.update(USERS_TABLE, userId, {
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                password: password,
                                createdAt: createdAt,
                                updatedAt: updatedAt,
                                username: username,
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.delete(USERS_TABLE, userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserRepository;
}());
exports.default = UserRepository;
;
