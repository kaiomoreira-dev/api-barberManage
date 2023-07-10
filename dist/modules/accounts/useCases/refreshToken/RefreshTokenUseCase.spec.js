"use strict";

var _redisClient = require("../../../../config/redisClient");
var _faker = require("@faker-js/faker");
var _RefreshTokensRepositoryInMemory = require("../../repositories/in-memory/RefreshTokensRepositoryInMemory");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _AppError = require("../../../../shared/errors/AppError");
var _AuthenticateUserUseCase = require("../authenticateUser/AuthenticateUserUseCase");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _RefreshTokenUseCase = require("./RefreshTokenUseCase");
let dayjsDateProvider;
let refreshTokensRepositoryInMemory;
let createUserUseCase;
let authenticateUserUseCase;
let usersRepositoryInMemory;
let refreshTokenUseCase;
describe("Refresh token UseCase", () => {
  beforeEach(() => {
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    refreshTokensRepositoryInMemory = new _RefreshTokensRepositoryInMemory.RefreshTokensRepositoryInMemory();
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, refreshTokensRepositoryInMemory, dayjsDateProvider);
    refreshTokenUseCase = new _RefreshTokenUseCase.RefreshTokenUseCase(refreshTokensRepositoryInMemory, dayjsDateProvider);
  });
  afterAll(() => {
    _redisClient.redisClient.quit();
  });
  it("should create a refresh token using the refresh token provided", async () => {
    const user = {
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.datatype.string(8),
      address: _faker.faker.address.streetAddress()
    };

    // Create a user
    const createdUser = await createUserUseCase.execute(user);

    // Authenticate a user
    const authenticatedUser = await authenticateUserUseCase.execute({
      email: createdUser.email,
      password: user.password
    });
    //

    const updatedToken = await refreshTokenUseCase.execute(authenticatedUser.refresh_token);
    expect(updatedToken).toHaveProperty("refresh_token");
    expect(updatedToken).toHaveProperty("token");
  });
  it("should not be able to create a refresh token with refresh token invalid", async () => {
    const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJlbWFpbEB0ZXN0ZS5jb20iLCJpYXQiOjE2ODUwNjA2NTksImV4cCI6MTY4NTY2NTQ1OSwic3ViIjoiNjFkMGU1N2ItOTYxZC00ZDY5LTk5MTAtZjZlMGUxNTI0YzcyIn0.thUukeDwSnKkEUuO-WaD2SH4gwqhy0s4_B0rLlEIbro";
    await expect(refreshTokenUseCase.execute(fakeToken)).rejects.toEqual(new _AppError.AppError("Refresh token not found", 404));
  });
});