import { NextFunction, Request, Response, Router } from 'express';
import { IController } from './controller.interface';
import { IProductService } from '../../domain/product/entity/interfaces/product.service.interface';
import { IProduct } from '../../domain/product/entity/interfaces/product.interface';

export class ProductController implements IController {
  private router: Router = Router();

  private readonly productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/categories/:id/products', this.createProduct);
    this.router.get('/categories/:id/products', this.getAllProducts);
  }

  public getRoutes() {
    return this.router;
  }

  createProduct = async (
    req: Request<{ id: string }, {}, Omit<IProduct, 'categoryId'>, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;

      const productData = {
        ...req.body,
        categoryId: id,
      };

      const result = await this.productService.createProduct(productData);

      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  getAllProducts = async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;

      const result = await this.productService.getAllProducts(id);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}
