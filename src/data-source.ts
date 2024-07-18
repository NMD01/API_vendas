import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Products } from './modules/products/typeorm/entities/product';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  synchronize: true,
  logging: false,
  entities: [Products],
  migrations: ['src/shared/typeorm/migrations/*.ts'],
  subscribers: [],
});

// AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch(err => {
//     console.error('Error during Data Source initialization:', err);
//   });
