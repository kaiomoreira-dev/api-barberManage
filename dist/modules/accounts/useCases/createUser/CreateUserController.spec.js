"use strict";

require("dotenv/config");
var _faker = require("@faker-js/faker");
var _supertest = _interopRequireDefault(require("supertest"));
var _app = require("../../../../shared/infra/http/app");
var _mongoose = _interopRequireDefault(require("../../../../shared/infra/mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable import/no-extraneous-dependencies */

let connection;
describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await (0, _mongoose.default)();
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to create a user", async () => {
    const createUser = await (0, _supertest.default)(_app.app).post("/api/users").send({
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.internet.password(10),
      address: _faker.faker.address.streetAddress()
    });
    expect(createUser.status).toBe(201);
  });
  it("should not be able to create user with leght name less than 3 characters", async () => {
    const createUser = await (0, _supertest.default)(_app.app).post("/api/users").send({
      id: _faker.faker.datatype.uuid(),
      name: "fak",
      email: _faker.faker.internet.email(),
      password: _faker.faker.internet.password(10),
      address: _faker.faker.address.streetAddress()
    });
    expect(createUser.status).toBe(401);
  });
  it("should not be able to create user if email already exists", async () => {
    const emailTest = "test@email.com";
    const createUser1 = await (0, _supertest.default)(_app.app).post("/api/users").send({
      id: _faker.faker.datatype.uuid(),
      name: _faker.faker.name.fullName(),
      email: emailTest,
      password: _faker.faker.internet.password(10),
      address: _faker.faker.address.streetAddress()
    });
    const createUser2 = await (0, _supertest.default)(_app.app).post("/api/users").send({
      id: _faker.faker.datatype.uuid(),
      name: _faker.faker.name.fullName(),
      email: emailTest,
      password: _faker.faker.internet.password(10),
      address: _faker.faker.address.streetAddress()
    });
    expect(createUser2.status).toBe(401);
  });
  it("should not be able to create user with password less than lenght 5 characters", async () => {
    const createUser = await (0, _supertest.default)(_app.app).post("/api/users").send({
      id: _faker.faker.datatype.uuid(),
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.internet.password(3),
      address: _faker.faker.address.streetAddress()
    });
    expect(createUser.status).toBe(401);
  });
  it("should not be able to create a user without email field empty", async () => {
    const createUser = await (0, _supertest.default)(_app.app).post("/api/users").send({
      id: _faker.faker.datatype.uuid(),
      name: _faker.faker.name.fullName(),
      email: "",
      password: _faker.faker.internet.password(10),
      address: _faker.faker.address.streetAddress()
    });
    expect(createUser.status).toBe(401);
  });
});