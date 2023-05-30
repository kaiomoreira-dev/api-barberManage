import { ICreateCostsDTO } from "@modules/costs/dtos/ICreateCostsDTO";
import { Model } from "mongoose";

import { AppError } from "@shared/errors/AppError";

import { ICostsRepository } from "../../repositories/ICostsRepository";
import Costs, { ICostModel } from "../entities/Cost";

export class CostsRepository implements ICostsRepository {
	private repository: Model<ICostModel>;

	constructor() {
		this.repository = Costs;
	}

	async create({ description, costDate, value, idCompanys }: ICreateCostsDTO): Promise<ICostModel> {
		try {
			const costs = await this.repository.create({
				description,
				value,
				costDate,
				idCompanys,
			});

			return costs;
		} catch (error) {
			console.log(error.message);
			throw new AppError("Error creating cost");
		}
	}

	async list(): Promise<ICostModel[]> {
		try {
			const costs = await this.repository.find();
			return costs;
		} catch (error) {
			console.log(error.message);
			throw new AppError("Error listing companys");
		}
	}

	async listByIdCompany(idCompanys: string): Promise<ICostModel[]> {
		try {
			const costs = await this.repository.find({ idCompanys });
			return costs;
		} catch (error) {
			console.log(error.message);
			throw new AppError("Error listing companys");
		}
	}

	async findById(id: string): Promise<ICostModel> {
		try {
			const costs = await this.repository.findById(id);
			return costs;
		} catch (error) {
			console.log(error.message);
			throw new AppError("Error listing companys");
		}
	}

	async updateById(data: ICostModel): Promise<void> {}

	async deleteById(id: string): Promise<void> {
		try {
			await this.repository.findByIdAndDelete(id);
		} catch (error) {
			console.log(error.message);
			throw new AppError("Error delete company");
		}
	}
}
