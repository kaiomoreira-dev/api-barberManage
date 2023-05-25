"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensurePassword = void 0;
const ensurePassword = password => {
  const passwordRegex = /^.{0,5}$/;
  return passwordRegex.test(password);
};
exports.ensurePassword = ensurePassword;