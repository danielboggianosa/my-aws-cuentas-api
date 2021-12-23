export interface UserModel {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    imageUrl: string;
    role: string;
    empresaId?: string;
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}