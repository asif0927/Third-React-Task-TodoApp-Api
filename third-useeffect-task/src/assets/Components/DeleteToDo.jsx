import React from "react";

function DeleteToDo({ handleDelete }) {
  return <button onClick={handleDelete} className="deletebtn-2">Delete</button>;
}

export default DeleteToDo;