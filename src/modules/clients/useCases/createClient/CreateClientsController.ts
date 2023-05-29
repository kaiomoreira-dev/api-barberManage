/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateClientsUseCase } from "./CreateClientsUseCase";

export class CreateClientsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, address, esqd, num, pg, phone } = request.body;
        const { idCompanys } = request.params;

        console.log(idCompanys);
        const createClientsUseCase = container.resolve(CreateClientsUseCase);

        const clients = await createClientsUseCase.execute({
            idCompanys,
            name,
            address,
            esqd,
            num,
            pg,
            phone,
        });

        return response.status(201).json(clients);
    }
}
