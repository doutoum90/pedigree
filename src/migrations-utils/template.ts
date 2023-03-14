import { getDb } from '../migrations-utils/db';

export const up = async () => {
  const db = await getDb();
  const members: any = {
    name: 'Doutoum',
    imageUrl: 'https://fakeimg.pl/100/',
    area: 'Corporate',
    profileUrl: 'https://fakeimg.pl/100/',
    office: 'CTO office',
    tags: 'Ceo,tag1,manager,cto',
    isLoggedUser: 'false',
    positionName: 'Chief Executive Officer',
    parentId: '',
    size: '',
  };
  const collection = await db.collection('members');
  const mem = await collection.insertOne(members);
  console.log('execute one');
  const list = collection.find();
  console.log('end of execution');
};

export const down = async () => {
  const db = await getDb();
  const collection = await db.collection('members');
  const del = await collection.deleteMany({});
  const list = collection.find();
  console.log('deletion');
};
