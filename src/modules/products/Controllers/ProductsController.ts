import { Request, Response } from 'express';
import ListProductsService from '../services/ListProductsService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductsService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const ListProducts = new ListProductsService();
    const products = await ListProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const ShowProduct = new ShowProductService();
    const product = await ShowProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const CreateProduct = new CreateProductService();
    const product = await CreateProduct.execute({ name, price, quantity });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const UpdateProduct = new UpdateProductService();
    const product = await UpdateProduct.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const DeleteProduct = new DeleteProductService();
    await DeleteProduct.execute({ id });

    return response.json([]);
  }
}
