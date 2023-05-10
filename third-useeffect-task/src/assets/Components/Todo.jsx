import React, { useState } from "react";
import TodoItem from "./TodoItem";
import AddToDo from "./AddToDo";


function ToDo() {
  const [todos, setTodos] = useState([]);
  return (
    <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
      <AddToDo todos={todos} setTodos={setTodos} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos}/>
        ))}
      </ul>
    </div>
  );
}
    
export default ToDo;