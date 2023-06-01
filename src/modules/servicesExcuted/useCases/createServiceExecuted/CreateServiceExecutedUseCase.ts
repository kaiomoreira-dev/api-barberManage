/* eslint-disable prettier/prettier */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */

import { ensureDate } from "@ensures/ensureDate";
import { ensureId } from "@ensures/ensureId";
import { ensurePaymentMethod } from "@ensures/ensurePaymentMethod";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { IServiceModel } from "@modules/services/infra/mongoose/entities/Services";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { ICreateServiceExecutedDTO, PaymentMethod } from "@modules/servicesExcuted/dtos/ICreateServiceExecutedDTO";
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
        private serviceExecutedRepository: IServiceExecutedRepository,
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
    ) {}

    async execute({
        idClients,
        idServices,
        idCompanys,
        idUsers,
        isLogged,
        paymentMethod,
        paymentDate,
        serviceDate,
    }: ICreateServiceExecutedDTO): Promise<IServiceExecutedModel> {
        let priceService = 0;

        if (!ensureId(idClients)) {
            throw new AppError("Client not found", 404);
        }

        const checkClientExists = await this.clientsRepository.findById(
            idClients
        );

        if (!checkClientExists) {
            throw new AppError("Client not found", 404);
        }
        
        if (!ensureId(idCompanys)) {
            throw new AppError("Company not found", 404);
        }

        const checkCompanyExists = await this.companysRepository.findById(
            idCompanys
        );

        if (!checkCompanyExists) {
            throw new AppError("Company not found", 404);
        }

        if (!ensureId(idUsers)) {
            throw new AppError("User not found", 404);
        }

        const checkUserExists = await this.userRepository.findById(idUsers);

        if (!checkUserExists) {
            throw new AppError("User not found", 404);
        }

        if (!idServices) {
            throw new AppError("Service not found", 404);
        }

        for (const serviceID of idServices) {
            const checkServiceExists = (await this.servicesRepository.findById(
                serviceID
            )) as IServiceModel;

            if (!checkServiceExists) {
                throw new AppError("Service not found", 404);
            }

            priceService += checkServiceExists.price;
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

        const paymentMethodEnumNum = paymentMethod.toString() === "Installments" ? 3 : paymentMethod
        
        if (paymentMethodEnumNum === PaymentMethod.Installments) {
            const total = priceService + checkClientExists.debit;
            await this.clientsRepository.updatedById({
                id: idClients,
                debit: total,
            });
        }

        const serviceExecuted = await this.serviceExecutedRepository.create({
            idClients,
            idServices,
            idCompanys,
            idUsers,
            isLogged,
            value: priceService,
            paymentMethod,
            paymentDate,
            serviceDate,
        });

        return serviceExecuted;
    }
}
