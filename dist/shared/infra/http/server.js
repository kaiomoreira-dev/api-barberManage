"use strict";

var _mongoose = _interopRequireDefault(require("../mongoose"));
require("reflect-metadata");
var _app = require("./app");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _mongoose.default)();
_app.app.listen(3200, () => {
  console.log("Server listening on port 3200");
});