/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteServiceExecutedByIdUseCase } from "./DeleteServiceExecutedByIdUseCase";

export class DeleteServiceExecutedByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idServiceExecuted } = request.params;

        const deleteServiceExecutedByIdUseCase = container.resolve(
            DeleteServiceExecutedByIdUseCase
        );

        await deleteServiceExecutedByIdUseCase.execute({
            id: idServiceExecuted,
        });

        return response
            .status(201)
            .json({ message: "Deleted  ServiceExecuted successfully." });
    }
}
