/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCompanyByIdUseCase } from "./UpdateCompanysByIdUseCase";

export class UpdateCompanyByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { address, name, phone } = request.body;
        const { idCompanys } = request.params;

        const updateCompanyByIdUseCase = container.resolve(
            UpdateCompanyByIdUseCase
        );

        await updateCompanyByIdUseCase.execute({
            id: idCompanys,
            address,
            name,
            phone,
        });

        return response
            .status(200)
            .json({ message: "Updated Company successfully." });
    }
}
