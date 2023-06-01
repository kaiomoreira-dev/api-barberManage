import { ensureId } from "@ensures/ensureId";
import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteServiceByIdUseCase {
    constructor(
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute({ id }: ICreateServiceDTO): Promise<void> {
        if (!ensureId(id)) {
            throw new AppError("Service not found", 404);
        }

        const checkServiceExists = this.servicesRepository.findById(id);

        if (!checkServiceExists) {
            throw new AppError("Service not found", 404);
        }

        await this.servicesRepository.deleteById(id);
    }
}
