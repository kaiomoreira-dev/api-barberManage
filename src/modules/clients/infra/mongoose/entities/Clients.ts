import { Esqd, Pg } from "@modules/clients/dtos/ICreateClientDTO";
import { ObjectId } from "mongodb";
import { Schema, model, Document } from "mongoose";

export interface IClientModel extends Document {
    idCompanys?: ObjectId;
    name?: string;
    phone?: string;
    address?: string;
    debit?: number;
    num?: number;
    pg: string;
    esqd: string;
    military: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export const ClientSchema = new Schema<IClientModel>({
    idCompanys: { type: ObjectId, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    debit: { type: Number, required: false, default: 0 },
    num: { type: Number, required: false },
    military: { type: Boolean, required: true, default: false },
    pg: { type: String, enum: Object.values(Pg), required: false },
    esqd: { type: String, enum: Object.values(Esqd), required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model<IClientModel>("Clients", ClientSchema);
