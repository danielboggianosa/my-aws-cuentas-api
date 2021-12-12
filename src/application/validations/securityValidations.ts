import { statusCode, ValidationError } from "../../domain/validators/validationError";
import TokenSecurity from "../security/tokenSecurity";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../../domain/types/customTypes";

const tokenSecurity = new TokenSecurity();

export const tokenAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers.authorization?.split(" ")[1];
    if (!token) next(new ValidationError(statusCode.BAD_REQUEST, "Invalid token"));
    const isAuthenticated = await tokenSecurity.validate(token);
    if (isAuthenticated) {
        const { payload } = await tokenSecurity.getPayload(token);;
        Object.assign(req, { _user: payload });
        next();
    } else next(new ValidationError(statusCode.UNAUTHORIZED, "User is not authorized"));
}

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req._user && req._user.role === "admin") {
        next();
    } else next(new ValidationError(statusCode.UNAUTHORIZED, "User is not authorized"));
}