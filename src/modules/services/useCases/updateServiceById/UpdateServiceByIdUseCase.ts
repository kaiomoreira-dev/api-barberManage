import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { IServiceModel } from "@modules/services/infra/mongoose/entities/Services";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { ensureDecription } from "ensures/ensureDescription";
import { ensureName } from "ensures/ensureName";
import { ensurePrice } from "ensures/ensurePrice";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateServiceByIdUseCase {
    constructor(
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute({
        id,
        description,
        name,
        price,
    }: ICreateServiceDTO): Promise<void> {
        if (!ensureName(name)) {
            throw new AppError("Name is not available", 401);
        }

        if (!ensurePrice(price)) {
            throw new AppError("Price is not available", 401);
        }

        if (!ensureDecription(description)) {
            throw new AppError("Description is not available", 401);
        }

        await this.servicesRepository.updateById({
            id,
            description,
            name,
            price,
        });
    }
}
