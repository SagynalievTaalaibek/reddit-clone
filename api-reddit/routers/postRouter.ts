import express from 'express';
import mongoose, { Types } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import Post from '../models/Post';
import { imagesUpload } from '../multer';

const postRouter = express.Router();

postRouter.post(
  '/',
  imagesUpload.single('image'),
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      const description = req.body.description;
      const image = req.file ? req.file.filename : null;

      if (
        (description === null ||
          description === undefined ||
          description.length === 0) &&
        (image === null || image === undefined || image.length === 0)
      ) {
        return res.status(422).send({ message: 'Put description or image!' });
      }

      const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
        author: req.user?._id,
      });

      await newPost.save();
      res.send(newPost);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

postRouter.get('/', async (_req, res, next) => {
  try {
    const posts = await Post.find()
      .select('_id author title image createdAt')
      .populate('author', '-_id username')
      .sort({ createdAt: -1 });
    res.send(posts);
  } catch (e) {
    next(e);
  }
});

postRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const post = await Post.findById(_id)
      .select('-updatedAt')
      .populate('author', '-_id username');

    if (!post) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(post);
  } catch (e) {
    next(e);
  }
});

export default postRouter;
