import { IController } from "../../../application/controllers/controller.interface";
import { ProductController } from "../../../application/controllers/product.controller";
import { ProductServiceFactory } from "./product.service.factory";

export class ProductControllerFactory {
  static create(): IController {
    const productService = ProductServiceFactory.create();

    const controller = new ProductController(productService);

    return controller;
  }
}
