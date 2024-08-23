import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Products } from './modules/products/typeorm/entities/product';
import User from './modules/users/typeorm/entities/user';
import UserToken from './modules/users/typeorm/entities/userToken';
import dotenv from 'dotenv';
import Customers from './modules/customers/typeorm/entities/Customer';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST_DB,
  port: Number(process.env.PORT_DB),
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  synchronize: false,
  logging: false,
  entities: [Products, User, UserToken, Customers],
  migrations: ['src/shared/typeorm/migrations/*.ts'],
  subscribers: [],
});
