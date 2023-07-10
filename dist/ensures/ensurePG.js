"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensurePG = void 0;
/* eslint-disable no-useless-escape */
const ensurePG = pg => {
  if (!pg) {
    return true;
  }
  const pgRegex = /^(Cel|Ten-Cel|Cap|Maj|1º Ten|2º Ten|Asp|ST|1º Sgt|2º Sgt|3º Sgt|Cb|Sd EP|Sd EV)$/;
  return pgRegex.test(String(pg));
};
exports.ensurePG = ensurePG;