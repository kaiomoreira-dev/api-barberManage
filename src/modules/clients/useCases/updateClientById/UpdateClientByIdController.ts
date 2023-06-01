/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateClientByIdUseCase } from "./UpdateClientByIdUseCase";

export class UpdateClientByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idCompanys, name, address, esqd, num, pg, phone } =
            request.body;
        const { idClients } = request.params;

        const updateClientByIdUseCase = container.resolve(
            UpdateClientByIdUseCase
        );

        await updateClientByIdUseCase.execute({
            id: idClients,
            idCompanys,
            name,
            address,
            esqd,
            num,
            pg,
            phone,
        });

        return response
            .status(200)
            .json({ message: "Updated Client successfully." });
    }
}
