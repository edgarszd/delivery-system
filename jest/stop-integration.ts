import MongoMemoryReplSet from 'mongodb-memory-server-core';

export default async function globalTeardown() {
  const instance: MongoMemoryReplSet = (global as any).__MONGOINSTANCE;
  await instance.stop();
}