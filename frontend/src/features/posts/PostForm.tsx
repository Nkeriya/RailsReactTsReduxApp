import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { createPostAsync } from "./postSlice";

export default function PostForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    const formData = {
      post: {
        title: title,
        body: body,
      },
    };
    dispatch(createPostAsync(formData));
    resetState();
  };

  const resetState = () => {
    setTitle("");
    setBody("");
  };

  return (
    <div>
      <h1>PostForm</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Text
        </label>
        <textarea
          className="form-control"
          name="body"
          value={body}
          rows={3}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => submitHandler(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
