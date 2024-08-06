import { Router } from 'express';
import routerProducts from '@modules/products/routers/routerProducts';
import routerUser from '@modules/users/routers/user.router';

const routes = Router();

routes.use("/products", routerProducts)
routes.use("/users", routerUser)

export default routes;
