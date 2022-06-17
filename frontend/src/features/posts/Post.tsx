import React, { useEffect, useState } from "react";
import ButtonGroup from "./ButtonGroup";

export default function Post(props: any) {
  const [title, setTitle] = useState(props.post.title);
  const [body, setBody] = useState(props.post.body);
  const [isEditing, setIsEditing] = useState(
    props.postToEdit === props.post.id
  );

  useEffect(() => {
    debugger;
    setIsEditing(props.postToEdit === props.post.id);
  }, [props.postToEdit, props.post.id]);

  function submitHandler(e: any) {
    e.preventDefault();
    const formData = {
      post_id: props.post.id,
      post: {
        title: title,
        body: body,
      },
    };

    props.submitEdit(formData);
    resetState();
  }

  const resetState = () => {
    setTitle(props.post.title);
    setBody(props.post.body);
  };

  const titleElement = <h2 className="title text-start">{props.post.title}</h2>;
  const bodyElement = <p className="card-text text-start">{props.post.body}</p>;

  const editableTitle = (
    <input
      type="text"
      className="form-control"
      name="title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );

  const editableBody = (
    <textarea
      className="form-control"
      name="body"
      value={body}
      rows={3}
      onChange={(e) => setBody(e.target.value)}
    />
  );

  const submitButton = (
    <button
      type="submit"
      className="btn btn-success mt-3"
      onClick={(e) => submitHandler(e)}
    >
      Submit
    </button>
  );

  return (
    <div>
      <div className="row">
        <div className="col-8">{isEditing ? editableTitle : titleElement}</div>
        <div className="col-4">
          <ButtonGroup
            dispatch={props.dispatch}
            post_id={props.post.id}
            toggleEditForm={props.toggleEditForm}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-8">{isEditing ? editableBody : bodyElement}</div>
      </div>
      <div className="row">
        <div className="col-2">{isEditing ? submitButton : ""}</div>
      </div>
    </div>
  );
}
