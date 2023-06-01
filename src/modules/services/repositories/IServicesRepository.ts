import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";

import { IServiceModel } from "../infra/mongoose/entities/Services";

export interface IServicesRepository {
    create(data: ICreateServiceDTO): Promise<IServiceModel>;
    list(): Promise<IServiceModel[]>;
    findById(id: string): Promise<IServiceModel>;
    listByCompanyId(idCompanys: string): Promise<IServiceModel[]>;
    findServiceByNameAndByCompanyId(
        idCompanys: string,
        name: string
    ): Promise<IServiceModel>;
    updateById(data: ICreateServiceDTO): Promise<void>;
    deleteById(id: string): Promise<void>;
}
