import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchOnePost } from './postThunks';
import { selectOnePost, selectOnePostFetchLoading } from './postSlice';
import {
  Box,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import imageMessage from '../../assets/images/message.png';
import { apiURL } from '../../constants';

dayjs.extend(LocalizedFormat);

const OnePost = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const onePost = useAppSelector(selectOnePost);
  const onePostLoading = useAppSelector(selectOnePostFetchLoading);

  let cardImage = imageMessage;

  if (onePost?.image) {
    cardImage = apiURL + '/' + onePost.image;
  }

  useEffect(() => {
    dispatch(fetchOnePost(id));
  }, [dispatch, id]);

  return (
    <>
      {onePostLoading && onePost ? (
        <CircularProgress />
      ) : (
        onePost && (
          <Grid container>
            <Grid item xs={4} sx={{ maxWidth: '350px' }}>
              <Box sx={{ maxWidth: '350px' }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={cardImage}
                  alt={onePost.title}
                />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">
                Author: {onePost.author.username}
              </Typography>
              <Typography variant="h6">
                {dayjs(onePost.createdAt).format('lll')}
              </Typography>
              <Typography variant="h4">{onePost.title}</Typography>
              <Typography component="p">{onePost.description}</Typography>
            </Grid>
          </Grid>
        )
      )}
      <Grid container sx={{ mt: 2 }}>
        Comments
      </Grid>
    </>
  );
};

export default OnePost;
