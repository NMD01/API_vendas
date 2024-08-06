import { Router } from 'express';
import routerProducts from '@modules/products/routers/routerProducts';

const routes = Router();

routes.use("/products", routerProducts)


export default routes;
