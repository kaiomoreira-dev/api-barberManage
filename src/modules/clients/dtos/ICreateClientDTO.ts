export enum Pg {
    "Cel",
    "Ten-Cel",
    "Cap",
    "Maj",
    "1º Ten",
    "2º Ten",
    "Asp",
    "ST",
    "1º Sgt",
    "2º Sgt",
    "3º Sgt",
    "Cb",
    "Sd EP",
    "Sd EV",
}
export enum Esqd {
    "1º Esqd",
    "2º Esqd",
    "3º Esqd",
    "Esqd C Ap",
    "EM",
}
export interface ICreateClientDTO {
    id?: string;
    idCompanys?: string;
    name?: string;
    phone?: string;
    address?: string;
    debit?: number;
    num?: number;
    pg?: Pg;
    esqd?: Esqd;
    military?: boolean;
}
