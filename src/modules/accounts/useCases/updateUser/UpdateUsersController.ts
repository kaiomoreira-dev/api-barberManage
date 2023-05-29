import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUsersUseCase } from "./UpdateUsersUseCase";

export class UpdateUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, address, phone } = request.body;
        const { id } = request.user;

        const updateUsersUseCase = container.resolve(UpdateUsersUseCase);

        await updateUsersUseCase.execute({ id, email, name, address, phone });

        return response
            .status(200)
            .send({ message: "User updated successfully" });
    }
}
