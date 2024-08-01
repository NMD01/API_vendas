import { Router } from 'express';
import routerProducts from '@modules/products/routers/routerProducts';

const routes = Router();

// routes.get('/', (req, res) => {
//   return res.send('teste');
// });

routes.use("/products", routerProducts)


export default routes;
