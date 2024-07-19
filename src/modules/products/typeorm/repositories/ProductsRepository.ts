import { Products } from '../entities/product';
import { AppDataSource } from '../../../../data-source';

export const ProductRepository = AppDataSource.getRepository(Products).extend({
  async findByName(name: string): Promise<Products | null> {
    const product = await this.findOne({
      where: {
        name,
      },
    });
    return product;
  },
});
