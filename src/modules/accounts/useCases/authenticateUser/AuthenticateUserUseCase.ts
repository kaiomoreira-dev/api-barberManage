/* eslint-disable import-helpers/order-imports */
/* eslint-disable import/no-extraneous-dependencies */
import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { IRefreshTokensRepository } from "@modules/accounts/repositories/IRefreshTokensRepository";
import { ensureEmail } from "ensures/ensureEmail";
import { ensurePassword } from "ensures/ensurePassword";
import { ObjectId } from "mongodb";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        id: string;
        name: string;
        email: string;
        idCompanys: ObjectId[];
    };
    token: string;
    refreshToken: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("RefreshTokensRepository")
        private refreshTokensRepository: IRefreshTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: DayjsDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        if (!ensureEmail(email)) {
            throw new AppError("Email not valid", 401);
        }

        const userExists = await this.userRepository.findByEmail(email);

        if (!userExists) {
            throw new AppError("Email or password incorrect", 401);
        }

        if (ensurePassword(password)) {
            throw new AppError("Password low lenght", 401);
        }

        const checkPasswordIsValid = await compare(
            password,
            userExists.password
        );

        if (!checkPasswordIsValid) {
            throw new AppError("Email or password incorrect", 401);
        }

        const { name, id, email: userEmail } = userExists;

        const token = sign({ name, userEmail }, auth.secretToken, {
            subject: String(id),
            expiresIn: auth.expireInToken,
        });

        const refreshToken = sign({ userEmail }, auth.secretRefreshToken, {
            subject: String(id),
            expiresIn: auth.expireRefreshToken,
        });

        const expireDateFormat = this.dateProvider.addDays(
            auth.daysRefreshToken
        );

        await this.refreshTokensRepository.create({
            idUsers: id,
            refreshToken,
            expireDate: expireDateFormat,
        });
        const userInfo: IResponse = {
            user: {
                id,
                name,
                email,
                idCompanys: userExists.idCompanys,
            },
            token,
            refreshToken,
        };

        return userInfo;
    }
}
