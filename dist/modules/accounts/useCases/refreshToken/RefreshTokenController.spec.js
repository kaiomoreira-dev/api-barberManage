"use strict";

require("dotenv/config");
var _faker = require("@faker-js/faker");
var _supertest = _interopRequireDefault(require("supertest"));
var _app = require("../../../../shared/infra/http/app");
var _typeorm = require("../../../../shared/infra/typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let connection;
describe("Refresh token Controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.createConnection)("localhost");
    await connection.runMigrations();
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });
  it("should create a refresh token using the refresh token provided", async () => {
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
    const {
      refresh_token
    } = authenticateUser.body;
    const refreshToken = await (0, _supertest.default)(_app.app).post("/api/refresh-token").send({
      token: refresh_token
    });
    expect(refreshToken.status).toBe(200);
  });
  it("should not be able to create a refresh token with refresh token invalid", async () => {
    const user = {
      id: _faker.faker.datatype.uuid(),
      name: _faker.faker.name.fullName(),
      email: _faker.faker.internet.email(),
      password: _faker.faker.internet.password(10),
      address: _faker.faker.address.streetAddress()
    };
    await (0, _supertest.default)(_app.app).post("/api/users").send(user);
    await (0, _supertest.default)(_app.app).post("/api/sessions").send({
      email: user.email,
      password: user.password
    });
    const refreshToken = await (0, _supertest.default)(_app.app).post("/api/refresh-token").send({
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJlbWFpbEB0ZXN0ZS5jb20iLCJpYXQiOjE2ODUwNjA2NTksImV4cCI6MTY4NTY2NTQ1OSwic3ViIjoiNjFkMGU1N2ItOTYxZC00ZDY5LTk5MTAtZjZlMGUxNTI0YzcyIn0.thUukeDwSnKkEUuO-WaD2SH4gwqhy0s4_B0rLlEIbro"
    });
    console.log(refreshToken.error);
    expect(refreshToken.status).toBe(404);
  });
});