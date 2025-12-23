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
    this.router.post('/restaurants/:id/categories', this.createCategory);
    this.router.get('/restaurants/:id/categories', this.getAllCategories);
  }

  public getRoutes() {
    return this.router;
  }

  createCategory = async (
    req: Request<{ id: string }, {}, Omit<ICategory, 'restaurantId'>, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;

      const categoryData = {
        ...req.body,
        restaurantId: id,
      };

      const result = await this.categoryService.createCategory(categoryData);

      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  getAllCategories = async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;

      const result = await this.categoryService.getAllCategories(id);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}
