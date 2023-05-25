"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAddress = void 0;
/* eslint-disable no-useless-escape */
const ensureAddress = address => {
  const addressRegex = /^([a-zA-Z\s]+),\s*([a-zA-Z\s]+),\s*(\d+),\s*(\d{8})$/;
  return addressRegex.test(address);
};
exports.ensureAddress = ensureAddress;