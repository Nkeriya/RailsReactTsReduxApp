import {
  PostFormData,
  PostDeleteData,
  PostsState,
  PostUpdateData,
} from "./postSlice";

const API_URL = "http://localhost:3000";

export async function fetchPosts() {
  return fetch(`${API_URL}/posts.json`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .catch((err) => {
      console.log(err);
      return {} as PostsState;
    });
}

export async function createPost(payload: PostFormData) {
  const post = payload.post;
  return fetch(`${API_URL}/posts.json`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ post }),
  })
    .then((resp) => resp.json())
    .catch((err) => {
      console.log(err);
      return {} as PostsState;
    });
}

export async function deletePost(payload: PostDeleteData) {
  const post = payload.post;
  return fetch(`${API_URL}/posts/${post.post_id}.json`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .catch((err) => {
      console.log(err);
      return {} as PostsState;
    });
}

export async function updatePost(payload: PostUpdateData) {
  const post = payload.post;
  const post_id = payload.post_id;
  return fetch(`${API_URL}/posts/${post_id}.json`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ post }),
  })
    .then((resp) => resp.json())
    .catch((err) => {
      console.log(err);
      return {} as PostsState;
    });
}
