/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListClientByCompanyIdUseCase } from "./ListClientByCompanyIdUseCase";

export class ListClientByCompanyIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idCompanys } = request.params;

        const listClientByCompanyIdUseCase = container.resolve(
            ListClientByCompanyIdUseCase
        );

        const companys = await listClientByCompanyIdUseCase.execute(idCompanys);

        return response.status(200).json(companys);
    }
}
