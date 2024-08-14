import { Router } from 'express';
import routerProducts from '@modules/products/routers/routerProducts';
import routerUser from '@modules/users/routers/user.router';
import SessionsRouter from '@modules/users/routers/session.router';

const routes = Router();

routes.use("/products", routerProducts)
routes.use("/user", routerUser)
routes.use("/session", SessionsRouter)

export default routes;
