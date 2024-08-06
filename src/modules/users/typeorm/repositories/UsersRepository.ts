import { AppDataSource } from 'src/data-source';
import User from '../entities/user';

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  },

  async findById(id: string): Promise<User | null> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  },

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  },
});
