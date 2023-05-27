import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { IServiceModel } from "@modules/services/infra/mongoose/entities/Services";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindServiceByIdUseCase {
    constructor(
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute({ id }: ICreateServiceDTO): Promise<IServiceModel> {
        const checkServiceExists = this.servicesRepository.findById(id);

        if (!checkServiceExists) {
            throw new AppError("Service not found", 404);
        }

        return checkServiceExists;
    }
}
