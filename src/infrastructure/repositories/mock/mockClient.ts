export interface IMockClient {
    getAll<T>(collectionName: string): Promise<T[]>;
    getById<T>(collectionName: string, id: string): Promise<T>;
    insert<T>(collectionName: string, item: T): Promise<T>;
    update<T>(collectionName: string, id: string, item: T): Promise<T>;
    delete<T>(collectionName: string, id: string): Promise<T>;
    createTable<T>(collectionName: string, schema: any): Promise<T>;
}

class MockClient implements IMockClient {
    data: { [key: string]: any[] };

    constructor() {
        this.data = {};
        console.log("MockClient created");
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
                const result = this.data[tableName].find((item: { id: any; }) => item.id === id);
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

    delete(tableName: string, id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.data[tableName]) {
                const result = this.data[tableName].find((item: { id: any; }) => item.id === id);
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

    createTable(tableName: string, schema: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.data[tableName]) {
                reject(new Error("Table already exists"));
            } else {
                this.data[tableName] = [];
                resolve({});
            }
        });
    }

    getData(): any {
        return this.data;
    }

    setData(data: any): void {
        this.data = data;
    }

    clearData(): void {
        this.data = {};
    }

    getTable(tableName: string): any[] {
        return this.data[tableName];
    }

    setTable(tableName: string, data: any[]): void {
        this.data[tableName] = data;
    }

    clearTable(tableName: string): void {
        this.data[tableName] = [];
    }
}

export default new MockClient();

