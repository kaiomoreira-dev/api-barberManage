/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateServiceExecutedUseCase } from "./CreateServiceExecutedUseCase";

export class CreateServiceExecutedController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { value, paymentMethod, paymentDate, serviceDate, idServices } =
            request.body;
        const { idCompanys, idClients } = request.params;
        const { id: idUsers } = request.user;

        const createServiceExecutedUseCase = container.resolve(
            CreateServiceExecutedUseCase
        );

        const serviceExecuted = await createServiceExecutedUseCase.execute({
            idClients,
            idServices,
            idCompanys,
            idUsers,
            value,
            paymentMethod,
            paymentDate,
            serviceDate,
        });

        return response.status(201).json(serviceExecuted);
    }
}
