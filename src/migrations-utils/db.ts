import { MongoClient } from 'mongodb';
import { configs } from '../../config/configuration';

const MONGO_URL = configs.mongoUrl;

export const getDb = async () => {
  const client: MongoClient = await MongoClient.connect(MONGO_URL);
  return client.db();
};
