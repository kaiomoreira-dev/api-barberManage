"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureDate = void 0;
const ensureDate = date => {
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/;
  if (dateRegex.test(String(date))) {
    return true;
  }
  return false;
};
exports.ensureDate = ensureDate;