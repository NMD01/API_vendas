import AppErrors from '@shared/errors/AppError';
import { Products } from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Products> {
    const product = await ProductRepository.findOneBy({ id });

    if (!product) {
      throw new AppErrors('Product not found!');
    }

    const productsExists = await ProductRepository.findByName(name);

    if (productsExists && name != product.name) {
      throw new AppErrors('There is already one product with this name!');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductRepository.save(product)

    return product;
  }
}

export default UpdateProductService;
