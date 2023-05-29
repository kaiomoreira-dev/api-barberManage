import { IClientModel } from "@modules/clients/infra/mongoose/entities/Clients";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListClientsUseCase {
    constructor(
        @inject("ClientsRepository")
        private clirntsRepository: IClientsRepository
    ) {}

    async execute(): Promise<IClientModel[]> {
        const clients = await this.clirntsRepository.list();

        return clients;
    }
}
