/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

export class ListUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listUsersUseCase = container.resolve(ListUsersUseCase);

        const users = await listUsersUseCase.execute();

        return response.status(200).json(users);
    }
}
