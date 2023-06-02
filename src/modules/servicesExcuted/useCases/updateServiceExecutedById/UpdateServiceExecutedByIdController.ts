/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateServiceExecutedByIdUseCase } from "./UpdateServiceExecutedByIdUseCase";

export class UpdateServiceExecutedByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { paymentMethod, paymentDate, idClients } = request.body;
        const { idServiceExecuted } = request.params;

        const updateServiceExecutedByIdUseCase = container.resolve(
            UpdateServiceExecutedByIdUseCase
        );

        await updateServiceExecutedByIdUseCase.execute({
            id: idServiceExecuted,
            idClients,
            paymentMethod,
            paymentDate,
        });

        return response
            .status(201)
            .json({ message: "Updated  ServiceExecuted successfully." });
    }
}
