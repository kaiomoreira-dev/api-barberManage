/* eslint-disable import/no-extraneous-dependencies */
import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

export class UserMap {
    static toDTO({
        id,
        name,
        email,
        address,
        idCompanys,
        phone,
        admin,
        employee,
        createdAt,
        updatedAt,
    }: IUserResponseDTO): IUserResponseDTO {
        const user = instanceToInstance({
            id,
            name,
            email,
            phone,
            address,
            admin,
            employee,
            idCompanys,
            createdAt,
            updatedAt,
        });

        return user;
    }
}
