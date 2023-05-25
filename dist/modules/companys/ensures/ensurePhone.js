"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensurePhone = void 0;
/* eslint-disable no-useless-escape */
const ensurePhone = phone => {
  const phoneRegex = /^[0-9]{2}-[0-9]{5}-[0-9]{4}$/;
  return phoneRegex.test(phone);
};
exports.ensurePhone = ensurePhone;