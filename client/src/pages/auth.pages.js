import React, { useState } from 'react';
import './auth.css';
import { login, register } from '../utils/requests';

const AuthPage = ({ setUser, user }) => {
  const [toggleLogin, setToggleLogin] = useState(true);
  const [authData, setAuthData] = useState({ username: '', password: '' });
  const handleLogin = (e) => {
    e.preventDefault();
    login(authData, setUser);
    console.log(user);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(authData, setUser);
  };

  return (
    <>
      {toggleLogin ? (
        <div className="auth-container">
          <h1>Login</h1>
          <form className="auth-form" onSubmit={(e) => e.target.reset()}>
            <input
              type="text"
              placeholder="Username"
              value={authData.username}
              onChange={(e) =>
                setAuthData({ ...authData, username: e.target.value })
              }
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={authData.password}
              onChange={(e) =>
                setAuthData({ ...authData, password: e.target.value })
              }
            ></input>
            <div className="container-btm">
              <p
                className="toggle-btn"
                onClick={(e) => {
                  setAuthData({ username: '', password: '' });
                  setToggleLogin(false);
                }}
              >
                Register
              </p>
              <button className="auth-btn" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="auth-container">
          <h1>Register</h1>
          <form className="auth-form">
            <input
              type="text"
              value={authData.username}
              onChange={(e) =>
                setAuthData({ ...authData, username: e.target.value })
              }
              placeholder="Username"
            ></input>
            <input
              type="password"
              value={authData.password}
              onChange={(e) =>
                setAuthData({ ...authData, password: e.target.value })
              }
              placeholder="Password"
            ></input>
            <div className="container-btm">
              <p
                className="toggle-btn"
                onClick={() => {
                  setAuthData({ username: '', password: '' });
                  setToggleLogin(true);
                }}
              >
                login
              </p>
              <button className="auth-btn" onClick={handleRegister}>
                register
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AuthPage;
