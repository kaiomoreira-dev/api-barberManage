/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListServiceExecutedByClientIdUseCase } from "./ListServiceExecutedByClientIdUseCase";

export class ListServiceExecutedByClientIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idClients } = request.params;

        const listServiceExecutedByClientIdUseCase = container.resolve(
            ListServiceExecutedByClientIdUseCase
        );

        const serviceExecuted =
            await listServiceExecutedByClientIdUseCase.execute(idClients);

        return response.status(200).json(serviceExecuted);
    }
}
