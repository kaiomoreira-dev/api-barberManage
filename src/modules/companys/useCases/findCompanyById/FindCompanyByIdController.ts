/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindCompanyByIdUseCase } from "./FindCompanyByIdUseCase";

export class FindCompanyByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idCompanys } = request.params;

        const findCompanyByIdUseCase = container.resolve(
            FindCompanyByIdUseCase
        );

        const company = await findCompanyByIdUseCase.execute({
            id: idCompanys,
        });

        return response.status(200).json(company);
    }
}
