/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { ensureId } from "@ensures/ensureId";
import { UserMap } from "@modules/accounts/mappers/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { IServiceModel } from "@modules/services/infra/mongoose/entities/Services";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { ICreateServiceExecutedDTO } from "@modules/servicesExcuted/dtos/ICreateServiceExecutedDTO";
import { IResponseServiceExecuted } from "@modules/servicesExcuted/dtos/IResponseServiceExecutedDTO";
import { IServiceExecutedModel } from "@modules/servicesExcuted/infra/mongoose/entities/ServiceExecuted";
import { IServiceExecutedRepository } from "@modules/servicesExcuted/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindServiceExecutedByIdUseCase {
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

    async execute({
        id,
    }: ICreateServiceExecutedDTO): Promise<IResponseServiceExecuted> {
        if (!ensureId(id)) {
            throw new AppError("ServiceExecuted not found", 404);
        }

        const checkServiceExecutedExists =
            await this.serviceExecutedRepository.findById(id);
        if (!checkServiceExecutedExists) {
            throw new AppError("Service Executed not found", 404);
        }

        const allServicesRequired: IServiceModel[] = [];

        for (const serviceIdRequired of checkServiceExecutedExists.idServices) {
            const findService = await this.servicesRepository.findById(
                String(serviceIdRequired)
            );
            allServicesRequired.push(findService);
        }
        const company = await this.companysRepository.findById(
            String(checkServiceExecutedExists.idCompanys)
        );

        const client = await this.clientsRepository.findById(
            String(checkServiceExecutedExists.idClients)
        );

        const users = await this.usersRepository.findById(
            String(checkServiceExecutedExists.idUsers)
        );
        const idCompanys: string[] = [];
        for (const company of users.idCompanys) {
            idCompanys.push(String(company));
        }

        const serviceExecuted: IResponseServiceExecuted = {
            id: checkServiceExecutedExists._id,
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
            isLogged: checkServiceExecutedExists.isLogged,
            value: checkServiceExecutedExists.value,
            paymentMethod: checkServiceExecutedExists.paymentMethod,
            paymentDate: checkServiceExecutedExists.paymentDate,
            serviceDate: checkServiceExecutedExists.serviceDate,
        };

        return serviceExecuted;
    }
}
