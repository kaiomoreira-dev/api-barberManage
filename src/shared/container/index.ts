/* eslint-disable import/no-extraneous-dependencies */
import { UsersRepository } from "@modules/accounts/infra/mongoose/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { container } from "tsyringe";
import "./in-memory";

container.register<IUsersRepository>("UsersRepository", {
    useClass: UsersRepository,
});
