import { UserMap } from "@modules/accounts/mappers/UserMap";
import { IClientModel } from "@modules/clients/infra/mongoose/entities/Clients";
import { ICompanyModel } from "@modules/companys/infra/mongoose/entities/Companys";
import { IServiceModel } from "@modules/services/infra/mongoose/entities/Services";
import { ObjectId } from "mongodb";

export interface IResponseServiceExecuted {
    id: ObjectId;
    company: ICompanyModel;
    user: UserMap;
    services: IServiceModel[];
    client: IClientModel;
    isLogged: ObjectId;
    value: number;
    paymentMethod: string;
    paymentDate: Date;
    serviceDate: Date;
}
