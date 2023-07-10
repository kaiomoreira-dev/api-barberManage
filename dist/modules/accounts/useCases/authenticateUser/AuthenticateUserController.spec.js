"use strict";

require("dotenv/config");
var _faker = require("@faker-js/faker");
var _supertest = _interopRequireDefault(require("supertest"));
var _app = require("../../../../shared/infra/http/app");
var _typeorm = require("../../../../shared/infra/typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let connection;
describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.createConnection)("localhost");
    await connection.runMigrations();
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });
  it("should be able to authenticate a user", async () => {
    const user = {
      id: _faker.faker.datatype.uuid(),
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.internet.password(10),
      address: _faker.faker.address.streetAddress()
    };
    await (0, _supertest.default)(_app.app).post("/api/users").send(user);
    const authenticateUser = await (0, _supertest.default)(_app.app).post("/api/sessions").send({
      email: user.email,
      password: user.password
    });
    expect(authenticateUser.status).toBe(200);
  });
  it("should not be able to authenticate a user with a wrong password", async () => {
    const user = {
      id: _faker.faker.datatype.uuid(),
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.internet.password(10),
      address: _faker.faker.address.streetAddress()
    };
    await (0, _supertest.default)(_app.app).post("/api/users").send(user);
    const authenticateUser = await (0, _supertest.default)(_app.app).post("/api/sessions").send({
      email: user.email,
      password: "fakepass"
    });
    expect(authenticateUser.status).toBe(401);
  });
  it("should not be able to authenticate a user with a wrong email", async () => {
    const user = {
      id: _faker.faker.datatype.uuid(),
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.internet.password(10),
      address: _faker.faker.address.streetAddress()
    };
    await (0, _supertest.default)(_app.app).post("/api/users").send(user);
    const authenticateUser = await (0, _supertest.default)(_app.app).post("/api/sessions").send({
      email: "fakeEmail",
      password: user.password
    });
    expect(authenticateUser.status).toBe(401);
  });
});