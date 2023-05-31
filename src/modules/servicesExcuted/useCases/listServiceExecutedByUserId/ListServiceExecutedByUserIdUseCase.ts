import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { IServiceExecutedModel } from "@modules/servicesExcuted/infra/mongoose/entities/ServiceExecuted";
import { IServiceExecutedRepository } from "@modules/servicesExcuted/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListServiceExecutedByServiceIdUseCase {
    constructor(
        @inject("ServiceExecutedRepository")
        private serviceExecutedRepository: IServiceExecutedRepository,
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute(idServices: string): Promise<IServiceExecutedModel[]> {
        const checkCompanyExist = await this.servicesRepository.findById(
            idServices
        );

        if (!checkCompanyExist) {
            throw new AppError("Service not found", 404);
        }

        const servicesExecuted =
            await this.serviceExecutedRepository.listByServiceId(
                checkCompanyExist.id
            );

        return servicesExecuted;
    }
}
