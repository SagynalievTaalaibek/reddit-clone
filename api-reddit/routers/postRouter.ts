import express from 'express';
import mongoose from 'mongoose';
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
      const { description, image } = req.body as {
        description: string | null;
        image: string | null;
      };

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
      .select('_id author title createdAt')
      .populate('author', '-_id username');
    res.send(posts);
  } catch (e) {
    next(e);
  }
});

export default postRouter;
