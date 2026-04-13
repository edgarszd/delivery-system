import { readFileSync } from 'fs';
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Application,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import * as YAML from 'yaml';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenApiHttpError } from './application/exceptions/http.error';
import mongoose from 'mongoose';
import { IController } from './application/controllers/controller.interface';

export class App {
  app: Application;

  port: number;

  apiSpecLocation?: string;

  database?: {
    dbURI?: string;
    dbName?: string;
  };

  middlewares: Array<RequestHandler> = [express.json({ limit: '3mb' })];

  constructor(appConfig: {
    port: number;
    apiSpecLocation?: string;
    middlewares?: Array<RequestHandler>;
    controllers?: Array<IController>;
    database?: {
      dbURI?: string;
      dbName?: string;
    };
  }) {
    this.app = express();
    this.port = appConfig.port;
    this.apiSpecLocation = appConfig.apiSpecLocation;
    this.database = appConfig.database;
    this.middlewares = this.middlewares.concat(appConfig.middlewares || []);

    this.useMiddlewares(this.middlewares);

    this.useRoutes(appConfig.controllers || []);

    this.useCustomizers();
  }

  private useMiddlewares(middlewares: Array<RequestHandler>) {
    middlewares.forEach((middleware) => this.app.use(middleware));

    if (!this.apiSpecLocation) {
      return;
    }

    this.app.use(
      OpenApiValidator.middleware({
        apiSpec: this.apiSpecLocation,
        validateResponses: true,
        ignorePaths: /\/api-docs/,
      }),
    );
  }

  private useRoutes(controllers: Array<IController>, pathRoute: string = '/') {
    controllers.forEach((controller) =>
      this.app.use(pathRoute, controller.getRoutes()),
    );
  }

  private useCustomizers() {
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof OpenApiHttpError) {
          return res.status(err.status).json({ message: err.message });
        }

        return res.status(500).json({
          message: 'An unexpected error occurred!',
        });
      },
    );

    if (!this.apiSpecLocation) {
      return;
    }

    const swaggerDoc = YAML.parse(readFileSync(this.apiSpecLocation, 'utf8'));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  }

  async connectToDatabase() {
    if (!this.database || !this.database.dbURI) {
      console.error('Database not provided');
      return;
    }
    mongoose.connection.once('connected', () => {
      console.log('connect to MongoDB ');
    });
    mongoose.connection?.on('error', (err) => {
      console.error(`error to connect - MongoDB: Error: ${err.message}`);
    });
    await mongoose.connect(this.database.dbURI, {
      dbName: this.database.dbName,
    });
  }

  async closeDatabase() {
    mongoose.connection.once('disconnected', () => {
      console.log(`Mongoose disconnected`);
    });
    await mongoose.disconnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Delivery System listening on port ${this.port}`);
    });
  }
}
