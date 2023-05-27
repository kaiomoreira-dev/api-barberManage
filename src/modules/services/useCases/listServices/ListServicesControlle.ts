/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListServicesUseCase } from "./ListServicesUseCase";

export class ListServiceController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listServicesUseCase = container.resolve(ListServicesUseCase);

        const services = await listServicesUseCase.execute();

        return response.status(200).json(services);
    }
}
