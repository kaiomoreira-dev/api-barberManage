import { ICreateCostsDTO } from '../dtos/ICreateCostsDTO';
import { ICostModel } from '../infra/entities/Cost';

export interface ICostsRepository {
	create(data: ICreateCostsDTO): Promise<ICostModel>;
	list(): Promise<ICostModel[]>;
	findById(id: string): Promise<ICostModel>;
	findByName(name: string): Promise<ICostModel>;
	updateById(data: ICostModel): Promise<void>;
	deleteById(id: string): Promise<void>;
}
