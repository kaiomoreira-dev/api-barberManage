import { ICreateUserDTO } from "../dtos/ICreateUsersDTO";
import { IUserModel } from "../infra/mongoose/entities/Users";

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<IUserModel>;
    findById(id: string): Promise<IUserModel>;
    findByEmail(email: string): Promise<IUserModel>;
    list(): Promise<IUserModel[]>;
    ListByCompanyId(idCompanys: string): Promise<IUserModel[]>;
    updateById(data: ICreateUserDTO): Promise<void>;
    deleteById(id: string): Promise<void>;
}
