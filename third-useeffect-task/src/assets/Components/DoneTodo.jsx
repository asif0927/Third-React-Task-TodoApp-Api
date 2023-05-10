import React from "react";

function DoneToDo({ handleDone }) {
  return <button onClick={handleDone} className="donebtn">Done</button>;
}

export default DoneToDo;