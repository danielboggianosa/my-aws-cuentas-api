import { Request } from "express";

export type CustomRequest = Request & { _user: any };