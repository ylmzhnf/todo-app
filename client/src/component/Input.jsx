import React, {useState} from "react";

function Input({ addTodo }) {
  
  const [text, setText] =useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
   if(text.trim()=== "") return;
   addTodo(text);
   setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <div className="input-wrapper">
        <span className="check-icon"></span>
        <input
          type="text"
          placeholder="Create a new todo..."
          className="new-task-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </form>
  );
}

export default Input;
