"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureNumber = void 0;
const ensureNumber = num => {
  if (!num) {
    return true;
  }
  if (typeof num === "number" && num < 0) {
    return false;
  }
  return true;
};
exports.ensureNumber = ensureNumber;