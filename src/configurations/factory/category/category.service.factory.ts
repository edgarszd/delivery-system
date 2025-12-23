import { ICategoryService } from '../../../domain/category/entity/interfaces/category.service.interface';
import { CategoryService } from '../../../domain/category/service/category.service';
import { CategoryRepositoryRead } from '../../../infrastructure/repository/category/category.repository.read';
import { CategoryRepositoryWrite } from '../../../infrastructure/repository/category/category.repository.write';

export class CategoryServiceFactory {
  static create(): ICategoryService {
    const categoryRepositoryWrite = new CategoryRepositoryWrite();

    const categoryRepositoryRead = new CategoryRepositoryRead();

    const service = new CategoryService({
      categoryRepositoryWrite,
      categoryRepositoryRead,
    });

    return service;
  }
}
