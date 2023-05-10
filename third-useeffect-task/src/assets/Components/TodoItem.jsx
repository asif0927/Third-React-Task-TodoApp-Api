import React from "react";
import DeleteToDo from "./DeleteToDo";
import DoneToDo from "./DoneToDo";

function TodoItem({ todo, todos, setTodos }) {
  const handleDelete = () => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  const handleDone = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      })
    );
  };
  return (
    <li style={{marginBottom:"20px"}} className="task-2-li">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>
        {todo.name}
      </span>
      <DeleteToDo handleDelete={handleDelete} />
      <DoneToDo handleDone={handleDone} />
    </li>
  );
}

export default TodoItem;