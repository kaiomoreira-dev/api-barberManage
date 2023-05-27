import { IServiceModel } from "@modules/services/infra/mongoose/entities/Services";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListServicesUseCase {
    constructor(
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository
    ) {}

    async execute(): Promise<IServiceModel[]> {
        const companys = await this.servicesRepository.list();

        return companys;
    }
}
