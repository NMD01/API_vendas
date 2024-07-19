import { Products } from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductsService {
  public async execute(): Promise<Products[]> {
    const productsList = await ProductRepository.find();

    return productsList;
  }
}

export default ListProductsService;
