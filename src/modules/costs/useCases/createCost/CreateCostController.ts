/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCostUseCase } from "./CreateCostUseCase";

export class CreateCostController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { description, value, costDate } = request.body;
        const { idCompanys } = request.params;

        const createCompanyUseCase = container.resolve(CreateCostUseCase);

        const cost = await createCompanyUseCase.execute({
            description,
            value,
            costDate,
            idCompanys,
        });

        return response.status(201).json(cost);
    }
}
