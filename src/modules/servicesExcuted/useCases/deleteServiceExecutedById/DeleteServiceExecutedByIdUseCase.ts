import { ICreateServiceExecutedDTO } from "@modules/servicesExcuted/dtos/ICreateServiceExecutedDTO";
import { IServiceExecutedModel } from "@modules/servicesExcuted/infra/mongoose/entities/ServiceExecuted";
import { IServiceExecutedRepository } from "@modules/servicesExcuted/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteServiceExecutedByIdUseCase {
    constructor(
        @inject("ServiceExecutedRepository")
        private serviceExecutedRepository: IServiceExecutedRepository
    ) {}

    async execute(id: string): Promise<void> {
        const checkServiceExecutedExists =
            await this.serviceExecutedRepository.findById(id);
        if (!checkServiceExecutedExists) {
            throw new AppError("Service Executed not found", 404);
        }

        await this.serviceExecutedRepository.deleteById(id);
    }
}
