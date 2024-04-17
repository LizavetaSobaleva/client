import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./authorization.less";
import Input from "../UI/input/Input";
import PrimaryButton from "../UI/primaryButton/PrimaryButton";
import { useDispatch } from 'react-redux';
import { login } from "../../actions/user";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()


  return (
    <div className="authorization">
      <div className="authorization__container">
        <div className="authorization__label">
          <h1>Log in to cloud</h1>
        </div>
        <div className="authorization__form">
          <div className="authorization__item">
            <label>Email</label>
            <Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter your email" />
          </div>

          <div className="authorization__item">
            <label>Password</label>
            <Input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter your password" />
          </div>

          <PrimaryButton onClick={() => dispatch(login(email, password))}>Log in</PrimaryButton>
        </div>
        <div className="authorization__login">
          <Link to="/registration">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
