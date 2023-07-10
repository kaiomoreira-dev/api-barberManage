"use strict";

var _bcrypt = require("bcrypt");
var _ = _interopRequireDefault(require(".."));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function seedAdmin() {
  try {
    const connection = await (0, _.default)();
    const password = await (0, _bcrypt.hash)(process.env.USER_PASSWORD, 8);
    await connection.collection("users").insertOne({
      name: "Gustavo",
      email: process.env.USER_EMAIL,
      password,
      phone: "55-55555-5555",
      address: "",
      admin: true,
      employee: true
    });
    console.log("Created admin user successfully");
    await connection.close();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
seedAdmin();