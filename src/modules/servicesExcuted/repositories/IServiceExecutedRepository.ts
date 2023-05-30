import { ICreateServiceExecutedDTO } from "../dtos/ICreateServiceExecutedDTO";
import { IServiceExecutedModel } from "../infra/mongoose/entities/ServiceExecuted";

export interface IServiceExecutedRepository {
    create(data: ICreateServiceExecutedDTO): Promise<IServiceExecutedModel>;
    findById(id: string): Promise<IServiceExecutedModel>;
    listByCompanyId(idCompanys: string): Promise<IServiceExecutedModel[]>;
    listByServiceId(idServices: string): Promise<IServiceExecutedModel[]>;
    listByClientsId(idClients: string): Promise<IServiceExecutedModel[]>;
    listByUserId(idUsers: string): Promise<IServiceExecutedModel[]>;
    updateById(data: ICreateServiceExecutedDTO): Promise<void>;
    deleteById(id: string): Promise<void>;
}
