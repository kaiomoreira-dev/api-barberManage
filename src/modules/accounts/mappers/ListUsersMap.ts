/* eslint-disable import/no-extraneous-dependencies */
import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

export class ListUsersMap {
    static toDTOArray(users: IUserResponseDTO[]): IUserResponseDTO[] {
        return users.map(
            ({
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
            }) => {
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
        );
    }
}
