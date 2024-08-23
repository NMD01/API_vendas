import { Router } from 'express';
import routerProducts from '@modules/products/routers/routerProducts';
import routerUser from '@modules/users/routers/user.router';
import routerSession from '@modules/users/routers/session.router';
import routerPassword from "@modules/users/routers/password.router"
import routerProfile from "@modules/users/routers/profile.router"

const routes = Router();

routes.use("/products", routerProducts)
routes.use("/user", routerUser)
routes.use("/profile", routerProfile)
routes.use("/session", routerSession)
routes.use("/password", routerPassword)

export default routes;
