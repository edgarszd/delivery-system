import { MongoMemoryReplSet } from 'mongodb-memory-server';

async function getMongoDBInMemoryAndStartDB() {
  const mongoMemoryServer = await MongoMemoryReplSet.create({
    replSet: { count: 1, storageEngine: 'wiredTiger' },
  });
  process.env.DATABASE_URI = mongoMemoryServer.getUri();

  (global as any).__MONGOINSTANCE = mongoMemoryServer;
}

export default async function globalSetup() {
  console.log('START INTEGRATION SETUP');
  await getMongoDBInMemoryAndStartDB();
}