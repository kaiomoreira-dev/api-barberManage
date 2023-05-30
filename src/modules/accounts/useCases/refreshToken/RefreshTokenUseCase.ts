import auth from "@config/auth";
import { IRefreshTokensRepository } from "@modules/accounts/repositories/IRefreshTokensRepository";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    refreshToken: string;
    token: string;
}

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject("RefreshTokensRepository")
        private refreshTokensRepository: IRefreshTokensRepository,
        @inject("DayjsDateProvider")
        private daysjsDateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { sub, email } = verify(
            token,
            auth.secretRefreshToken
        ) as IPayload;

        const idUsers = sub;

        const userToken =
            await this.refreshTokensRepository.findRefreshTokenByUserIdAndRefreshToken(
                idUsers,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh token not found", 404);
        }

        await this.refreshTokensRepository.deleteById(userToken.id);

        const refreshToken = sign({ email }, auth.secretRefreshToken, {
            subject: idUsers,
            expiresIn: auth.expireRefreshToken,
        });

        const expire_date_refresh_token = this.daysjsDateProvider.addDays(
            auth.daysRefreshToken
        );

        await this.refreshTokensRepository.create({
            idUsers,
            refreshToken,
            expireDate: expire_date_refresh_token,
        });

        const newToken = sign({}, auth.secretToken, {
            subject: idUsers,
            expiresIn: auth.expireInToken,
        });

        return {
            refreshToken,
            token: newToken,
        };
    }
}
