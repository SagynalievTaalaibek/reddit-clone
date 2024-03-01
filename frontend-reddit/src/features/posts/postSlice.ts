import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createPost, fetchOnePost, fetchPosts } from './postThunks';
import { PostHomeWindow, PostWithID } from '../../types';

interface PostState {
  posts: PostHomeWindow[];
  onePost: PostWithID | null;
  fetchPostLoading: boolean;
  fetchOnePostLoading: boolean;
  createLoading: boolean;
}

const initialState: PostState = {
  posts: [],
  onePost: null,
  fetchPostLoading: false,
  fetchOnePostLoading: false,
  createLoading: false,
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

    builder
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createPost.rejected, (state) => {
        state.createLoading = false;
      });
    builder
      .addCase(fetchOnePost.pending, (state) => {
        state.fetchOnePostLoading = true;
      })
      .addCase(fetchOnePost.fulfilled, (state, { payload }) => {
        state.fetchOnePostLoading = false;
        state.onePost = payload;
      })
      .addCase(fetchOnePost.rejected, (state) => {
        state.fetchOnePostLoading = false;
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
export const selectPostCreateLoading = (state: RootState) =>
  state.posts.createLoading;
