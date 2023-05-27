/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindServiceByCompanyIdUseCase } from "./FindServiceByCompanyIdUseCase";

export class FindServiceByCompanyIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idCompanys } = request.params;

        const findServiceByCompanyIdUseCase = container.resolve(
            FindServiceByCompanyIdUseCase
        );

        const service = await findServiceByCompanyIdUseCase.execute({
            idCompanys,
        });

        return response.status(201).json(service);
    }
}
