"use strict";

var _faker = require("@faker-js/faker");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
require("reflect-metadata");
var _CompanysRepositoryInMemory = require("../../../companys/repositories/in-memory/CompanysRepositoryInMemory");
var _AppError = require("../../../../shared/errors/AppError");
var _CreateUserUseCase = require("./CreateUserUseCase");
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

let userRepositoryInMemory;
let companysRepositoryInMemory;
let createUserUseCase;
describe("Create User UseCase", () => {
  beforeEach(() => {
    userRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    companysRepositoryInMemory = new _CompanysRepositoryInMemory.CompanysRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(userRepositoryInMemory, companysRepositoryInMemory);
  });
  it("should be able to create user", async () => {
    const user = {
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.datatype.string(8),
      phone: _faker.faker.phone.number(),
      address: _faker.faker.address.streetAddress()
    };
    const createUser = await createUserUseCase.execute(user);
    expect(createUser).toHaveProperty("id");
  });
  it("should not be able to create user with leght name less than 3 characters or equall zero", async () => {
    const user = {
      name: _faker.faker.datatype.string(3),
      email: _faker.faker.internet.email(),
      password: _faker.faker.datatype.string(8),
      phone: _faker.faker.phone.number(),
      address: _faker.faker.address.streetAddress()
    };
    await expect(createUserUseCase.execute(user)).rejects.toEqual(new _AppError.AppError("Name is not available", 401));
  });
  it("should not be able to create user if email already exists ", async () => {
    const user1 = {
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.datatype.string(8),
      phone: _faker.faker.phone.number(),
      address: _faker.faker.address.streetAddress()
    };
    await createUserUseCase.execute(user1);
    const user2 = {
      name: _faker.faker.name.fullName(),
      email: user1.email,
      password: _faker.faker.datatype.string(8),
      phone: _faker.faker.phone.number(),
      address: _faker.faker.address.streetAddress()
    };
    await expect(createUserUseCase.execute(user2)).rejects.toEqual(new _AppError.AppError("Email already exists", 401));
  });
  it("should not be able to create user with password less than lenght 5 characters", async () => {
    const user = {
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.datatype.string(4),
      phone: _faker.faker.phone.number(),
      address: _faker.faker.address.streetAddress()
    };
    await expect(createUserUseCase.execute(user)).rejects.toEqual(new _AppError.AppError("Password low lenght", 401));
  });
  it("should not be able to create a user without email field empty", async () => {
    const user = {
      name: _faker.faker.datatype.string(4),
      email: "",
      password: _faker.faker.datatype.string(8),
      phone: _faker.faker.phone.number(),
      address: _faker.faker.address.streetAddress()
    };
    await expect(createUserUseCase.execute(user)).rejects.toEqual(new _AppError.AppError("Email not valid", 401));
  });
});