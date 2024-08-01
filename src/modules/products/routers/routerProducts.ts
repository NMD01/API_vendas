import { Router } from 'express';
import ProductsController from '../Controllers/ProductsController';

const routerProducts = Router();
const productsController = new ProductsController();

routerProducts.get("/", productsController.index)
routerProducts.get("/:id", productsController.show)
routerProducts.post("/", productsController.create)
routerProducts.put("/:id", productsController.update)
routerProducts.delete("/:id", productsController.delete)

export default routerProducts