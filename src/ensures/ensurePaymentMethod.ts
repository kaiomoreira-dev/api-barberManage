import { PaymentMethod } from "@modules/servicesExcuted/dtos/ICreateServiceExecutedDTO";

/* eslint-disable no-useless-escape */
export const ensurePaymentMethod = (paymentMethod: PaymentMethod) => {
    const paymentMethodsRegex =
        /^(CreditCard|DebitCard|Cash|Installments|Pix)$/;

    return paymentMethodsRegex.test(String(paymentMethod));
};
