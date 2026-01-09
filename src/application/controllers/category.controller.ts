import { NextFunction, Request, Response, Router } from 'express';
import { IController } from './controller.interface';
import { ICategoryService } from '../../domain/category/entity/interfaces/category.service.interface';
import { ICategory } from '../../domain/category/entity/interfaces/category.interface';

export class CategoryController implements IController {
  private router: Router = Router();

  private readonly categoryService: ICategoryService;

  constructor(categoryService: ICategoryService) {
    this.categoryService = categoryService;
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/restaurants/:restaurantId/categories', this.createCategory);
    this.router.get('/restaurants/:restaurantId/categories', this.getAllCategories);
  }

  public getRoutes() {
    return this.router;
  }

  createCategory = async (
    req: Request<{ restaurantId: string }, {}, Omit<ICategory, 'restaurantId'>, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { restaurantId } = req.params;

      const categoryData = {
        ...req.body,
        restaurantId: restaurantId,
      };

      const result = await this.categoryService.createCategory(categoryData);

      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  getAllCategories = async (
    req: Request<{ restaurantId: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { restaurantId } = req.params;

      const result = await this.categoryService.getAllCategories(restaurantId);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}
