/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListServiceExecutedByServiceIdUseCase } from "./ListServiceExecutedByServiceIdUseCase";

export class ListServiceExecutedByServiceIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idServices } = request.params;

        const listServiceExecutedByServiceIdUseCase = container.resolve(
            ListServiceExecutedByServiceIdUseCase
        );

        const serviceExecuted =
            await listServiceExecutedByServiceIdUseCase.execute(idServices);

        return response.status(200).json(serviceExecuted);
    }
}
