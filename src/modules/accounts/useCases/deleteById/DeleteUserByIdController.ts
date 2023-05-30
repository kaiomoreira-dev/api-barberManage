/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUserByIdUseCase } from "./DeleteUserByIdUseCase";

export class DeleteUserByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idUsers } = request.params;
        const deleteUserByIdUseCase = container.resolve(DeleteUserByIdUseCase);

        await deleteUserByIdUseCase.execute({
            id: idUsers,
        });

        return response
            .status(201)
            .json({ message: "Deleted User successfully." });
    }
}
