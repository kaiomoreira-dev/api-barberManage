/* eslint-disable import/no-unresolved */
import { ensureDecription } from "@ensures/ensureDescription";
import { ensureName } from "@ensures/ensureName";
import { ensurePrice } from "@ensures/ensurePrice";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { IServiceModel } from "@modules/services/infra/mongoose/entities/Services";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateServiceUseCase {
    constructor(
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository,
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute({
        idCompanys,
        description,
        name,
        price,
    }: ICreateServiceDTO): Promise<IServiceModel> {
        const checkCompanyExists = this.companysRepository.findById(idCompanys);

        if (!checkCompanyExists) {
            throw new AppError("Company not found", 404);
        }

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

        const service = await this.servicesRepository.create({
            idCompanys,
            description,
            name,
            price,
        });

        return service;
    }
}
