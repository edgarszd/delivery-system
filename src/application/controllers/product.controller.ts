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
    this.router.post('/categories/:categoryId/products', this.createProduct);
    this.router.get('/categories/:categoryId/products', this.getAllProducts);
  }

  public getRoutes() {
    return this.router;
  }

  createProduct = async (
    req: Request<{ categoryId: string }, {}, Omit<IProduct, 'categoryId'>, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { categoryId } = req.params;

      const productData = {
        ...req.body,
        categoryId: categoryId,
      };

      const result = await this.productService.createProduct(productData);

      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  getAllProducts = async (
    req: Request<{ categoryId: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { categoryId } = req.params;

      const result = await this.productService.getAllProducts(categoryId);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}
