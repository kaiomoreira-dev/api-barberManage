/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindServiceByIdUseCase } from "./FindServiceByIdUseCase";

export class FindServiceByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idServices } = request.params;

        const findServiceByIdUseCase = container.resolve(
            FindServiceByIdUseCase
        );

        const service = await findServiceByIdUseCase.execute({
            id: idServices,
        });

        return response.status(201).json(service);
    }
}
