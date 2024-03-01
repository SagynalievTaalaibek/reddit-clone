import PostForm from './components/PostForm';
import { Typography } from '@mui/material';
import { PostsMutation } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { createPost } from './postThunks';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (post: PostsMutation) => {
    console.log(post);
    await dispatch(createPost(post));
    navigate('/');
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
