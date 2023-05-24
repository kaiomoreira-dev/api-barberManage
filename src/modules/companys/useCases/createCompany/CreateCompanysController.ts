/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCompanysUseCase } from "./CreateCompanysUseCase";

export class CreateCompanysController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { address, name, phone } = request.body;
        const { idUsers } = request.params;

        const createCompanysUseCase = container.resolve(CreateCompanysUseCase);

        const company = await createCompanysUseCase.execute({
            idUsers,
            address,
            name,
            phone,
        });

        return response.status(201).json(company);
    }
}
