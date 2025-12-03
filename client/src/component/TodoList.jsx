import React, { useState } from "react";

function TodoList({ todos, deleteTodo, toggleTodo, onReorder }) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  const handleDragStart = (e, todoId) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(todoId));
    setDraggedId(todoId);
    e.currentTarget.classList && e.currentTarget.classList.add("dragging");
  };

  const handleDragOver = (e, todoId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverId(todoId);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const fromId = Number(e.dataTransfer.getData("text/plain"));
    const toId = Number(targetId);
    if (onReorder && fromId && toId && fromId !== toId) {
      onReorder(fromId, toId);
    }
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList && e.currentTarget.classList.remove("dragging");
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  return (
    <section className="todo-list">
      <ul className="todo-items">
        {/* Show message to user if list is empty */}
        {todos.length === 0 && (
          <li style={{ padding: "1rem", color: "gray", textAlign: "center" }}>
            Your list is empty, add a new task!
          </li>
        )}

        {todos.map((todo) => (
          <li
            key={todo.id}
            data-id={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(e, todo.id)}
            onDragOver={(e) => handleDragOver(e, todo.id)}
            onDrop={(e) => handleDrop(e, todo.id)}
            onDragEnd={handleDragEnd}
            onDragLeave={handleDragLeave}
            className={`${draggedId === todo.id ? "dragging" : ""} ${dragOverId === todo.id ? "drag-over" : ""}`}
          >
            <div className={`todo-item ${todo.is_completed ? "completed" : ""}`}>
              <button
                className="check-icon check-btn"
                onClick={() => toggleTodo(todo.id, todo.is_completed)}
              ></button>
              <p className="todo-text" onClick={() => toggleTodo(todo.id, todo.is_completed)}>
                {todo.content}
              </p>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                <img src="/images/icon-cross.svg" className="cross-icon" alt="cross icon" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
