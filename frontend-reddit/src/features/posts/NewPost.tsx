import PostForm from './components/PostForm';
import { Typography } from '@mui/material';
import { PostsMutation } from '../../types';

const NewPost = () => {
  const onSubmit = async (post: PostsMutation) => {
    console.log(post);
  };

  return (
    <>
      <Typography
        variant="h4"
        component="div"
        sx={{ mb: 1, fontWeight: 'bold' }}
      >
        Create post
      </Typography>
      <PostForm onSubmit={onSubmit} />
    </>
  );
};

export default NewPost;
