"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryDbClient {
    constructor() {
        this.data = {};
        console.log("InMemoryDbClient created");
    }
    getAll(tableName) {
        return new Promise((resolve, reject) => {
            if (this.data[tableName]) {
                resolve(this.data[tableName]);
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    }
    getById(tableName, id) {
        return new Promise((resolve, reject) => {
            if (this.data[tableName]) {
                const result = this.data[tableName].find((item) => item.id === id);
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
    }
    insert(tableName, item) {
        return new Promise((resolve, reject) => {
            if (this.data[tableName]) {
                const newItem = item;
                this.data[tableName].push(newItem);
                resolve(newItem);
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    }
    update(tableName, id, item) {
        return new Promise((resolve, reject) => {
            if (this.data[tableName]) {
                const result = this.data[tableName].find((i) => i.id === id);
                if (result) {
                    const index = this.data[tableName].indexOf(result);
                    this.data[tableName][index] = item;
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
    }
    delete(tableName, id) {
        return new Promise((resolve, reject) => {
            if (this.data[tableName]) {
                const result = this.data[tableName].find((i) => i.id === id);
                if (result) {
                    const index = this.data[tableName].indexOf(result);
                    this.data[tableName].splice(index, 1);
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
    }
    getTableNames() {
        return new Promise((resolve, reject) => {
            if (this.data) {
                resolve(Object.keys(this.data));
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    }
    getTableSchema(tableName) {
        return new Promise((resolve, reject) => {
            if (this.data[tableName]) {
                resolve(this.data[tableName]);
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    }
    createTable(tableName, schema) {
        return new Promise((resolve, reject) => {
            if (this.data[tableName]) {
                reject(new Error("Table already exists"));
            }
            else {
                this.data[tableName] = [];
                resolve();
            }
        });
    }
    dropTable(tableName) {
        return new Promise((resolve, reject) => {
            if (this.data[tableName]) {
                delete this.data[tableName];
                resolve();
            }
            else {
                reject(new Error("Table not found"));
            }
        });
    }
}
exports.default = new InMemoryDbClient();
