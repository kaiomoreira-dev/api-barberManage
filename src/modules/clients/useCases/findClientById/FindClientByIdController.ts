/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindClientByIdUseCase } from "./FindClientByIdUseCase";

export class FindClientByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idClients } = request.params;

        const findClientByIdUseCase = container.resolve(FindClientByIdUseCase);

        const company = await findClientByIdUseCase.execute({
            id: idClients,
        });

        return response.status(200).json(company);
    }
}
