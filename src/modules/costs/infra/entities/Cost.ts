import { ObjectId } from 'mongodb';
import { Schema, model, Document } from 'mongoose';

export interface ICostModel extends Document {
	idCompanys: ObjectId;
	description: string;
	costDate: Date;
	value: number;
	createdAt: Date;
	updatedAt: Date;
}

export const CostSchema = new Schema<ICostModel>({
	idCompanys: { type: ObjectId, required: true },
	description: { type: String, required: true },
	costDate: { type: Date, default: Date.now },
	value: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export default model<ICostModel>('Costs', CostSchema);
