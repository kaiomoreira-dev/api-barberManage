import { ensureId } from "@ensures/ensureId";
import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { IServiceExecutedRepository } from "@modules/servicesExcuteds/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteServiceByIdUseCase {
    constructor(
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository,
        @inject("ServiceExecutedRepository")
        private serviceExecutedRepository: IServiceExecutedRepository
    ) {}

    async execute({ id }: ICreateServiceDTO): Promise<void> {
        if (!ensureId(id)) {
            throw new AppError("Service not found", 404);
        }

        const checkServiceExists = await this.servicesRepository.findById(id);

        if (!checkServiceExists) {
            throw new AppError("Service not found", 404);
        }

        const checkExistServiceExcuted =
            await this.serviceExecutedRepository.listByServiceId(
                checkServiceExists.id
            );

        if (checkExistServiceExcuted.length > 0) {
            throw new AppError(
                "Cannot delete service when there is a related executed service",
                404
            );
        }

        await this.servicesRepository.deleteById(id);
    }
}
