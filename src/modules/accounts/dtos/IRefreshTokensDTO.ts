export interface IRefreshTokensDTO {
    id?: string;
    idUsers: string;
    refreshToken: string;
    expireDate: Date;
}
