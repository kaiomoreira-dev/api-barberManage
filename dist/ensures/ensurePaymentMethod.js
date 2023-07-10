"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensurePaymentMethod = void 0;
/* eslint-disable no-useless-escape */
const ensurePaymentMethod = paymentMethod => {
  const paymentMethodsRegex = /^(CreditCard|DebitCard|Cash|Installments|Pix)$/;
  return paymentMethodsRegex.test(String(paymentMethod));
};
exports.ensurePaymentMethod = ensurePaymentMethod;