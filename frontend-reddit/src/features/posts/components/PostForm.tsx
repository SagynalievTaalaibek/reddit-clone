import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { PostsMutation } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectPostCreateLoading } from '../postSlice';

interface Props {
  onSubmit: (post: PostsMutation) => void;
}

const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const isLoading = useAppSelector(selectPostCreateLoading);
  const [isImage, setIsImage] = useState(false);
  const [post, setPost] = useState<PostsMutation>({
    title: '',
    description: '',
    image: null,
  });

  const onPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (post.description.length <= 0 && post.image === null) {
      setIsImage(true);
    } else {
      setIsImage(false);
      onSubmit(post);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImage(false);
    const { name, value } = e.target;

    setPost((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setPost((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <>
      <form autoComplete="off" onSubmit={onPostSubmit}>
        <Grid container direction="column" spacing={2} sx={{ maxWidth: '60%' }}>
          <Grid item xs>
            <TextField
              label="Title"
              required
              id="title"
              name="title"
              value={post.title}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs>
            <TextField
              multiline
              rows={3}
              label="Description"
              name="description"
              id="description"
              value={post.description}
              required={post.image === null}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs>
            {isImage && 'Put image or write description!'}
            <FileInput
              label="Image"
              name="image"
              onChange={fileInputChangeHandler}
            />
          </Grid>
          <Grid item xs>
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoading}
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              sx={{ mt: 1 }}
            >
              Create post
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PostForm;
