import { ICreateServiceExecutedDTO } from "@modules/servicesExcuted/dtos/ICreateServiceExecutedDTO";
import { IServiceExecutedRepository } from "@modules/servicesExcuted/repositories/IServiceExecutedRepository";
import mongoose, { Model } from "mongoose";

import { AppError } from "@shared/errors/AppError";

import ServiceExecuted, {
    IServiceExecutedModel,
} from "../entities/ServiceExecuted";

export class ServiceExecutedRepository implements IServiceExecutedRepository {
    private repository: Model<IServiceExecutedModel>;

    constructor() {
        this.repository = ServiceExecuted;
    }

    async create({
        idClients,
        idCompanys,
        idServices,
        idUsers,
        paymentDate,
        paymentMethod,
        serviceDate,
        value,
    }: ICreateServiceExecutedDTO): Promise<IServiceExecutedModel> {
        try {
            const servicesExcuted = this.repository.create({
                idClients,
                idCompanys,
                idServices,
                idUsers,
                paymentDate,
                paymentMethod,
                serviceDate,
                value,
            });
            return servicesExcuted;
        } catch (error) {
            console.log(error);
            throw new AppError("Error creating ServiceExcuted");
        }
    }
    async findById(id: string): Promise<IServiceExecutedModel> {
        try {
            return this.repository.findById(id);
        } catch (error) {
            console.log(error);
            throw new AppError("Error find ServiceExcuted");
        }
    }
    async listByCompanyId(
        idCompanys: string
    ): Promise<IServiceExecutedModel[]> {
        try {
            return this.repository.find({ idCompanys });
        } catch (error) {
            console.log(error);
            throw new AppError("Error list ServiceExcuted");
        }
    }
    async listByServiceId(
        idServices: string
    ): Promise<IServiceExecutedModel[]> {
        try {
            return this.repository.find({ idServices });
        } catch (error) {
            console.log(error);
            throw new AppError("Error list ServiceExcuted");
        }
    }
    async listByClientsId(idClients: string): Promise<IServiceExecutedModel[]> {
        try {
            return this.repository.find({ idClients });
        } catch (error) {
            console.log(error);
            throw new AppError("Error list ServiceExcuted");
        }
    }
    async listByUserId(idUsers: string): Promise<IServiceExecutedModel[]> {
        try {
            return this.repository.find({ idUsers });
        } catch (error) {
            console.log(error);
            throw new AppError("Error list ServiceExcuted");
        }
    }
    async updateById({
        id,
        idClients,
        idCompanys,
        idServices,
        idUsers,
        paymentDate,
        paymentMethod,
        serviceDate,
        value,
    }: ICreateServiceExecutedDTO): Promise<void> {
        try {
            return this.repository.findByIdAndUpdate(id, {
                idClients,
                idCompanys,
                idServices,
                idUsers,
                paymentDate,
                paymentMethod,
                serviceDate,
                value,
            });
        } catch (error) {
            console.log(error);
            throw new AppError("Error updated ServiceExcuted");
        }
    }
    async deleteById(id: string): Promise<void> {
        try {
            return this.repository.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
            throw new AppError("Error deleted ServiceExcuted");
        }
    }
}
