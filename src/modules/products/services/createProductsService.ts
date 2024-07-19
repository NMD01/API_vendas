import { Products } from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppErrors from '@shared/errors/AppError';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Products> {
    const productsExists = await ProductRepository.findByName(name);

    if (productsExists) {
      throw new AppErrors('There is already one product with this name!');
    }

    const product = ProductRepository.create({
      name,
      price,
      quantity,
    });
    await ProductRepository.save(product);

    return product;
  }
}

export default CreateProductService;
