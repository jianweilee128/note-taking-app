import axios from 'axios';
import download from 'downloadjs';

// Auth
export const login = (authData, setUser) => {
  axios
    .post(`/api/users/login`, authData)
    .then((res) => {
      res.data.status === 'success'
        ? setUser(res.data.user.username)
        : console.log(res.data.status);
    })
    .catch((err) => console.log(err.message));
};

export const register = (authData, setUser) => {
  axios
    .post(`/api/users/register`, authData)
    .then((res) => {
      res.data.status === 'success'
        ? setUser(res.data.user.username)
        : console.log(res.data.status);
    })
    .catch((err) => console.log(err.message));
};

export const logout = (setUser) => {
  axios
    .get(`/api/users/logout`)
    .then((res) => {
      console.log(res);
      res.data.status === 'success'
        ? setUser('')
        : console.log(res.data.status);
    })
    .catch((err) => console.log(err.message));
};

// tasks
export const addTask = (task, setTasksList, tasksList) => {
  axios
    .post(`/api/tasks/addTask`, { task })
    .then((res) => {
      console.log(res.data.task);
      setTasksList([...tasksList, res.data.task]);
    })
    .catch((err) => console.log(err.message));
};

export const updateTask = ({ id, completed }) => {
  axios
    .post(`/api/tasks/updateTask`, { id, completed })
    .then((res) => {
      console.log(res.data.status);
    })
    .catch((err) => console.log(err.message));
};

export const getTasks = (setTasksList) => {
  axios
    .get(`/api/tasks/getTasks`)
    .then((res) => {
      setTasksList(res.data.tasks);
    })
    .catch((err) => console.log(err.message));
};

// Files
export const uploadFile = (formData, setTasksList) => {
  axios
    .post(`/api/files/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      res.data.status === 'success'
        ? setTasksList(res.data.tasks)
        : console.log(res.data.status);
    })
    .catch((err) => console.log(err.message));
};

export const downloadFile = (id) => {
  axios
    .get(`/api/files/download/${id}`, {
      responseType: 'blob',
    })
    .then((res) => {
      download(res.data, res.headers['title'], res.headers['Content-Type']);
    })
    .catch((err) => console.log(err.message));
};
