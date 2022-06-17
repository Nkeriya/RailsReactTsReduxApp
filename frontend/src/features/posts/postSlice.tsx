import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import { RootState, AppThunk } from "../../app/store";
import { fetchPosts, createPost, deletePost, updatePost } from "./postAPI";

export enum Statuses {
  Initial = "Not fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error",
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

export interface PostsState {
  posts: PostState[];
  status: String;
}

export interface PostState {
  id?: Number; // ? mark makes the parameter optional here, i.e, it may not be present in response
  title?: String;
  body?: String;
}

export interface PostFormData {
  post: {
    id?: String;
    title: String;
    body: String;
  };
}

export interface PostDeleteData {
  post: {
    post_id: Number;
  };
}
export interface PostUpdateData {
  post_id: Number;
  post: {
    title: String;
    body: String;
  };
}

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

export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async (payload: PostDeleteData) => {
    const resp = await deletePost(payload);
    return resp;
  }
);

export const updatePostAsync = createAsyncThunk(
  "posts/updatePost",
  async (payload: PostUpdateData) => {
    const resp = await updatePost(payload);
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
      /* Delete Section */
      .addCase(deletePostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(deletePostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })
      /* Update Section */
      .addCase(updatePostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          const index = draftState.posts.findIndex(
            (post) => post.id === action.payload.id
          );

          draftState.posts[index] = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(updatePostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const {} = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;
