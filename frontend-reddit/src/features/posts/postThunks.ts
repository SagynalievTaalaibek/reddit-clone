import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { PostHomeWindow, PostsMutation, PostWithID } from '../../types';

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

export const fetchOnePost = createAsyncThunk<
  PostWithID,
  string,
  { state: RootState }
>('post/fetchOne', async (id, { getState }) => {
  const token = getState().users.user?.token;
  const response = await axiosApi.get<PostWithID>(`/posts/${id}`, {
    headers: { Authorization: 'Bearer ' + token },
  });
  return response.data;
});
