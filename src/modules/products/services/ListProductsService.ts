import { Products } from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Products[]> {
    const productsList = await ProductRepository.find();

    return productsList;
  }
}

export default ListProductService;
