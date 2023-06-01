import { ensureId } from "@ensures/ensureId";
import { ICreateCostsDTO } from "@modules/costs/dtos/ICreateCostsDTO";
import { ICostModel } from "@modules/costs/infra/entities/Cost";
import { ICostsRepository } from "@modules/costs/repositories/ICostsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindCostByIdUseCase {
    constructor(
        @inject("CostsRepository")
        private costRepository: ICostsRepository
    ) {}

    async execute({ id }: ICreateCostsDTO): Promise<ICostModel> {
        if (!ensureId(id)) {
            throw new AppError("Service not found", 404);
        }

        const checkCostExists = this.costRepository.findById(id);

        if (!checkCostExists) {
            throw new AppError("Cost not found", 404);
        }

        return checkCostExists;
    }
}
