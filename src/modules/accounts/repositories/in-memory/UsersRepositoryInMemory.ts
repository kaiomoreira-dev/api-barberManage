/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import Users, {
    IUserModel,
} from "@modules/accounts/infra/mongoose/entities/Users";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
    repository: IUserModel[] = [];

    async findById(id: string): Promise<IUserModel> {
        return this.repository.find((user) => user.id === id);
    }
    async create({
        name,
        email,
        password,
        address,
    }: ICreateUserDTO): Promise<IUserModel> {
        const user = new Users();

        const generateID = faker.datatype.uuid();

        Object.assign(user, {
            id: generateID,
            name,
            email,
            password,
            address,
        });
        this.repository.push(user);

        return user;
    }
    async list(): Promise<IUserModel[]> {
        return this.repository;
    }
    async findByEmail(email: string): Promise<IUserModel> {
        return this.repository.find((user) => user.email === email);
    }

    async findByIdCompany(idCompanys: string): Promise<IUserModel> {
        throw new Error("Not implemented");
    }

    async updateById({
        id,
        name,
        address,
        email,
        password,
    }: ICreateUserDTO): Promise<void> {
        const userIndex = this.repository.findIndex((user) => user.id === id);
        this.repository[userIndex].name = name;
        this.repository[userIndex].email = email;
        this.repository[userIndex].password = password;
        this.repository[userIndex].address = address;
    }

    async deleteById(id: string): Promise<void> {
        const userIndex = this.repository.findIndex((user) => user.id === id);

        this.repository.splice(userIndex, 1);
    }
}
