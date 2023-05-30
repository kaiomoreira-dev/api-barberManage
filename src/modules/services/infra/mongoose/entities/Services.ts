import { ObjectId } from "mongodb";
import { Schema, model, Document } from "mongoose";

export interface IServiceModel extends Document {
    idCompanys: ObjectId;
    description: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export const ServiceSchema = new Schema<IServiceModel>({
    idCompanys: { type: ObjectId, required: true },
    description: { type: String, required: false },
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model<IServiceModel>("Services", ServiceSchema);
