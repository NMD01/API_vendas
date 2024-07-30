import AppErrors from '@shared/errors/AppError';
import { Products } from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Products> {
    const product = await ProductRepository.findOneBy({ id });

    if (!product) {
      throw new AppErrors('Product not found!');
    }

    return product;
  }
}

export default ShowProductService;
