import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import { RootState, AppThunk } from "../../app/store";
import { fetchPosts, createPost } from "./postAPI";

export enum Statuses {
  Initial = "Not fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error",
}

export interface PostState {
  id?: Number; // ? mark makes the parameter optional here, i.e, it may not be present in response
  title?: String;
  body?: String;
}

export interface PostsState {
  posts: PostState[];
  status: String;
}

export interface PostFormData {
  post: {
    id?: String;
    title: String;
    body: String;
  };
}

const initialState: PostsState = {
  posts: [
    {
      id: 0,
      title: "",
      body: "",
    },
  ],
  status: Statuses.Initial,
};

export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const resp = await fetchPosts();
    return resp;
  }
);

export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (payload: PostFormData) => {
    const resp = await createPost(payload);
    return resp;
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  /*
   * Synchronous actions
   */
  reducers: {
    setPosts: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      /* Listing Section */
      .addCase(fetchPostsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(fetchPostsAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      /* Create Section */
      .addCase(createPostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts.push(action.payload);
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(createPostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
  },
});

export const {} = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;
