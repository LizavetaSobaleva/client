import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./authorization.less";
import Input from "../UI/input/Input";
import PrimaryButton from "../UI/primaryButton/PrimaryButton";
import { useDispatch } from 'react-redux';
import { registration } from "../../actions/user";

const Registration = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

  return (
    <div className="authorization">
      <div className="authorization__container">
        <div className="authorization__label" data-testid="formTitle">
          <h1>Create your account</h1>
        </div>
        <div className="authorization__form">
          <div className="authorization__item">
            <label htmlFor="nameInput">Name</label>
            <Input id="nameInput" value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder="Enter your full name" data-testid="nameInput" />
          </div>

          <div className="authorization__item">
            <label htmlFor="emailInput">Email</label>
            <Input id="emailInput" value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter your email" data-testid="emailInput" />
          </div>

          <div className="authorization__item">
            <label htmlFor="passwordInput">Password</label>
            <Input id="passwordInput" value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter your password" data-testid="passwordInput" />
          </div>

          <PrimaryButton onClick={() => registration(name, email, password, dispatch)} data-testid="registerButton">Create Account</PrimaryButton>
        </div>
        <div className="authorization__login"  data-testid="loginLink">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;