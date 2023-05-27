/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateServiceByIdUseCase } from "./UpdateServiceByIdUseCase";

export class UpdateServiceByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { description, name, price } = request.body;
        const { idServices } = request.params;
        const updateServiceByIdUseCase = container.resolve(
            UpdateServiceByIdUseCase
        );

        await updateServiceByIdUseCase.execute({
            id: idServices,
            description,
            name,
            price,
        });

        return response
            .status(201)
            .json({ message: "Updated Service successfully." });
    }
}
