import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { IUserModel } from "../infra/mongoose/entities/Users";

export interface IUsersRepository {
    create(data: ICreateUsersDTO): Promise<IUserModel>;
    findById(id: string): Promise<IUserModel>;
    findByEmail(email: string): Promise<IUserModel>;
    list(): Promise<IUserModel[]>;
    listByCompanyId(idCompanys: string): Promise<IUserModel[]>;
    updateById(data: ICreateUsersDTO): Promise<void>;
    deleteById(id: string): Promise<void>;
}
