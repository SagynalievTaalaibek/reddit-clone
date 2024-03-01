import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop....`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['posts', 'comments', 'users'];

  for (const collectionsName of collections) {
    await dropCollection(db, collectionsName);
  }

  const user = await User.create([
    {
      username: 'Adylbek',
      password: '1234',
      token: crypto.randomUUID(),
    },
    {
      username: 'Taalaibek',
      password: '1234',
      token: crypto.randomUUID(),
    },
  ]);

  const posts = await Post.create([
    {
      author: user[0]._id,
      title: 'New Album Mirbek Atabekov',
      description: 'Some new Album Mirbek Atabekov with awesome songs',
      image: 'fixtures/mirbek.jpg',
    },
    {
      author: user[1]._id,
      title: 'New Album Eminem',
      description: 'Some new Album Eminem with awesome songs',
      image: 'fixtures/eminem.jpg',
    },
  ]);

  await Comment.create(
    {
      post: posts[0]._id,
      user: user[0]._id,
      text: 'Mirbek is best singer!',
    },
    {
      post: posts[0]._id,
      user: user[1]._id,
      text: 'I think Muras is best song in this Album!',
    },
    {
      post: posts[1]._id,
      user: user[0]._id,
      text: 'Eminem God rapper is the best!',
    },
    {
      post: posts[1]._id,
      user: user[1]._id,
      text: 'Eminem Never Give up track best!',
    },
  );

  await db.close();
};

void run();
