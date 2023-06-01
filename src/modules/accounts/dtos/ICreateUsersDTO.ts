import { ObjectId } from "mongodb";

export interface ICreateUsersDTO {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    address?: string;
    idCompanys?: ObjectId[];
}
