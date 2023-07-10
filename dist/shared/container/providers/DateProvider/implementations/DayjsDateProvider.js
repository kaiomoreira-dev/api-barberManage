"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayjsDateProvider = void 0;
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable import/no-extraneous-dependencies */

class DayjsDateProvider {
  addDays(days) {
    return (0, _dayjs.default)().add(days, "days").toDate();
  }
}
exports.DayjsDateProvider = DayjsDateProvider;