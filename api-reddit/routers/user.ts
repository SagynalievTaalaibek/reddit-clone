import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    user.generateToken();

    await user.save();
    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(422).send({ error: 'Username not found!' });
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
      return res.status(422).send({ error: 'Password is wrong!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Username and password are correct!', user });
  } catch (e) {
    next(e);
  }
});

userRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    const successMessage = { message: 'Success!' };

    if (!headerValue) {
      return res.send(successMessage);
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.send(successMessage);
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send(successMessage);
    }

    user.generateToken();
    await user.save();

    return res.send(successMessage);
  } catch (e) {
    next(e);
  }
});

export default userRouter;
