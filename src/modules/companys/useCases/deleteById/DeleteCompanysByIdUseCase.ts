import { ensureId } from "@ensures/ensureId";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ICreateCompanysDTO } from "@modules/companys/dtos/ICreateCompanysDTO";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ICostsRepository } from "@modules/costs/repositories/ICostsRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { IServiceExecutedRepository } from "@modules/servicesExcuteds/repositories/IServiceExecutedRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteCompanyByIdUseCase {
    constructor(
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository,
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("ServiceExecutedRepository")
        private serviceExecutedRepository: IServiceExecutedRepository,
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository,
        @inject("CostsRepository")
        private costRepository: ICostsRepository,
        @inject("ClientsRepository")
        private clientsRepository: IClientsRepository
    ) {}

    async execute({ id }: ICreateCompanysDTO): Promise<void> {
        if (!ensureId(id)) {
            throw new AppError("Company not found", 404);
        }

        const checkCompanyExist = await this.companysRepository.findById(id);

        if (!checkCompanyExist) {
            throw new AppError("Company not found", 404);
        }

        const checkUserExist = await this.userRepository.listByCompanyId(
            checkCompanyExist.id
        );

        if (checkUserExist.length > 0) {
            throw new AppError(
                "Cannot delete company when there is a related user",
                401
            );
        }

        const checkClientExist = await this.clientsRepository.listByCompanyId(
            checkCompanyExist.id
        );

        if (checkClientExist.length > 0) {
            throw new AppError(
                "Cannot delete company when there is a related client",
                401
            );
        }

        const checkCostExists = await this.costRepository.listByIdCompany(
            checkCompanyExist.id
        );

        if (checkCostExists.length > 0) {
            throw new AppError(
                "Cannot delete company when there is a related cost",
                401
            );
        }

        const checkServiceExists =
            await this.servicesRepository.listByCompanyId(checkCompanyExist.id);

        if (checkServiceExists.length > 0) {
            throw new AppError(
                "Cannot delete company when there is a related service",
                401
            );
        }

        const checkExistServiceExcuted =
            await this.serviceExecutedRepository.listByCompanyId(
                checkCompanyExist.id
            );

        if (checkExistServiceExcuted.length > 0) {
            throw new AppError(
                "Cannot delete company when there is a related executed service",
                401
            );
        }

        await this.companysRepository.deleteById(id);

        await this.userRepository.updateCompanysIdsByCompanyId(id);
    }
}
