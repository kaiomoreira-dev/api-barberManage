import { ICreateCompanysDTO } from "../dtos/ICreateCompanysDTO";
import { ICompanyModel } from "../infra/mongoose/entities/Companys";

export interface ICompanysRepository {
    create(data: ICreateCompanysDTO): Promise<ICompanyModel>;

    list(): Promise<ICompanyModel[]>;
    listByUserId(idUsers: string): Promise<ICompanyModel[]>;

    findById(id: string): Promise<ICompanyModel>;
    findByName(name: string): Promise<ICompanyModel>;

    updateById(data: ICreateCompanysDTO): Promise<void>;
    updateListUsersById(idCompanys: string, idUsers: string): Promise<void>;

    deleteById(id: string): Promise<void>;
}
