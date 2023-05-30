/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCompanyByUserIdUseCase } from "./ListCompanyByUserIdUseCase";

export class ListCompanyByUserIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listCompanyByUserIdUseCase = container.resolve(
            ListCompanyByUserIdUseCase
        );

        const clients = await listCompanyByUserIdUseCase.execute(id);

        return response.status(200).json(clients);
    }
}
