/* eslint-disable no-restricted-syntax */
import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/mongoose/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";

import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    idCompanys: ObjectId[];
    arr: number[];
}

export async function ensureAuthenticate(
    request: Request,
    response: Response,
    next: NextFunction
) {
    // destruturar do headers o toke
    const authHeader = request.headers.authorization;

    // validar no if pra ve se existe
    if (!authHeader) {
        throw new AppError("Miss token", 401);
    }
    // destruturar o token de dentro do authHeader
    const [, token] = authHeader.split(" ");
    // verificar no verify o token
    // retirar de dentro do verify o id do user que esta no token
    try {
        const userRepository = new UsersRepository();

        const { sub: idUsers } = verify(token, auth.secretToken) as IPayload;

        const user = await userRepository.findById(idUsers);

        if (!user) {
            throw new AppError("User not found", 401);
        }

        request.user = {
            id: idUsers,
        };
        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}
