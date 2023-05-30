/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { faker } from "@faker-js/faker";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import "reflect-metadata";
import { CompanysRepositoryInMemory } from "@modules/companys/repositories/in-memory/CompanysRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";

import { CreateUserUseCase } from "./CreateUserUseCase";

let userRepositoryInMemory: UsersRepositoryInMemory;
let companysRepositoryInMemory: CompanysRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User UseCase", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UsersRepositoryInMemory();
        companysRepositoryInMemory = new CompanysRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(
            userRepositoryInMemory,
            companysRepositoryInMemory
        );
    });

    it("should be able to create user", async () => {
        const user: ICreateUsersDTO = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.datatype.string(8),
            phone: faker.phone.number(),
            address: faker.address.streetAddress(),
        };

        const createUser = await createUserUseCase.execute(user);

        expect(createUser).toHaveProperty("id");
    });

    it("should not be able to create user with leght name less than 3 characters or equall zero", async () => {
        const user: ICreateUsersDTO = {
            name: faker.datatype.string(3),
            email: faker.internet.email(),
            password: faker.datatype.string(8),
            phone: faker.phone.number(),
            address: faker.address.streetAddress(),
        };

        await expect(createUserUseCase.execute(user)).rejects.toEqual(
            new AppError("Name is not available", 401)
        );
    });

    it("should not be able to create user if email already exists ", async () => {
        const user1: ICreateUsersDTO = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.datatype.string(8),
            phone: faker.phone.number(),
            address: faker.address.streetAddress(),
        };

        await createUserUseCase.execute(user1);

        const user2: ICreateUsersDTO = {
            name: faker.name.fullName(),
            email: user1.email,
            password: faker.datatype.string(8),
            phone: faker.phone.number(),
            address: faker.address.streetAddress(),
        };

        await expect(createUserUseCase.execute(user2)).rejects.toEqual(
            new AppError("Email already exists", 401)
        );
    });

    it("should not be able to create user with password less than lenght 5 characters", async () => {
        const user: ICreateUsersDTO = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: faker.datatype.string(4),
            phone: faker.phone.number(),
            address: faker.address.streetAddress(),
        };

        await expect(createUserUseCase.execute(user)).rejects.toEqual(
            new AppError("Password low lenght", 401)
        );
    });

    it("should not be able to create a user without email field empty", async () => {
        const user: ICreateUsersDTO = {
            name: faker.datatype.string(4),
            email: "",
            password: faker.datatype.string(8),
            phone: faker.phone.number(),
            address: faker.address.streetAddress(),
        };

        await expect(createUserUseCase.execute(user)).rejects.toEqual(
            new AppError("Email not valid", 401)
        );
    });
});
