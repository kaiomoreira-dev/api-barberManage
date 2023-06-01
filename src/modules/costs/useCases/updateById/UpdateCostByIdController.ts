/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCostByIdUseCase } from "./UpdateCostByIdUseCase";

export class UpdateCostByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { description, idCompanys, costDate, value } = request.body;
        const { idCost } = request.params;

        const updateCostByIdUseCase = container.resolve(UpdateCostByIdUseCase);

        await updateCostByIdUseCase.execute({
            id: idCost,
            description,
            idCompanys,
            costDate,
            value,
        });

        return response
            .status(200)
            .json({ message: "Updated Cost successfully." });
    }
}
