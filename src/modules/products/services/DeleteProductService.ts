import AppErrors from '@shared/errors/AppError';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await ProductRepository.findOneBy({ id });

    if (!product) {
      throw new AppErrors('Product not found!');
    }

    await ProductRepository.remove(product);
  }
}

export default DeleteProductService;
