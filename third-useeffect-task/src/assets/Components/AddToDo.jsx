import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function AddToDo({ todos, setTodos }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddToDo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          name: inputValue,
          isDone: false,
        },
      ]);
      setInputValue("");
    }
    else{
      alert('bos deyer gondermek olmaz!');
    }
  };

  return (
    <div style={{marginBottom:"30px",display:"flex",flexDirection:"row",alignItems:"center"}}>
      <input type="text" value={inputValue} onChange={handleInputChange} className="search-inp" style={{marginLeft:"30px"}}/>
      <button onClick={handleAddToDo} className="sortbtn" style={{width:"200px"}}>Add ToDo</button>
    </div>
  );
}

export default AddToDo;