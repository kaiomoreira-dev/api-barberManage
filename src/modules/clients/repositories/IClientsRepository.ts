import { ICreateClientDTO } from "../dtos/ICreateClientDTO";
import { IClientModel } from "../infra/mongoose/entities/Clients";

export interface IClientsRepository {
    create(data: ICreateClientDTO): Promise<IClientModel>;
    list(): Promise<IClientModel[]>;
    listByCompanyId(idCompanys: string): Promise<IClientModel[]>;
    findById(id: string): Promise<IClientModel>;
    findByNameAndIdCompanys(
        name: string,
        idCompanys: string
    ): Promise<IClientModel>;
    findByCompanyId(idCompanys: string): Promise<IClientModel>;
    updatedById(data: ICreateClientDTO): Promise<void>;
    updateDebitByClientId(id: string, debit: number): Promise<void>;
    deleteById(id: string): Promise<void>;
}
