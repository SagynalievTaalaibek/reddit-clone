import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { PostHomeWindow, PostsMutation } from '../../types';
import { RootState } from '../../app/store';

export const fetchPosts = createAsyncThunk<PostHomeWindow[]>(
  'post/fetchAll',
  async () => {
    const response = await axiosApi.get<PostHomeWindow[]>('/posts');
    return response.data;
  },
);

export const createPost = createAsyncThunk<
  void,
  PostsMutation,
  { state: RootState }
>('post/create', async (post, { getState, dispatch }) => {
  const token = getState().users.user?.token;
  const formData = new FormData();

  const keys = Object.keys(post) as (keyof PostsMutation)[];
  keys.forEach((key) => {
    const value = post[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosApi.post('/posts', formData, {
    headers: { Authorization: 'Bearer ' + token },
  });

  dispatch(fetchPosts());
});
