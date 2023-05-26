/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCompanysUseCase } from "./ListCompanysUseCase";

export class ListCompanysController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCompanysUseCase = container.resolve(ListCompanysUseCase);

        const companys = await listCompanysUseCase.execute();

        return response.status(200).json(companys);
    }
}
