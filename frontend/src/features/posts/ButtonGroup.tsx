import { deletePostAsync } from "./postSlice";

export default function ButtonGroup(props: any) {
  const deleteHandler = (e: any) => {
    e.preventDefault();
    const payload = {
      post: {
        post_id: props.post_id,
      },
    };

    props.dispatch(deletePostAsync(payload));
  };

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button
        type="button"
        className="btn btn-secondary me-1"
        onClick={() => props.toggleEditForm()}
      >
        Edit
      </button>
      <button type="button" className="btn btn-danger" onClick={deleteHandler}>
        Delete
      </button>
    </div>
  );
}
