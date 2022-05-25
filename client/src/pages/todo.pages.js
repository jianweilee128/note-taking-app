import React, { useEffect, useRef, useState } from 'react';
import './todo.css';
import {
  logout,
  addTask,
  updateTask,
  getTasks,
  uploadFile,
  downloadFile,
} from '../utils/requests';

const TodoPage = ({ setUser, user }) => {
  const [tasksList, setTasksList] = useState([]);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    getTasks(setTasksList);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout(setUser);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const newTask = e.target.value;
      addTask(newTask, setTasksList, tasksList);
      e.target.value = '';
    }
  };

  const handleUpdateTask = (e, id) => {
    const completed = e.target.checked;
    updateTask({ id, completed }, setTasksList, tasksList);
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleUpload = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    const fileUploaded = e.target.files[0];
    formData.append('file', fileUploaded);
    formData.append('title', fileUploaded.name);
    formData.append('taskId', id);
    uploadFile(formData, setTasksList);
  };

  const handleView = (e, id) => {
    e.preventDefault();
    downloadFile(id);
  };

  return (
    <div className="todo-container">
      <div className="header">
        <h1 className="title">all to-do</h1>
        <p className="username">{user}</p>
      </div>
      <h3 className="sub-title">checklist</h3>
      <form className="new-task-container">
        <input
          className="new-task"
          type="text"
          placeholder="Enter your new task here..."
          onKeyDown={(e) => handleKeyDown(e)}
        ></input>
      </form>
      <div className="todo-body">
        <form>
          {tasksList.map((task) => {
            return (
              <div className="todo-item" key={task._id}>
                <input
                  type="checkbox"
                  defaultChecked={task.completed ? 'checked' : ''}
                  onChange={(e) => handleUpdateTask(e, task._id)}
                ></input>
                <input
                  type="file"
                  onChange={(e) => handleUpload(e, task._id)}
                  ref={task.fileAttached ? null : hiddenFileInput}
                />
                <button
                  className={task.fileAttached ? 'view-btn' : 'attach-btn'}
                  onClick={(e) =>
                    task.fileAttached
                      ? handleView(e, task.file)
                      : handleUploadClick(e)
                  }
                >
                  {task.fileAttached ? 'view' : 'attach'}
                </button>
                <span className="todo-task">{task.task}</span>
              </div>
            );
          })}
        </form>
      </div>
      <p className="logout-btn" onClick={handleLogout}>
        logout
      </p>
    </div>
  );
};

export default TodoPage;
