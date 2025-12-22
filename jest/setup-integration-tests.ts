import { createApp } from '../src/app';
import { Express } from 'express';
import mongoose from 'mongoose';
import { DATABASE_URI, DATABASE_NAME } from '../src/configurations/env-constants';

let dbInstance: mongoose.Mongoose;
export let app: Express;

beforeAll(async () => {
  dbInstance = await mongoose.connect(DATABASE_URI, { dbName: DATABASE_NAME });
  app = createApp();
});

afterAll(async () => {
  await dbInstance?.connection.close();
});