import { ensureId } from "@ensures/ensureId";
import { IClientModel } from "@modules/clients/infra/mongoose/entities/Clients";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListClientByCompanyIdUseCase {
    constructor(
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository,
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}

    async execute(idCompanys: string): Promise<IClientModel[]> {
        if (!ensureId(idCompanys)) {
            throw new AppError("Company not found", 404);
        }

        const checkCompanyExist = await this.companysRepository.findById(
            idCompanys
        );

        if (!checkCompanyExist) {
            throw new AppError("Company not found", 404);
        }

        const clients = await this.clientsRepository.listByCompanyId(
            idCompanys
        );

        return clients;
    }
}
