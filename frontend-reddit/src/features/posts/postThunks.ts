import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { PostHomeWindow } from '../../types';

export const fetchPosts = createAsyncThunk<PostHomeWindow[]>(
  'post/fetchAll',
  async () => {
    const response = await axiosApi.get<PostHomeWindow[]>('/posts');
    return response.data;
  },
);
