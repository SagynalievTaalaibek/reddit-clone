import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchPosts } from './postThunks';
import { PostHomeWindow, PostWithID } from '../../types';

interface PostState {
  posts: PostHomeWindow[];
  onePost: PostWithID | null;
  fetchPostLoading: boolean;
  fetchOnePostLoading: boolean;
}

const initialState: PostState = {
  posts: [],
  onePost: null,
  fetchPostLoading: false,
  fetchOnePostLoading: false,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchPostLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.fetchPostLoading = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.fetchPostLoading = false;
      });
  },
});

export const postReducer = postSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectOnePost = (state: RootState) => state.posts.onePost;
export const selectPostFetchLoading = (state: RootState) =>
  state.posts.fetchPostLoading;
export const selectOnePostFetchLoading = (state: RootState) =>
  state.posts.fetchOnePostLoading;
