import React from 'react';
import './todo.css';

const TodoPage = () => {
  return (
    <div className="todo-container">
      <header>
        <h1 className="title">all to-do</h1>
        <p className="username">username</p>
      </header>
      <div className="todo-body">
        <h3 className="sub-title">checklist</h3>
        <form>
          <div className="todo-item">
            <input type="checkbox"></input>
            <button className="attach-btn">attach</button>
            <label className="todo-label" for="vehicle1">
              Todo 1
            </label>
          </div>
          <div className="todo-item">
            <input type="checkbox"></input>
            <button className="view-btn">view</button>
            <label className="todo-label" for="vehicle1">
              Todo 2
            </label>
          </div>
          <div className="todo-item">
            <input type="checkbox"></input>
            <button className="attach-btn">attach</button>
            <label className="todo-label" for="vehicle1">
              Todo 3
            </label>
          </div>
        </form>
      </div>
      <p className="logout-btn">logout</p>
    </div>
  );
};

export default TodoPage;
