import { PaymentMethod } from "@modules/servicesExcuteds/dtos/ICreateServiceExecutedDTO";
import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

export interface IServiceExecutedModel extends Document {
    _id: ObjectId;
    idClients: ObjectId;
    idServices: ObjectId[];
    idCompanys: ObjectId;
    isLogged: ObjectId;
    idUsers: ObjectId;
    value: number;
    paymentMethod: string;
    paymentDate: Date;
    serviceDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export const ServiceExecutedSchema = new Schema<IServiceExecutedModel>({
    _id: {
        type: ObjectId,
        required: true,
        auto: true,
    },
    idClients: { type: ObjectId, required: true },
    idServices: { type: [ObjectId], required: true },
    idCompanys: { type: ObjectId, required: true },
    idUsers: { type: ObjectId, required: true },
    value: { type: Number, required: true },
    paymentMethod: {
        type: String,
        enum: Object.values(PaymentMethod),
        required: true,
    },
    isLogged: { type: ObjectId, required: true },
    paymentDate: { type: Date, required: true },
    serviceDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model<IServiceExecutedModel>(
    "ServicesExecuteds",
    ServiceExecutedSchema
);
