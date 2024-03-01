import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { CommentsI, CommentsMutation } from '../../types';
import { RootState } from '../../app/store';

export const fetchComments = createAsyncThunk<CommentsI[], string>(
  'comment/fetchAll',
  async (id) => {
    const response = await axiosApi.get(`/comments?post=${id}`);
    return response.data;
  },
);

export const createComment = createAsyncThunk<
  void,
  CommentsMutation,
  { state: RootState }
>('comment/create', async (commentData, { getState, dispatch }) => {
  const token = getState().users.user?.token;

  await axiosApi.post('/comments', commentData, {
    headers: { Authorization: 'Bearer ' + token },
  });

  dispatch(fetchComments(commentData.post));
});
