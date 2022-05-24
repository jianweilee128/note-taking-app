import React, { useState } from 'react';
import './App.css';

import TodoPage from './pages/todo.pages';
import AuthPage from './pages/auth.pages';

const App = () => {
  var [loggedIn, setLoggedIn] = useState(false);
  return <div className="App">{loggedIn ? <TodoPage /> : <AuthPage />}</div>;
};

export default App;
