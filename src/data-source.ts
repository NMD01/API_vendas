import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Products } from './modules/products/typeorm/entities/product';
import User from 'src/modules/users/typeorm/entities/user';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  synchronize: true,
  logging: false,
  entities: [Products, User],
  migrations: ['src/shared/typeorm/migrations/*.ts'],
  subscribers: [],
});
