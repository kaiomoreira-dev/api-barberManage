/* eslint-disable import/no-extraneous-dependencies */
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Model, model } from "mongoose";
import { injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import Users, { IUserModel } from "../entities/Users";

@injectable()
export class UsersRepository implements IUsersRepository {
    private repository: Model<IUserModel>;

    constructor() {
        this.repository = Users;
    }

    async create({
        name,
        email,
        password,
        address,
    }: ICreateUserDTO): Promise<IUserModel> {
        try {
            const user = await this.repository.create({
                name,
                email,
                password,
                address,
            });

            return user;
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error creating user", 500);
        }
    }

    async findById(id: string): Promise<IUserModel> {
        try {
            return this.repository.findById(id);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error find user", 500);
        }
    }

    async findByEmail(email: string): Promise<IUserModel> {
        try {
            return this.repository.findOne({ email });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error find user", 500);
        }
    }

    async findByIdCompany(idCompanys: string): Promise<IUserModel> {
        try {
            return this.repository.findById(idCompanys);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error find company", 500);
        }
    }

    async updateById(
        id: string,
        name?: string,
        address?: string,
        email?: string,
        password?: string
    ): Promise<void> {
        try {
            await this.repository.findByIdAndUpdate(id, {
                name,
                address,
                email,
                password,
            });
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error updating user", 500);
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.repository.findByIdAndDelete(id);
        } catch (error) {
            console.log(error.message);
            throw new AppError("Error deleting user", 500);
        }
    }
}
