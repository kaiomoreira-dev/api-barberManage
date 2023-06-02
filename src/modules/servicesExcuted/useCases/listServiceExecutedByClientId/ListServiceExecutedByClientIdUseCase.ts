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
import { IResponseServiceExecuted } from "@modules/servicesExcuted/dtos/IResponseServiceExecutedDTO";
import { IServiceExecutedRepository } from "@modules/servicesExcuted/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListServiceExecutedByClientIdUseCase {
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

    async execute(idClients: string): Promise<IResponseServiceExecuted[]> {
        if (!ensureId(idClients)) {
            throw new AppError("ServiceExecuted not found", 404);
        }

        const client = await this.clientsRepository.findById(idClients);

        if (!client) {
            throw new AppError("Client not found", 404);
        }

        const servicesExecuted =
            await this.serviceExecutedRepository.listByClientsId(idClients);

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

            const users = await this.usersRepository.findById(
                String(service.idUsers)
            );
            const idCompanys: string[] = [];
            for (const company of users.idCompanys) {
                idCompanys.push(String(company));
            }

            const serviceExecuted: IResponseServiceExecuted = {
                id: service._id,
                company,
                user: UserMap.toDTO({
                    id: users.id,
                    name: users.name,
                    email: users.email,
                    phone: users.phone,
                    address: users.address,
                    createdAt: users.createdAt,
                    updatedAt: users.updatedAt,
                    admin: users.admin,
                    employee: users.employee,
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
