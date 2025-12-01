//TodoList'i buraya taşıyacağız
import React from "react";
import Header from "../Header";
import Input from "../Input";
import TodoList from "../TodoList";
import Footer from "../Footer";

function TodoPage() {
  return (
    <>
      <main className="container">
        <Header />
        <Input />
        <TodoList />
        <Footer />
        <p className="drag-drop-hint">Drag and drop to reorder list</p>
      </main>
    </>
  );
}

export default TodoPage;
