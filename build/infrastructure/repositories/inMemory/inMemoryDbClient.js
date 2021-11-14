"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InMemoryDbClient = /** @class */ (function () {
    function InMemoryDbClient() {
        this.data = {};
        console.log("InMemoryDbClient created");
    }
    InMemoryDbClient.prototype.getAll = function (tableName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.data[tableName]) {
                resolve(_this.data[tableName]);
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    };
    InMemoryDbClient.prototype.getById = function (tableName, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.data[tableName]) {
                var result = _this.data[tableName].find(function (item) { return item.id === id; });
                if (result) {
                    resolve(result);
                }
                else {
                    reject(new Error("Item not found"));
                }
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    };
    InMemoryDbClient.prototype.insert = function (tableName, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.data[tableName]) {
                var newItem = item;
                _this.data[tableName].push(newItem);
                resolve(newItem);
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    };
    InMemoryDbClient.prototype.update = function (tableName, id, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.data[tableName]) {
                var result = _this.data[tableName].find(function (i) { return i.id === id; });
                if (result) {
                    var index = _this.data[tableName].indexOf(result);
                    _this.data[tableName][index] = item;
                    resolve(item);
                }
                else {
                    reject(new Error("Item not found"));
                }
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    };
    InMemoryDbClient.prototype.delete = function (tableName, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.data[tableName]) {
                var result = _this.data[tableName].find(function (i) { return i.id === id; });
                if (result) {
                    var index = _this.data[tableName].indexOf(result);
                    _this.data[tableName].splice(index, 1);
                    resolve(result);
                }
                else {
                    reject(new Error("Item not found"));
                }
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    };
    InMemoryDbClient.prototype.getTableNames = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.data) {
                resolve(Object.keys(_this.data));
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    };
    InMemoryDbClient.prototype.getTableSchema = function (tableName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.data[tableName]) {
                resolve(_this.data[tableName]);
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    };
    InMemoryDbClient.prototype.createTable = function (tableName, schema) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.data[tableName]) {
                reject(new Error("Table already exists"));
            }
            else {
                _this.data[tableName] = [];
                resolve();
            }
        });
    };
    InMemoryDbClient.prototype.dropTable = function (tableName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.data[tableName]) {
                delete _this.data[tableName];
                resolve();
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    };
    return InMemoryDbClient;
}());
exports.default = new InMemoryDbClient();
