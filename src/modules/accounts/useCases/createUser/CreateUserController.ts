/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, address, phone } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name,
            email,
            password,
            address,
            phone,
        });

        return response
            .status(201)
            .json({ message: "User created successfully" });
    }
}
