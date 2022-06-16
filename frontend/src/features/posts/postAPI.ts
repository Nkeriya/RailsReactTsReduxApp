import { PostsState } from "./postSlice";

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

export default fetchPosts;
