/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateServiceUseCase } from "./CreateServiceUseCase";

export class CreateServiceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { description, name, price } = request.body;
        const { idCompanys } = request.params;

        const createServiceUseCase = container.resolve(CreateServiceUseCase);

        const service = await createServiceUseCase.execute({
            idCompanys,
            description,
            name,
            price,
        });

        return response.status(201).json(service);
    }
}
