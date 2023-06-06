import { ObjectId } from "mongodb";
import { Schema, model, Document } from "mongoose";

export interface ICompanyModel extends Document {
    idUsers: ObjectId[];
    name: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export const CompanySchema = new Schema<ICompanyModel>({
    idUsers: [{ type: ObjectId, ref: "Users", required: true }],
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model<ICompanyModel>("Companys", CompanySchema);
