import React from "react";

function TodoList() {
  return (
    <section className="todo-list">
      <ul className="todo-items">
        <li>
          <div className="todo-item completed">
            <button className="check-icon check-btn"></button>
            <p className="todo-text">Complete online JavaScript course</p>
            <button className="delete-btn">
              <img
                src="/images/icon-cross.svg"
                className="cross-icon"
                alt="cross icon"
              />
            </button>
          </div>
        </li>
        <li>
          <div className="todo-item">
            <button className="check-icon check-btn"></button>
            <p className="todo-text">Jog around the park 3x</p>
            <button className="delete-btn">
              <img src="/images/icon-cross.svg" className="cross-icon" alt="cross icon" />
            </button>
          </div>
        </li>
        <li>
          <div className="todo-item">
            <button className="check-icon check-btn"></button>
            <p className="todo-text">10 minutes meditation</p>
            <button className="delete-btn">
              <img src="/images/icon-cross.svg" className="cross-icon" alt="cross icon" />
            </button>
          </div>
        </li>
        <li>
          <div className="todo-item">
            <button className="check-icon check-btn"></button>
            <p className="todo-text">Read for 1 hour</p>
            <button className="delete-btn">
              <img src="/images/icon-cross.svg" className="cross-icon" alt="cross icon" />
            </button>
          </div>
        </li>
        <li>
          <div className="todo-item">
            <button className="check-icon check-btn"></button>
            <p className="todo-text">Pick up groceries</p>
            <button className="delete-btn">
              <img src="/images/icon-cross.svg" className="cross-icon" alt="cross icon" />
            </button>
          </div>
        </li>
        <li>
          <div className="todo-item">
            <button className="check-icon check-btn"></button>
            <p className="todo-text">Complete Todo App on Frontend Mentor</p>
            <button className="delete-btn">
              <img src="/images/icon-cross.svg" className="cross-icon" alt="cross icon" />
            </button>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default TodoList;
