/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteClientByIdUseCase } from "./DeleteClientByIdUseCase";

export class DeleteClientByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idClients } = request.params;

        const deleteClientByIdUseCase = container.resolve(
            DeleteClientByIdUseCase
        );

        await deleteClientByIdUseCase.execute({
            id: idClients,
        });

        return response
            .status(200)
            .json({ message: "Deleted Client successfully." });
    }
}
