import React from "react";
import TodoList from "./component/TodoList";
import Header from "./component/Header";
import Input from "./component/Input";
import Footer from "./component/Footer";
import Login from "./component/pages/Login";
import Register from "./component/pages/Register";

function App() {
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

export default App;
