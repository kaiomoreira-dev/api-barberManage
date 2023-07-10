"use strict";

var _redisClient = require("../../../../config/redisClient");
require("dotenv/config");
var _faker = require("@faker-js/faker");
var _RefreshTokensRepositoryInMemory = require("../../repositories/in-memory/RefreshTokensRepositoryInMemory");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _AppError = require("../../../../shared/errors/AppError");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

let usersRepositoryInMemory;
let createUserUseCase;
let authenticateUserUseCase;
let dayjsDateProvider;
let refreshTokensRepositoryInMemory;
describe("Authenticate User UseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    refreshTokensRepositoryInMemory = new _RefreshTokensRepositoryInMemory.RefreshTokensRepositoryInMemory();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, refreshTokensRepositoryInMemory, dayjsDateProvider);
  });
  afterAll(() => {
    _redisClient.redisClient.quit();
  });
  it("should be able to authenticate user", async () => {
    const user = {
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.datatype.string(8),
      address: _faker.faker.address.streetAddress()
    };

    // Create a user
    await createUserUseCase.execute(user);

    // Authenticate a user
    const authenticateUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(authenticateUser).toHaveProperty("token");
  });
  it("should be able to authenticate user with email wrong", async () => {
    const user = {
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.datatype.string(8),
      address: _faker.faker.address.streetAddress()
    };

    // Create a user
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: "fake@email.com",
      password: user.password
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect", 401));
  });
  it("should be able to authenticate user with email toEqual null", async () => {
    const user = {
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.datatype.string(8),
      address: _faker.faker.address.streetAddress()
    };

    // Create a user
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: null,
      password: user.password
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect", 401));
  });
  it("should be able to authenticate user with password wrong", async () => {
    const user = {
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.datatype.string(8),
      address: _faker.faker.address.streetAddress()
    };

    // Create a user
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "$2b$08$hR1yxPMop6J2/i82m2iR7./RaUx5cVqAJGoitw4oYM0bUfj89DCfa"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect", 401));
  });
  it("should be able to authenticate user with password toEqual null", async () => {
    const user = {
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.datatype.string(8),
      address: _faker.faker.address.streetAddress()
    };

    // Create a user
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: null
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect", 401));
  });
});