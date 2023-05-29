/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersByCompanyIdUseCase } from "./ListUsersByCompaniIdUseCase";

export class ListUsersByCompanyIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idCompanys } = request.params;

        const listUsersByCompanyIdUseCase = container.resolve(
            ListUsersByCompanyIdUseCase
        );

        const users = await listUsersByCompanyIdUseCase.execute(idCompanys);

        return response.status(200).json(users);
    }
}
