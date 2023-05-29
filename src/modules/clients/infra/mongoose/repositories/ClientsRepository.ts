import { ICreateClientDTO } from "@modules/clients/dtos/ICreateClientDTO";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";

import { AppError } from "@shared/errors/AppError";

import Clients, { IClientModel } from "../entities/Clients";

export class ClientsRepository implements IClientsRepository {
    private repository: Model<IClientModel>;

    constructor() {
        this.repository = Clients;
    }

    async create({
        idCompanys,
        name,
        address,
        phone,
        debit,
        num,
        esqd,
        pg,
    }: ICreateClientDTO): Promise<IClientModel> {
        try {
            const clients = await this.repository.create({
                idCompanys,
                name,
                address,
                phone,
                debit,
                num,
                esqd,
                pg,
            });

            return clients;
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error creating client");
        }
    }
    async list(): Promise<IClientModel[]> {
        try {
            return this.repository.find();
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error listing clients");
        }
    }
    async listByCompanyId(idCompanys: string): Promise<IClientModel[]> {
        try {
            return this.repository.find({
                idCompanys: new ObjectId(idCompanys),
            });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error listing clients");
        }
    }
    async findById(id: string): Promise<IClientModel> {
        try {
            return this.repository.findById(id);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error finding client");
        }
    }
    async findByCompanyId(idCompanys: string): Promise<IClientModel> {
        try {
            return this.repository.findOne({ idCompany: idCompanys });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error finding client");
        }
    }

    async findByName(name: string): Promise<IClientModel> {
        try {
            return this.repository.findOne({ name });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error finding client");
        }
    }

    async updatedById({
        id,
        name,
        address,
        esqd,
        debit,
        num,
        pg,
        phone,
    }: ICreateClientDTO): Promise<void> {
        try {
            await this.repository.findByIdAndUpdate(id, {
                name,
                address,
                esqd,
                debit,
                num,
                pg,
                phone,
            });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error updating client");
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.repository.findByIdAndDelete(id);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error deleting client");
        }
    }
}
