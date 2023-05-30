/* eslint-disable import/no-extraneous-dependencies */
import { IRefreshTokensDTO } from "@modules/accounts/dtos/IRefreshTokensDTO";
import { IRefreshTokensRepository } from "@modules/accounts/repositories/IRefreshTokensRepository";
import { Model } from "mongoose";
import { injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import RefreshTokens, { IRefreshTokensModel } from "../entities/RefreshTokens";

@injectable()
export class RefreshTokensRepository implements IRefreshTokensRepository {
    private repository: Model<IRefreshTokensModel>;

    constructor() {
        this.repository = RefreshTokens;
    }
    async create({
        idUsers,
        refreshToken,
        expireDate,
    }: IRefreshTokensDTO): Promise<IRefreshTokensModel> {
        try {
            const createRefreshToken = await this.repository.create({
                idUsers,
                refreshToken,
                expireDate,
            });

            return createRefreshToken;
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error creating refresh tokens");
        }
    }
    async findRefreshTokenByUserIdAndRefreshToken(
        idUsers: string,
        refreshToken: string
    ): Promise<IRefreshTokensModel> {
        try {
            return this.repository.findOne({
                idUsers,
                refreshToken,
            });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error finding refresh tokens");
        }
    }
    async deleteById(id: string): Promise<void> {
        try {
            await this.repository.findByIdAndDelete(id);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error deleting refresh tokens");
        }
    }
}
