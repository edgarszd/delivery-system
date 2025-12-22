import mongoose from 'mongoose';
import { createApp } from './app';
import './configurations/dotenv';
import * as env from './configurations/env-constants';

const app = createApp();

mongoose.connect(env.DATABASE_URI, { dbName: env.DATABASE_NAME });

app.listen(env.PORT, () => {
  console.log(`Delivery System listening on port ${env.PORT}`);
});
