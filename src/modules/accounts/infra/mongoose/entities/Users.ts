/* eslint-disable @typescript-eslint/naming-convention */
import { Schema, model, Document } from "mongoose";

export interface IUserModel extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    admin: boolean;
    employee: boolean;
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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model<IUserModel>("Users", UserSchema);
