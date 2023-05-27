/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteServiceByIdUseCase } from "./DeleteServiceByIdUseCase";

export class DeleteServiceByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idServices } = request.params;
        const deleteServiceByIdUseCase = container.resolve(
            DeleteServiceByIdUseCase
        );

        await deleteServiceByIdUseCase.execute({
            id: idServices,
        });

        return response
            .status(201)
            .json({ message: "Deleted Service successfully." });
    }
}
