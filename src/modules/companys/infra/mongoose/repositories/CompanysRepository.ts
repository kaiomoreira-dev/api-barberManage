/* eslint-disable no-return-await */
import { ICreateCompanysDTO } from "@modules/companys/dtos/ICreateCompanysDTO";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { Model } from "mongoose";
import { injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import Companys, { ICompanyModel } from "../entities/Companys";

@injectable()
export class CompanysRepository implements ICompanysRepository {
    private repository: Model<ICompanyModel>;

    constructor() {
        this.repository = Companys;
    }

    async findByName(name: string): Promise<ICompanyModel> {
        return await this.repository.findOne({ name });
    }
    async create({
        idUsers,
        name,
        address,
        phone,
    }: ICreateCompanysDTO): Promise<ICompanyModel> {
        try {
            const companys = await this.repository.create({
                idUsers,
                name,
                address,
                phone,
            });

            return companys;
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error creating company");
        }
    }
    async list(): Promise<ICompanyModel[]> {
        try {
            return this.repository.find();
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error listing companys");
        }
    }
    async listByUserId(idUsers: string): Promise<ICompanyModel[]> {
        try {
            return this.repository.find({ idUsers });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error listing companys");
        }
    }
    async findById(id: string): Promise<ICompanyModel> {
        try {
            return this.repository.findById(id);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error find company");
        }
    }
    async updateById({
        id,
        idUsers,
        name,
        address,
        phone,
    }: ICreateCompanysDTO): Promise<void> {
        try {
            await this.repository.findByIdAndUpdate(id, {
                idUsers,
                name,
                address,
                phone,
            });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error update company");
        }
    }
    async updateListUsersById(
        idCompanys: string,
        idUsers: string
    ): Promise<void> {
        try {
            await this.repository.findByIdAndUpdate(idCompanys, {
                $push: { idUsers },
            });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error update company");
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.repository.findByIdAndDelete(id);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error delete company");
        }
    }
}
