/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from "mongodb";
import { Schema, model, Document } from "mongoose";

export interface IUserModel extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    admin: boolean;
    employee: boolean;
    idCompanys: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

export const UserSchema = new Schema<IUserModel>({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    admin: { type: Boolean, default: false },
    employee: { type: Boolean, default: true },
    idCompanys: [{ type: ObjectId, ref: "Companys", required: false }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model<IUserModel>("Users", UserSchema);
