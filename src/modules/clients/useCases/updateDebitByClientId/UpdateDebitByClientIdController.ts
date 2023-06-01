/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateDebitByClientIdUseCase } from "./UpdateDebitByClientIdUseCase";

export class UpdateDebitByClientIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { debit } = request.body;
        const { idClients } = request.params;

        const updateDebitByClientIdUseCase = container.resolve(
            UpdateDebitByClientIdUseCase
        );

        await updateDebitByClientIdUseCase.execute({
            id: idClients,
            debit,
        });

        return response
            .status(200)
            .json({ message: "Updated Client successfully." });
    }
}
