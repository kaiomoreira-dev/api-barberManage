import { ICompanyModel } from "@modules/companys/infra/mongoose/entities/Companys";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListCompanysUseCase {
    constructor(
        @inject("CompanysRepository")
        private companysRepository: ICompanysRepository
    ) {}

    async execute(): Promise<ICompanyModel[]> {
        const companys = await this.companysRepository.list();

        return companys;
    }
}
