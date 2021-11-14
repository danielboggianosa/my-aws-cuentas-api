"use strict";

export interface IInMemoryDbClient {
  getAll<T>(collectionName: string): Promise<T[]>;
  getById<T>(collectionName: string, id: string): Promise<T>;
  insert<T>(collectionName: string, item: T): Promise<T>;
  update<T>(collectionName: string, id: string, item: T): Promise<T>;
  delete<T>(collectionName: string, id: string): Promise<T>;
  createTable<T>(collectionName: string, schema: any): Promise<T>;
}

class InMemoryDbClient implements IInMemoryDbClient {
  data: { [key: string]: any[] };

  constructor() {
    this.data = {};
    console.log("InMemoryDbClient created");
  }

  getAll(tableName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (this.data[tableName]) {
        resolve(this.data[tableName]);
      } else {
        reject(new Error("Table not found"));
      }
    });
  }

  getById(tableName: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.data[tableName]) {
        const result = this.data[tableName].find((item: { id: any; }) => item.id === id);
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Item not found"));
        }
      } else {
        reject(new Error("Table not found"));
      }
    });
  }

  insert(tableName: string, item: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.data[tableName]) {
        const newItem = item;
        this.data[tableName].push(newItem);
        resolve(newItem);
      } else {
        reject(new Error("Table not found"));
      }
    });
  }

  update(tableName: string, id: string, item: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.data[tableName]) {
        const result = this.data[tableName].find((i: { id: any; }) => i.id === id);
        if (result) {
          const index = this.data[tableName].indexOf(result);
          this.data[tableName][index] = item;
          resolve(item);
        } else {
          reject(new Error("Item not found"));
        }
      } else {
        reject(new Error("Table not found"));
      }
    });
  }

  delete(tableName: string, id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.data[tableName]) {
        const result = this.data[tableName].find((i: { id: any; }) => i.id === id);
        if (result) {
          const index = this.data[tableName].indexOf(result);
          this.data[tableName].splice(index, 1);
          resolve(result);
        } else {
          reject(new Error("Item not found"));
        }
      } else {
        reject(new Error("Table not found"));
      }
    });
  }

  getTableNames() {
    return new Promise((resolve, reject) => {
      if (this.data) {
        resolve(Object.keys(this.data));
      } else {
        reject(new Error("Table not found"));
      }
    });
  }

  getTableSchema(tableName: string) {
    return new Promise((resolve, reject) => {
      if (this.data[tableName]) {
        resolve(this.data[tableName]);
      } else {
        reject(new Error("Table not found"));
      }
    });
  }

  createTable(tableName: string, schema: unknown): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      if (this.data[tableName]) {
        reject(new Error("Table already exists"));
      } else {
        this.data[tableName] = [];
        resolve();
      }
    });
  }

  dropTable(tableName: string) {
    return new Promise<void>((resolve, reject) => {
      if (this.data[tableName]) {
        delete this.data[tableName];
        resolve();
      } else {
        reject(new Error("Table not found"));
      }
    });
  }
}

export default new InMemoryDbClient();

