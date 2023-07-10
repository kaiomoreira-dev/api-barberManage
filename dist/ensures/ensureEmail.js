"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureEmail = void 0;
const ensureEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
exports.ensureEmail = ensureEmail;