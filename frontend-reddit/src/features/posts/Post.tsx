import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts } from './postThunks';
import PostItem from './components/PostItem';
import { selectPostFetchLoading, selectPosts } from './postSlice';
import { CircularProgress, Grid } from '@mui/material';

const Post = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const fetchLoading = useAppSelector(selectPostFetchLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grid container direction="column">
      {fetchLoading ? (
        <CircularProgress />
      ) : (
        posts.map((post) => (
          <PostItem
            key={post._id}
            id={post._id}
            title={post.title}
            author={post.author.username}
            image={post.image}
            datetime={post.createdAt}
          />
        ))
      )}
    </Grid>
  );
};

export default Post;
