"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureId = void 0;
/* eslint-disable no-useless-escape */
const ensureId = id => {
  const idRegex = /^[a-zA-Z0-9]{24}$/;
  return idRegex.test(id);
};
exports.ensureId = ensureId;