import React, { useState } from 'react';
import './App.css';

import TodoPage from './pages/todo.pages';
import AuthPage from './pages/auth.pages';

const App = () => {
  const [user, setUser] = useState('');
  return (
    <div className="App">
      {user ? (
        <TodoPage user={user} setUser={setUser} />
      ) : (
        <AuthPage setUser={setUser} user={user} />
      )}
    </div>
  );
};

export default App;
