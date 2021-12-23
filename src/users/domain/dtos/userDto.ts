export interface UserDto {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    role: string;
    empresaId?: string;
}