import { AppDataSource } from '../../../data-source';
import { Products } from '../typeorm/entities/product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest) {
    const myCustomRepository = AppDataSource.getRepository(Products);

    const productsExists = await myCustomRepository.findByName(name);
  }
}
