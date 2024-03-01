import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchOnePost } from './postThunks';
import { selectOnePost, selectOnePostFetchLoading } from './postSlice';
import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';
import imageMessage from '../../assets/images/message.png';
import { apiURL } from '../../constants';
import {
  selectCommentCreateLoading,
  selectCommentFetchLoading,
  selectComments,
} from '../comments/commentSlice';
import CommentCard from '../comments/components/CommentCard';
import { createComment, fetchComments } from '../comments/commentsThunks';
import { selectUser } from '../users/usersSlice';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

dayjs.extend(LocalizedFormat);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'background.paper',
  width: 400,
  border: '2px solid #000',
  borderRadius: '10px',
  padding: '26px 16px',
  '& .MuiTextField-root': { width: '40ch', mt: 1 },
};

const OnePost = () => {
  const { id } = useParams() as { id: string };
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const onePost = useAppSelector(selectOnePost);
  const onePostLoading = useAppSelector(selectOnePostFetchLoading);

  const user = useAppSelector(selectUser);
  const commentsData = useAppSelector(selectComments);
  const commentsFetchLoading = useAppSelector(selectCommentFetchLoading);
  const commentsCreateLoading = useAppSelector(selectCommentCreateLoading);

  let cardImage = imageMessage;

  if (onePost?.image) {
    cardImage = apiURL + '/' + onePost.image;
  }

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchOnePost(id));
      await dispatch(fetchComments(id));
    };

    void fetch();
  }, [dispatch, id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      createComment({
        post: id,
        text: text,
      }),
    );
    void handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      {user ? (
        <Box sx={{ marginTop: '20px' }}>
          <Button variant="contained" onClick={handleOpen}>
            Add new comment
          </Button>
        </Box>
      ) : (
        ''
      )}
      <Grid container sx={{ mt: 2 }} spacing={2}>
        {commentsFetchLoading ? (
          <CircularProgress />
        ) : (
          commentsData.map((item) => (
            <CommentCard
              key={item._id}
              author={item.user.username}
              text={item.text}
            />
          ))
        )}
      </Grid>
      <Modal open={open}>
        <Box sx={style} component="form" onSubmit={onSubmit}>
          <div>
            <TextField
              label="Comment"
              multiline
              rows={3}
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            disabled={commentsCreateLoading}
            loading={commentsCreateLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            sx={{ mt: 1 }}
          >
            Add
          </LoadingButton>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ mt: 1, marginLeft: '10px' }}
          >
            Back
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default OnePost;
