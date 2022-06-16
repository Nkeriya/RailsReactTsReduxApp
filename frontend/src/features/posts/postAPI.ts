import { PostFormData, PostsState } from "./postSlice";

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
    });
}

export async function createPost(payload:PostFormData) {
  const post = payload.post;
  return fetch(`${API_URL}/posts.json`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({post}),
  })
    .then((resp) => resp.json())
    .catch((err) => {
      console.log(err);
    });
}
