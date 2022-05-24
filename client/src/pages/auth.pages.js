import React from 'react';
import './auth.css';

const AuthPage = () => {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <input id="username" placeholder="Username"></input>
        <input id="password" placeholder="Password"></input>
        <div className="container-btm">
          <p className="register-btn">Register</p>
          <button className="login-btn">Login</button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
