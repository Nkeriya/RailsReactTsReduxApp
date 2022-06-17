import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store"; // ???????????????????????
import {
  fetchPostsAsync,
  PostUpdateData,
  selectPosts,
  selectStatus,
  Statuses,
  updatePostAsync,
} from "./postSlice";
import Post from "./Post";
import PostForm from "./PostForm";

export default function Posts() {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();
  const [postToEdit, setPostToEdit] = useState(0);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  const toggleEditForm = (post_id?: number | Number) => {
    debugger;
    if (postToEdit === post_id) {
      setPostToEdit(0);
    } else {
      setPostToEdit(post_id as number);
    }
  };

  const submitEdit = (formData: PostUpdateData) => {
    dispatch(updatePostAsync(formData));
    toggleEditForm();
  };

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <div className="card">
        <div className="card-body">
          <h3>{status}</h3>
          <div className="container">
            <PostForm />
          </div>
          {posts?.length > 0 &&
            posts.map((post, index) => {
              return (
                <div key={index} style={{ margin: "5em" }}>
                  <Post
                    dispatch={dispatch}
                    post={post}
                    submitEdit={submitEdit}
                    postToEdit={postToEdit}
                    toggleEditForm={() => toggleEditForm(post.id)}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Posts</h1>
      {contents}
    </div>
  );
}
