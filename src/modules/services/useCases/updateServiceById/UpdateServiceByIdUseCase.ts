/* eslint-disable import/no-unresolved */
import { ensureDecription } from "@ensures/ensureDescription";
import { ensureName } from "@ensures/ensureName";
import { ensurePrice } from "@ensures/ensurePrice";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateServiceByIdUseCase {
    constructor(
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}

    async execute({
        id,
        idCompanys,
        description,
        name,
        price,
    }: ICreateServiceDTO): Promise<void> {
        if (!ensureName(name)) {
            throw new AppError("Name is not available", 401);
        }

        const serviceAlreadyExist =
            await this.servicesRepository.findServiceByNameAndByCompanyId(
                idCompanys,
                name
            );

        if (serviceAlreadyExist) {
            throw new AppError("Service already exist", 404);
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
