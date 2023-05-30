import { ObjectId } from "mongodb";
import { Schema, model, Document } from "mongoose";

export interface IRefreshTokensModel extends Document {
    idUsers: ObjectId;
    refreshToken: string;
    expireDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export const RefreshTokensSchema = new Schema<IRefreshTokensModel>({
    idUsers: { type: ObjectId, ref: "Users", required: true },
    refreshToken: { type: String, required: true },
    expireDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export default model<IRefreshTokensModel>("RefreshTokens", RefreshTokensSchema);
