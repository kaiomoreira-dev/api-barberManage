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
export class ListServiceExecutedByCompanyIdUseCase {
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

    async execute(idCompanys: string): Promise<IResponseServiceExecuted[]> {
        if (!ensureId(idCompanys)) {
            throw new AppError("ServiceExecuted not found", 404);
        }

        const checkCompanyExist = await this.companysRepository.findById(
            idCompanys
        );

        if (!checkCompanyExist) {
            throw new AppError("Company not found", 404);
        }

        const servicesExecuted =
            await this.serviceExecutedRepository.listByCompanyId(idCompanys);

        const allServicesExecutedByClient: IResponseServiceExecuted[] = [];
        const allServicesRequired: IServiceModel[] = [];

        for (const service of servicesExecuted) {
            for (const serviceIdRequired of service.idServices) {
                const findService = await this.servicesRepository.findById(
                    String(serviceIdRequired)
                );
                allServicesRequired.push(findService);
            }
            const client = await this.clientsRepository.findById(
                String(service.idClients)
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
                company: checkCompanyExist,
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
