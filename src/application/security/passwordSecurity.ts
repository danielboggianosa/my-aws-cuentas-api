import bcryptjs from 'bcryptjs';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 15;
export default class PasswordSecurity {
    constructor() { }
    async hashPassword(password: string): Promise<string> {
        const salt = await bcryptjs.genSaltSync(SALT_ROUNDS);
        return await bcryptjs.hashSync(password, salt);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        if (!password || !hash) return false;
        return await bcryptjs.compare(password, hash);
    }
}