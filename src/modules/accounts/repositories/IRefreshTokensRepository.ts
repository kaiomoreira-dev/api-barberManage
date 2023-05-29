import { IRefreshTokensDTO } from "../dtos/IRefreshTokensDTO";
import { IRefreshTokensModel } from "../infra/mongoose/entities/RefreshTokens";

export interface IRefreshTokensRepository {
    create(data: IRefreshTokensDTO): Promise<IRefreshTokensModel>;
    findRefreshTokenByUserIdAndRefreshToken(
        idUsers: string,
        refreshToken: string
    ): Promise<IRefreshTokensModel>;
    deleteById(id: string): Promise<void>;
}
