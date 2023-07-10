"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureEsqd = void 0;
/* eslint-disable no-useless-escape */
const ensureEsqd = esqd => {
  if (!esqd) {
    return true;
  }
  const esqdRegex = /^(1º|2º|3º) Esqd$|^Esqd C Ap$|^EM$/;
  return esqdRegex.test(String(esqd));
};
exports.ensureEsqd = ensureEsqd;