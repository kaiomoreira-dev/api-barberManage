/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ensureId } from "@ensures/ensureId";
import { UserMap } from "@modules/accounts/mappers/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { IServiceModel } from "@modules/services/infra/mongoose/entities/Services";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { IResponseServiceExecuted } from "@modules/servicesExcuteds/dtos/IResponseServiceExecutedDTO";
import { IServiceExecutedRepository } from "@modules/servicesExcuteds/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListServiceExecutedByUserIdUseCase {
    constructor(
        @inject("ServiceExecutedRepository")
        private serviceExecutedRepository: IServiceExecutedRepository,
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute(idUsers: string): Promise<IResponseServiceExecuted[]> {
        if (!ensureId(idUsers)) {
            throw new AppError("User not found", 404);
        }

        const checkUsersExist = await this.usersRepository.findById(idUsers);

        if (!checkUsersExist) {
            throw new AppError("User not found", 404);
        }

        const servicesExecuted =
            await this.serviceExecutedRepository.listByUserId(idUsers);

        const allServicesExecutedByClient: IResponseServiceExecuted[] = [];
        const allServicesRequired: IServiceModel[] = [];

        for (const service of servicesExecuted) {
            for (const serviceIdRequired of service.idServices) {
                const findService = await this.servicesRepository.findById(
                    String(serviceIdRequired)
                );
                allServicesRequired.push(findService);
            }
            const company = await this.companysRepository.findById(
                String(service.idCompanys)
            );

            const client = await this.clientsRepository.findById(
                String(service.idClients)
            );
            const idCompanys: string[] = [];
            for (const company of checkUsersExist.idCompanys) {
                idCompanys.push(String(company));
            }

            const serviceExecuted: IResponseServiceExecuted = {
                id: service._id,
                company,
                user: UserMap.toDTO({
                    id: checkUsersExist.id,
                    name: checkUsersExist.name,
                    email: checkUsersExist.email,
                    phone: checkUsersExist.phone,
                    address: checkUsersExist.address,
                    createdAt: checkUsersExist.createdAt,
                    updatedAt: checkUsersExist.updatedAt,
                    admin: checkUsersExist.admin,
                    employee: checkUsersExist.employee,
                    idCompanys,
                }),
                client,
                services: allServicesRequired,
                isLogged: service.isLogged,
                value: service.value,
                paymentMethod: service.paymentMethod,
                paymentDate: service.paymentDate,
                serviceDate: service.serviceDate,
            };

            allServicesExecutedByClient.push(serviceExecuted);
        }

        return allServicesExecutedByClient;
    }
}
