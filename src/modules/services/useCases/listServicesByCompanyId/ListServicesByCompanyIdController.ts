/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListServicesByCompanyIdUseCase } from "./ListServicesByCompanyIdUseCase";

export class ListServicesByCompanyIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idCompanys } = request.params;

        const listServicesByCompanyIdUseCase = container.resolve(
            ListServicesByCompanyIdUseCase
        );

        const services = await listServicesByCompanyIdUseCase.execute(
            idCompanys
        );

        return response.status(200).json(services);
    }
}
