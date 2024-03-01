import express from 'express';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import Comment from '../models/Comment';

const commentRouter = express.Router();

commentRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const comment = new Comment({
      user: req.user?._id,
      post: req.body.post,
      text: req.body.text,
    });

    await comment.save();
    res.send(comment);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

commentRouter.get('/', async (req, res, next) => {
  try {
    const post = req.query.post;

    try {
      const postsData = await Comment.find({ post }).populate(
        'user',
        '-_id username',
      );

      return res.send(postsData);
    } catch (e) {
      return res.status(404).send({ message: 'Wrong object id' });
    }
  } catch (e) {
    next(e);
  }
});

export default commentRouter;
