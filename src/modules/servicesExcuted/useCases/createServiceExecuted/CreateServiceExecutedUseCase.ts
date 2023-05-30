/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
import { ensureAddress } from "@ensures/ensureAddress";
import { ensureDate } from "@ensures/ensureDate";
import { ensureEsqd } from "@ensures/ensureEsqd";
import { ensureName } from "@ensures/ensureName";
import { ensureNumber } from "@ensures/ensureNumber";
import { ensurePaymentMethod } from "@ensures/ensurePaymentMethod";
import { ensurePG } from "@ensures/ensurePG";
import { ensurePhone } from "@ensures/ensurePhone";
import { ensurePrice } from "@ensures/ensurePrice";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateClientDTO } from "@modules/clients/dtos/ICreateClientDTO";
import { IClientModel } from "@modules/clients/infra/mongoose/entities/Clients";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { ICreateServiceExecutedDTO } from "@modules/servicesExcuted/dtos/ICreateServiceExecutedDTO";
import { IServiceExecutedModel } from "@modules/servicesExcuted/infra/mongoose/entities/ServiceExecuted";
import { IServiceExecutedRepository } from "@modules/servicesExcuted/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateServiceExecutedUseCase {
    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository,
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository,
        @inject("ServiceExecutedRepository")
        private serviceExecutedRepository: IServiceExecutedRepository
    ) {}

    async execute({
        idClients,
        idServices,
        idCompanys,
        idUsers,
        value,
        paymentMethod,
        paymentDate,
        serviceDate,
    }: ICreateServiceExecutedDTO): Promise<IServiceExecutedModel> {
        const checkCompanyExist = await this.companysRepository.findById(
            idCompanys
        );

        if (!checkCompanyExist) {
            throw new AppError("Company not found", 404);
        }

        const checkCompanyExists = await this.clientsRepository.findById(
            idClients
        );

        if (!checkCompanyExists) {
            throw new AppError("Client not found", 404);
        }

        for (const serviceID of idServices) {
            const checkServiceExists =
                this.servicesRepository.findById(serviceID);

            if (!checkServiceExists) {
                throw new AppError("Service not found", 404);
            }
        }

        if (!ensurePaymentMethod(paymentMethod)) {
            throw new AppError("Payment method is not valid", 401);
        }

        if (!ensureDate(paymentDate)) {
            throw new AppError("Payment date not found", 404);
        }

        if (!ensureDate(serviceDate)) {
            throw new AppError("Service date not found", 404);
        }

        const serviceExecuted = await this.serviceExecutedRepository.create({
            idClients,
            idServices,
            idCompanys,
            idUsers,
            value,
            paymentMethod,
            paymentDate,
            serviceDate,
        });

        return serviceExecuted;
    }
}