"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureDecription = void 0;
/* eslint-disable no-useless-escape */
const ensureDecription = description => {
  if (!description) {
    return true;
  }
  const descriptionRegex = /^[\w\s.,!?-]*$/;
  return descriptionRegex.test(description);
};
exports.ensureDecription = ensureDecription;