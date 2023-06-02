/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListServiceExecutedByUserIdUseCase } from "./ListServiceExecutedByUserIdUseCase";

export class ListServiceExecutedByUserIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idUsers } = request.params;

        const listServiceExecutedByUserIdUseCase = container.resolve(
            ListServiceExecutedByUserIdUseCase
        );

        const serviceExecuted =
            await listServiceExecutedByUserIdUseCase.execute(idUsers);

        return response.status(200).json(serviceExecuted);
    }
}
