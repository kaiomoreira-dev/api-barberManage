/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCompanyByIdUseCase } from "./DeleteCompanysByIdUseCase";

export class DeleteCompanyByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { idCompanys } = request.params;

        const deleteCompanyByIdUseCase = container.resolve(
            DeleteCompanyByIdUseCase
        );

        await deleteCompanyByIdUseCase.execute({
            id: idCompanys,
        });

        return response
            .status(200)
            .json({ message: "Deleted Company successfully." });
    }
}
