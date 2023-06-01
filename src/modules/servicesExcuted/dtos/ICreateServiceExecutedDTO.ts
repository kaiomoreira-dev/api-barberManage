export enum PaymentMethod {
    "CreditCard",
    "DebitCard",
    "Cash",
    "Installments",
    "Pix",
}

export interface ICreateServiceExecutedDTO {
    id?: string;
    idClients?: string;
    idServices?: string[];
    idCompanys?: string;
    idUsers?: string;
    isLogged?: string;
    value?: number;
    paymentMethod?: PaymentMethod;
    paymentDate?: Date;
    serviceDate?: Date;
}
