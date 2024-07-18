import { Products } from '../entities/product';
import { AppDataSource } from '../../../../data-source';

export const UserRepository = AppDataSource.getRepository(Products).extend({
  async findByName(name: string) {
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  },
});
