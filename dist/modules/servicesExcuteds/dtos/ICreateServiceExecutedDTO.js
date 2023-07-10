"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentMethod = void 0;
let PaymentMethod = /*#__PURE__*/function (PaymentMethod) {
  PaymentMethod[PaymentMethod["CreditCard"] = 0] = "CreditCard";
  PaymentMethod[PaymentMethod["DebitCard"] = 1] = "DebitCard";
  PaymentMethod[PaymentMethod["Cash"] = 2] = "Cash";
  PaymentMethod[PaymentMethod["Installments"] = 3] = "Installments";
  PaymentMethod[PaymentMethod["Pix"] = 4] = "Pix";
  return PaymentMethod;
}({});
exports.PaymentMethod = PaymentMethod;