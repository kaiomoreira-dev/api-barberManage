/* eslint-disable import/no-extraneous-dependencies */
<<<<<<< HEAD
import { UsersRepository } from '@modules/accounts/infra/mongoose/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CompanysRepository } from '@modules/companys/infra/mongoose/repositories/CompanysRepository';
import './in-memory';
import { ICompanysRepository } from '@modules/companys/repositories/ICompanysRepository';
import { ServicesRepository } from '@modules/services/infra/mongoose/repositories/ServicesRepository';
import { IServicesRepository } from '@modules/services/repositories/IServicesRepository';
import { container } from 'tsyringe';
import { ICostsRepository } from '@modules/costs/repositories/ICostsRepository';
import { CostsRepository } from '@modules/costs/infra/repositories/ICostsRepository';
=======
import { UsersRepository } from "@modules/accounts/infra/mongoose/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CompanysRepository } from "@modules/companys/infra/mongoose/repositories/CompanysRepository";
import "./in-memory";
import "./providers";
import { ICompanysRepository } from "@modules/companys/repositories/ICompanysRepository";
import { ServicesRepository } from "@modules/services/infra/mongoose/repositories/ServicesRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { container } from "tsyringe";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { ClientsRepository } from "@modules/clients/infra/mongoose/repositories/ClientsRepository";
import { IRefreshTokensRepository } from "@modules/accounts/repositories/IRefreshTokensRepository";
import { RefreshTokensRepository } from "@modules/accounts/infra/mongoose/repositories/RefreshTokensRepository";
>>>>>>> 6d318e1 (add imports for providers and create container with instace for clients and refreshtoken)

container.register<IUsersRepository>('UsersRepository', {
	useClass: UsersRepository,
});

container.register<ICompanysRepository>('CompanysRepository', {
	useClass: CompanysRepository,
});

container.register<IServicesRepository>('ServicesRepository', {
	useClass: ServicesRepository,
});

container.register<ICostsRepository>('CostsRepository', {
	useClass: CostsRepository,
});

container.register<IClientsRepository>("ClientsRepository", {
    useClass: ClientsRepository,
});

container.register<IRefreshTokensRepository>("RefreshTokensRepository", {
    useClass: RefreshTokensRepository,
});
