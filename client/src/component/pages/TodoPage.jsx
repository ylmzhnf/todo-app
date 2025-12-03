import React, { useState, useEffect } from "react";
import Header from "../Header";
import Input from "../Input";
import TodoList from "../TodoList";
import Footer from "../Footer";
import api from "../../api/axios";

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  // GET: Fetch data from Backend on page load
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get("/todos");
        setTodos(res.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Could not connect to server.");
      }
    };
    fetchTodos();
  }, []);

  // POST: Add new task
  const handleAddTodo = async (text) => {
    try {
      const res = await api.post("/todos", { content: text });
      setTodos([...todos, res.data]);
    } catch (err) {
      console.error("Add error:", err);
      setError("Task could not be added.");
    }
  };

  // DELETE: Delete task
  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // PUT: Mark as completed
  const handleToggle = async (id, currentStatus) => {
    try {
      const res = await api.put(`/todos/${id}`, { is_completed: !currentStatus });
      const updatedList = todos.map((t) =>
        t.id === id ? { ...t, is_completed: res.data.is_completed } : t
      );
      setTodos(updatedList);
      // Switch to "completed" filter when todo is marked as completed
      if (!currentStatus) {
        setFilter("completed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // Clear completed todos
  const handleClearCompleted = async () => {
    const completedIds = todos.filter(t => t.is_completed).map(t => t.id);
    try {
      await Promise.all(completedIds.map(id => api.delete(`/todos/${id}`)));
      setTodos(todos.filter(t => !t.is_completed));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Reorder todos when drag & drop occurs (fromId and toId are todo ids)
  const handleReorder = (fromId, toId) => {
    const current = [...todos];
    const fromIndex = current.findIndex((t) => t.id === fromId);
    const toIndex = current.findIndex((t) => t.id === toId);
    if (fromIndex === -1 || toIndex === -1) return;
    const [moved] = current.splice(fromIndex, 1);
    current.splice(toIndex, 0, moved);
    setTodos(current);
    // Optional: persist order to backend here if you add an "order" field
  };

  // Filter todos based on filter state
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.is_completed);
      case 'completed':
        return todos.filter(t => t.is_completed);
      default:
        return todos;
    }
  };

  return (
    <main className="container">
      <Header />
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <Input addTodo={handleAddTodo} />
      <TodoList
        todos={getFilteredTodos()}
        deleteTodo={handleDelete}
        toggleTodo={handleToggle}
        onReorder={handleReorder}
      />
      <Footer
        todos={todos}
        onClearCompleted={handleClearCompleted}
        filter={filter}
        onFilterChange={setFilter}
      />
      <p className="drag-drop-hint">Drag and drop to reorder list</p>
    </main>
  );
}

export default TodoPage;