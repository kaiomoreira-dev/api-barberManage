/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListServiceExecutedByCompanyIdUseCase } from "./ListServiceExecutedByCompanyIdUseCase";

export class ListServiceExecutedByCompanyIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idCompanys } = request.params;

        const listServiceExecutedByCompanyIdUseCase = container.resolve(
            ListServiceExecutedByCompanyIdUseCase
        );

        const serviceExecuted =
            await listServiceExecutedByCompanyIdUseCase.execute(idCompanys);

        return response.status(200).json(serviceExecuted);
    }
}
