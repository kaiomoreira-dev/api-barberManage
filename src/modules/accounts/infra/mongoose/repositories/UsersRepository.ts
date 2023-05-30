/* eslint-disable import/no-extraneous-dependencies */
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Model } from "mongoose";
import { injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import Users, { IUserModel } from "../entities/Users";

@injectable()
export class UsersRepository implements IUsersRepository {
    private repository: Model<IUserModel>;

    constructor() {
        this.repository = Users;
    }
    async list(): Promise<IUserModel[]> {
        try {
            return await this.repository.find();
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error finding user");
        }
    }
    async create({
        name,
        email,
        password,
        address,
        phone,
        idCompanys,
    }: ICreateUsersDTO): Promise<IUserModel> {
        try {
            const user = await this.repository.create({
                name,
                email,
                password,
                address,
                phone,
                idCompanys,
            });

            return user;
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error creating user");
        }
    }

    async findById(id: string): Promise<IUserModel> {
        try {
            return this.repository.findById(id);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error find user");
        }
    }

    async findByEmail(email: string): Promise<IUserModel> {
        try {
            return this.repository.findOne({ email });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error find user");
        }
    }

    async ListByCompanyId(idCompanys: string): Promise<IUserModel[]> {
        try {
            return this.repository.find({
                companiesId: idCompanys,
            });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error find company");
        }
    }

    async updateById({
        id,
        name,
        address,
        email,
        password,
        phone,
        idCompanys,
    }: ICreateUsersDTO): Promise<void> {
        try {
            await this.repository.findByIdAndUpdate(id, {
                name,
                address,
                email,
                password,
                phone,
                $push: { idCompanys },
            });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error updating user");
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.repository.findByIdAndDelete(id);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error deleting user");
        }
    }
}
