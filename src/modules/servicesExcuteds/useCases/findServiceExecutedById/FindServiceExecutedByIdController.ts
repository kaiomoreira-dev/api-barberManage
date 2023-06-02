/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindServiceExecutedByIdUseCase } from "./FindServiceExecutedByIdUseCase";

export class FindServiceExecutedByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idServiceExecuted } = request.params;

        const findServiceExecutedByIdUseCase = container.resolve(
            FindServiceExecutedByIdUseCase
        );

        const serviceExecuted = await findServiceExecutedByIdUseCase.execute({
            id: idServiceExecuted,
        });

        return response.status(201).json(serviceExecuted);
    }
}
