import { ICreateUserDTO } from "../dtos/ICreateUsersDTO";
import { IUserModel } from "../infra/mongoose/entities/Users";

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<IUserModel>;

    findById(id: string): Promise<IUserModel>;
    findByEmail(email: string): Promise<IUserModel>;
    findByIdCompany(idCompanys: string): Promise<IUserModel>;

    updateById(
        id: string,
        name?: string,
        address?: string,
        email?: string,
        password?: string
    ): Promise<void>;

    deleteById(id: string): Promise<void>;
}
