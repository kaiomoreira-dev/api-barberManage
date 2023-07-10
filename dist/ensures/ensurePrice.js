"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensurePrice = void 0;
/* eslint-disable no-useless-escape */
const ensurePrice = price => {
  if (typeof price === "number" && price < 0) {
    return false;
  }
  return true;
};
exports.ensurePrice = ensurePrice;