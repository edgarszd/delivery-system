import { CategoryController } from '../../../application/controllers/category.controller';
import { IController } from '../../../application/controllers/controller.interface';
import { CategoryServiceFactory } from './category.service.factory';

export class CategoryControllerFactory {
  static create(): IController {
    const categoryService = CategoryServiceFactory.create();

    const controller = new CategoryController(categoryService);

    return controller;
  }
}
