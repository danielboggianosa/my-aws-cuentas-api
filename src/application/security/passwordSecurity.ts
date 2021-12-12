import crypto from 'crypto';

const salt = process.env.SALT!;
const iterations = Number(process.env.ITERATIONS);
export default class PasswordSecurity {
    constructor() { }
    async hashPassword(password: string): Promise<string> {
        const hash = await crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');
        return hash.toString('hex');
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        if (!password || !hash)
            return false;
        const hashVerify = await crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');
        return hashVerify.toString('hex') === hash;
    }
}