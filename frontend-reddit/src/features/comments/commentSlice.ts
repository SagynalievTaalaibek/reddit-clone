import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CommentsI } from '../../types';
import { createComment, fetchComments } from './commentsThunks';

interface CommentState {
  comments: CommentsI[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: CommentState = {
  comments: [],
  fetchLoading: false,
  createLoading: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.comments = payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.fetchLoading = false;
      });
    builder
      .addCase(createComment.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createComment.rejected, (state) => {
        state.createLoading = false;
      });
  },
});

export const commentReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentFetchLoading = (state: RootState) =>
  state.comments.fetchLoading;
export const selectCommentCreateLoading = (state: RootState) =>
  state.comments.createLoading;
