import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { Model } from "mongoose";

import { AppError } from "@shared/errors/AppError";

import Services, { IServiceModel } from "../entities/Services";

export class ServicesRepository implements IServicesRepository {
    private repository: Model<IServiceModel>;

    constructor() {
        this.repository = Services;
    }

    async create({
        idCompanys,
        name,
        description,
        price,
    }: ICreateServiceDTO): Promise<IServiceModel> {
        try {
            const services = await this.repository.create({
                idCompanys,
                name,
                description,
                price,
            });

            return services;
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error creating service");
        }
    }

    async list(): Promise<IServiceModel[]> {
        try {
            return this.repository.find();
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error listing services");
        }
    }
    async findById(id: string): Promise<IServiceModel | boolean> {
        try {
            if (!id) {
                return true;
            }
            return this.repository.findById(id);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error finding service");
        }
    }
    async listByCompanyId(idCompanys: string): Promise<IServiceModel[]> {
        try {
            return this.repository.find({ idCompanys });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error finding company");
        }
    }

    async findServiceByNameAndByCompanyId(
        idCompanys: string,
        name: string
    ): Promise<IServiceModel> {
        try {
            return this.repository.findOne({ name, idCompanys });
        } catch (error) {
            console.error(error);
            throw new AppError("Error finding service");
        }
    }

    async updateById({
        id,
        description,
        name,
        price,
    }: ICreateServiceDTO): Promise<void> {
        try {
            await this.repository.findByIdAndUpdate(id, {
                description,
                name,
                price,
            });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error updating service");
        }
    }
    async deleteById(id: string): Promise<void> {
        try {
            await this.repository.findByIdAndDelete(id);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error deleting service");
        }
    }
}
