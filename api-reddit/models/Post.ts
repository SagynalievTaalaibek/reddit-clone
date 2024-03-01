import { model, Schema, Types } from 'mongoose';
import User from './User';

const PostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async (userId: Types.ObjectId) => {
          const user = await User.findById(userId);
          return Boolean(user);
        },
        message: 'User does not exist!',
      },
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
  },
  { timestamps: true },
);

const Post = model('Post', PostSchema);
export default Post;
