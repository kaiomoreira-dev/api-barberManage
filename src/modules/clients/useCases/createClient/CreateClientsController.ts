/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateClientsUseCase } from "./CreateClientsUseCase";

export class CreateClientsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idCompanys, name, address, esqd, num, pg, phone, military } =
            request.body;
        const createClientsUseCase = container.resolve(CreateClientsUseCase);

        const clients = await createClientsUseCase.execute({
            idCompanys,
            name,
            address,
            esqd,
            num,
            pg,
            phone,
            military,
        });

        return response.status(201).json(clients);
    }
}
