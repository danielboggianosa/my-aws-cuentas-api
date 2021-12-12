import jwt from 'jsonwebtoken';
import { statusCode, ValidationError } from '../../domain/validators/validationError';

export default class TokenSecurity {
    constructor(
        private readonly secret: string = process.env.JWT_SECRET!,
        private readonly exp: string = process.env.JWT_EXPIRATION!
    ) { }

    async generate(data: any): Promise<string> {
        const token = await jwt.sign(data, this.secret, { expiresIn: this.exp });
        if (token) return token;
        else throw new ValidationError(statusCode.INTERNAL_SERVER_ERROR, "Token was not created");
    }

    async validate(token: string): Promise<any> {
        const isValid = await jwt.verify(token, this.secret, (err, result) => {
            if (err) return false;
            else return result;
        });
        return isValid;
    }

    async getPayload(token: string): Promise<any> {
        const payload = await jwt.decode(token, { complete: true });
        return payload;
    }
}