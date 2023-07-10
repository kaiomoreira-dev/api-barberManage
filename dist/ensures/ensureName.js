"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureName = void 0;
const ensureName = name => {
  const nameRegex = /^.{0,3}$/;
  if (nameRegex.test(name)) {
    return false;
  }
  return true;
};
exports.ensureName = ensureName;