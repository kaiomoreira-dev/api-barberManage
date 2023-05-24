/* eslint-disable import/no-extraneous-dependencies */
import { UsersRepository } from "@modules/accounts/infra/mongoose/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CompanysRepository } from "@modules/companys/infra/mongoose/repositories/CompanysRepository";
import { container } from "tsyringe";
import "./in-memory";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";

container.register<IUsersRepository>("UsersRepository", {
    useClass: UsersRepository,
});

container.register<ICompanysRepository>("CompanysRepository", {
    useClass: CompanysRepository,
});
