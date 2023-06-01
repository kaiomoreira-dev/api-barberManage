import { ensureId } from "@ensures/ensureId";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ICreateServiceExecutedDTO } from "@modules/servicesExcuted/dtos/ICreateServiceExecutedDTO";
import { IServiceExecutedModel } from "@modules/servicesExcuted/infra/mongoose/entities/ServiceExecuted";
import { IServiceExecutedRepository } from "@modules/servicesExcuted/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteServiceExecutedByIdUseCase {
    constructor(
        @inject("ServiceExecutedRepository")
        private serviceExecutedRepository: IServiceExecutedRepository,
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}

    async execute(id: string): Promise<void> {
        if (!ensureId(id)) {
            throw new AppError("ServiceExecuted not found", 404);
        }

        const checkServiceExecutedExists =
            await this.serviceExecutedRepository.findById(id);
        if (!checkServiceExecutedExists) {
            throw new AppError("Service Executed not found", 404);
        }

        const checkClientExists = await this.clientsRepository.findById(
            String(checkServiceExecutedExists.idClients)
        );

        const paymentMethodEnumNum =
            checkServiceExecutedExists.paymentMethod === "Installments"
                ? checkServiceExecutedExists.paymentMethod
                : null;

        if (paymentMethodEnumNum === "Installments") {
            const calcDiscount =
                checkClientExists.debit - checkServiceExecutedExists.value;
            await this.clientsRepository.updatedById({
                id: checkClientExists.id,
                debit: calcDiscount,
            });
        }

        await this.serviceExecutedRepository.deleteById(id);
    }
}
