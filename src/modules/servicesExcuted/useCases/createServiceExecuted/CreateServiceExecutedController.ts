/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateServiceExecutedUseCase } from "./CreateServiceExecutedUseCase";

export class CreateServiceExecutedController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            paymentMethod,
            paymentDate,
            serviceDate,
            idServices,
            idCompanys,
            idClients,
            idUsers,
        } = request.body;
        const { id } = request.user;

        const createServiceExecutedUseCase = container.resolve(
            CreateServiceExecutedUseCase
        );

        const serviceExecuted = await createServiceExecutedUseCase.execute({
            idClients,
            idServices,
            idCompanys,
            idUsers,
            paymentMethod,
            paymentDate,
            serviceDate,
            isLogged: id,
        });

        return response.status(201).json(serviceExecuted);
    }
}
