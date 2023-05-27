import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { IServiceModel } from "@modules/services/infra/mongoose/entities/Services";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindServiceByCompanyIdUseCase {
    constructor(
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute({ idCompanys }: ICreateServiceDTO): Promise<IServiceModel> {
        const checkServiceExists =
            await this.servicesRepository.findByCompanyId(idCompanys);

        if (!checkServiceExists) {
            throw new AppError("Service not found", 404);
        }
        return checkServiceExists;
    }
}
