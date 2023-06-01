import { ObjectId } from "mongodb";

export interface IUserResponseDTO {
    idCompanys: string[];
    id: ObjectId;
    name: string;
    email: string;
    phone: string;
    address: string;
    admin: boolean;
    employee: boolean;
    createdAt: Date;
    updatedAt: Date;
}
