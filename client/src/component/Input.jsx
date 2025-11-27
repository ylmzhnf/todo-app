import React from "react";

function Input() {
  return (
    <form className="new-task-form">
      <div className="input-wrapper">
        <span className="check-icon"></span>
        <input
          type="text"
          placeholder="Create a new todo..."
          className="new-task-input"
        />
      </div>
    </form>
  );
}

export default Input;
