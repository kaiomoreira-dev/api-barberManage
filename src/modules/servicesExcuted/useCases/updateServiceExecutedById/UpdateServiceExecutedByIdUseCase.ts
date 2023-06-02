/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { ensureDate } from "@ensures/ensureDate";
import { ensureId } from "@ensures/ensureId";
import { ensurePaymentMethod } from "@ensures/ensurePaymentMethod";
import { ensurePrice } from "@ensures/ensurePrice";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { ICreateServiceExecutedDTO } from "@modules/servicesExcuted/dtos/ICreateServiceExecutedDTO";
import { IServiceExecutedRepository } from "@modules/servicesExcuted/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateServiceExecutedByIdUseCase {
    constructor(
        @inject("ServiceExecutedRepository")
        private serviceExecutedRepository: IServiceExecutedRepository,
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository,
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute({
        id,
        idClients,
        paymentDate,
        paymentMethod,
    }: ICreateServiceExecutedDTO): Promise<void> {
        if (!ensureId(idClients)) {
            throw new AppError("Client not found", 404);
        }

        const checkCompanyExists = await this.clientsRepository.findById(
            idClients
        );

        if (!checkCompanyExists) {
            throw new AppError("Client not found", 404);
        }

        const checkServiceExecutedExists =
            await this.serviceExecutedRepository.findById(id);

        if (!checkServiceExecutedExists) {
            throw new AppError("Service Executed not found", 404);
        }

        if (!ensurePaymentMethod(paymentMethod)) {
            throw new AppError("Payment method is not valid", 401);
        }

        if (!ensureDate(paymentDate)) {
            throw new AppError("Payment date not found", 404);
        }

        if (
            paymentMethod.toString() !==
                checkServiceExecutedExists.paymentMethod &&
            checkServiceExecutedExists.paymentMethod === "Installments"
        ) {
            const calcDiscount =
                checkCompanyExists.debit - checkServiceExecutedExists.value;
            await this.clientsRepository.updatedById({
                id: idClients,
                debit: Math.abs(calcDiscount),
            });
        }

        await this.serviceExecutedRepository.updateById({
            id,
            idClients,
            paymentDate,
            paymentMethod,
        });
    }
}
