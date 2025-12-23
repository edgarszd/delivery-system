import fs from 'fs';
import express, { Express, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as YAML from 'yaml';
import * as OpenApiValidator from 'express-openapi-validator';
import { RestaurantControllerFactory } from './configurations/factory/restaurant/restaurant.controller.factory';
import { OpenApiHttpError } from './application/exceptions/http.error';
import { CategoryControllerFactory } from './configurations/factory/category/category.controller.factory';
import { ProductControllerFactory } from './configurations/factory/product/product.controller.factory';

export function createApp(): Express {
  const SPEC_PATH = './src/contracts/contract.yaml';

  const file = fs.readFileSync(SPEC_PATH, 'utf8');
  const swaggerDocument = YAML.parse(file);

  const app = express();

  app.use(express.json());

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(
    OpenApiValidator.middleware({
      apiSpec: SPEC_PATH,
      validateResponses: true,
    }),
  );

  app.use('/', RestaurantControllerFactory.create().getRoutes());
  app.use('/', CategoryControllerFactory.create().getRoutes());
  app.use('/', ProductControllerFactory.create().getRoutes());

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof OpenApiHttpError) {
      return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: 'An unexpected error occurred!' });
  });

  return app;
}
