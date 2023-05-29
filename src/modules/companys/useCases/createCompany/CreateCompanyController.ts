/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

export class CreateCompanyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { address, name, phone } = request.body;
        const { id } = request.user;

        const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

        const company = await createCompanyUseCase.execute({
            idUsers: id,
            address,
            name,
            phone,
        });

        return response.status(201).json(company);
    }
}
