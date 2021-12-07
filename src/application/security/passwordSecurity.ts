import bcrypt from 'bcrypt';

export default class PasswordSecurity {
    constructor() { }
    hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
        return bcrypt.hashSync(password, salt);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        if (!password || !hash) return false;
        return await bcrypt.compare(password, hash);
    }
}